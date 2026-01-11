import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatRequest, ChatMessage, ChatErrorResponse, SearchResult } from '@/types';
import { SYSTEM_PROMPT, USER_QUERY_TEMPLATE, CONTEXT_FORMATTER } from '@/lib/prompts';
import { VectorSearchService } from '@/scripts/ingest/store';
import { generateEmbedding } from '@/lib/embedding';
import { runSafetyChecks, evaluateSearchResults, getRateLimitHeaders } from '@/lib/safety';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let vectorSearch: VectorSearchService | null = null;

async function getVectorSearchService() {
  if (!vectorSearch) {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI not configured');
    }
    
    vectorSearch = new VectorSearchService(mongoUri);
    await vectorSearch.connect();
  }
  
  return vectorSearch;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history = [] } = body;
    
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Safety checks (validation + rate limiting)
    const safetyCheck = await runSafetyChecks(body, clientIp);
    
    if (!safetyCheck.passed) {
      const response: ChatErrorResponse = {
        error: safetyCheck.fallbackResponse || 'Request blocked',
        code: (safetyCheck.fallbackType as any) || 'INVALID_INPUT',
        retryAfter: safetyCheck.rateLimitResult?.retryAfter,
      };
      
      return NextResponse.json(response, {
        status: safetyCheck.fallbackType === 'RATE_LIMITED' ? 429 : 400,
        headers: safetyCheck.headers,
      });
    }
    
    const sanitizedInput = safetyCheck.input!;
    
    // Get vector search service
    const vs = await getVectorSearchService();
    
    // Generate embedding for user query
    const queryEmbedding = await generateEmbedding(sanitizedInput.message);
    
    // Search vector database
    const searchResults = await vs.search({
      embedding: queryEmbedding,
      maxResults: 5,
      minScore: 0.70,
    });
    
    // Evaluate search results
    const resultsEvaluation = evaluateSearchResults(searchResults);
    
    if (!resultsEvaluation.passed) {
      return NextResponse.json(
        {
          error: resultsEvaluation.fallbackResponse,
          code: (resultsEvaluation.fallbackType as any),
        } as ChatErrorResponse,
        {
          status: 200,
          headers: safetyCheck.headers,
        }
      );
    }
    
    // Format context from search results
    const context = CONTEXT_FORMATTER(resultsEvaluation.confidenceResult?.validResults || []);
    
    // Build messages for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      ...(sanitizedInput.history || []).map((msg: ChatMessage) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user',
        content: USER_QUERY_TEMPLATE(sanitizedInput.message, context),
      },
    ];
    
    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });
    
    const assistantMessage = completion.choices[0].message.content || 
      'I apologize, but I could not generate a response. Please try again.';
    
    const response: ChatMessage = {
      role: 'assistant',
      content: assistantMessage,
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: safetyCheck.headers,
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    const response: ChatErrorResponse = {
      error: 'An error occurred while processing your request.',
      code: 'SERVER_ERROR',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
