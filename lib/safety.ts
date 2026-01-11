// Safety Layer for Chatbot
// Ensures no hallucinations and only portfolio-based answers

import { LRUCache } from 'lru-cache';
import { z } from 'zod';
import type { SearchResult, RateLimitResult, ConfidenceCheckResult, ChatInput } from '@/types/chat';

// ============================================================================
// INPUT VALIDATION
// ============================================================================

const MAX_MESSAGE_LENGTH = 2000;
const BLOCKED_PATTERNS = [
  /ignore.*previous.*instructions/i,
  /ignore.*system.*prompt/i,
  /pretend.*you.*are/i,
  /act.*as.*if/i,
  /roleplay/i,
  /jailbreak/i,
  /<script/i,
  /javascript:/i,
];

const chatInputSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(MAX_MESSAGE_LENGTH, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`)
    .refine(
      (msg) => !BLOCKED_PATTERNS.some((pattern) => pattern.test(msg)),
      'Invalid message content'
    ),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .max(20, 'Conversation history too long')
    .optional()
    .default([]),
});

export function validateChatInput(input: unknown): ChatInput {
  return chatInputSchema.parse(input);
}

export function sanitizeMessage(message: string): string {
  return message
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '')    // Remove angle brackets
    .trim();
}

// ============================================================================
// RATE LIMITING
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitCache = new LRUCache<string, RateLimitEntry>({
  max: 10000,
  ttl: 1000 * 60 * 60,
});

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  minute: { windowMs: 60 * 1000, maxRequests: 20 },
  hour: { windowMs: 60 * 60 * 1000, maxRequests: 100 },
};

export function checkRateLimit(ip: string, window: 'minute' | 'hour'): RateLimitResult {
  const config = RATE_LIMITS[window];
  const key = `${ip}:${window}`;
  const now = Date.now();
  
  let entry = rateLimitCache.get(key);
  
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }
  
  entry.count++;
  rateLimitCache.set(key, entry);
  
  const remaining = Math.max(0, config.maxRequests - entry.count);
  const resetIn = Math.max(0, entry.resetTime - now);
  
  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn,
      retryAfter: Math.ceil(resetIn / 1000),
    };
  }
  
  return {
    allowed: true,
    remaining,
    resetIn,
  };
}

export function getRateLimitHeaders(result: RateLimitResult, window: string): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(RATE_LIMITS[window as keyof typeof RATE_LIMITS].maxRequests),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetIn / 1000)),
    ...(result.retryAfter && { 'Retry-After': String(result.retryAfter) }),
  };
}

// ============================================================================
// CONFIDENCE CHECKING
// ============================================================================

const MIN_CONFIDENCE_SCORE = 0.70;
const MIN_RESULTS_REQUIRED = 1;

export function checkConfidence(results: SearchResult[]): ConfidenceCheckResult {
  if (!results || results.length === 0) {
    return {
      passed: false,
      reason: 'no_results',
      validResults: [],
      highestScore: 0,
      message: 'No relevant information found in the portfolio.',
    };
  }
  
  const validResults = results.filter(r => r.score >= MIN_CONFIDENCE_SCORE);
  const highestScore = Math.max(...results.map(r => r.score));
  
  if (validResults.length < MIN_RESULTS_REQUIRED) {
    return {
      passed: false,
      reason: highestScore > 0.5 ? 'low_confidence' : 'below_threshold',
      validResults: [],
      highestScore,
      message: 'The information found is not reliable enough to provide an accurate answer.',
    };
  }
  
  return {
    passed: true,
    reason: 'sufficient',
    validResults,
    highestScore,
  };
}

// ============================================================================
// FALLBACK RESPONSES
// ============================================================================

export const FALLBACK_RESPONSES = {
  NO_RESULTS: `I don't have enough details about that specific query in the portfolio. However, I'd be happy to help with questions about:

• **Services** - What Aasim offers and pricing
• **Experience** - Work history and background
• **Projects** - Featured work and case studies
• **Skills** - Technologies and expertise
• **Contact** - How to reach out

For any other questions or to discuss your specific needs, feel free to reach out to **Aasim directly** at **contact@aasimshah.com** - he responds within 24-48 hours! 📧

What would you like to know?`,

  LOW_CONFIDENCE: `I found some potentially related information, but I'm not confident enough to provide an accurate answer. For precise information, please contact Aasim Shah directly via email at **contact@aasimshah.com**.

Is there something else I can help you with?`,

  OUT_OF_SCOPE: `I can only answer questions about Aasim Shah's portfolio, including:

• Professional experience and work history
• Services offered (Web Development, UI/UX Design, SEO, Graphic Design)
• Projects and case studies
• Skills and tech stack
• Contact information and availability

For other inquiries, please contact Aasim directly at **contact@aasimshah.com**.

What would you like to know about these topics?`,

  RATE_LIMITED: `You've sent too many messages. Please wait a moment before trying again. This helps ensure a good experience for everyone.`,

  ERROR: `I apologize, but I encountered an issue processing your request. Please try again in a moment. If the problem persists, you can reach Aasim directly at **contact@aasimshah.com**.`,

  INVALID_INPUT: `I couldn't process that message. Please try rephrasing your question about Aasim's portfolio, experience, or services.`,
};

export type FallbackType = keyof typeof FALLBACK_RESPONSES;

export function getFallbackResponse(type: FallbackType): string {
  return FALLBACK_RESPONSES[type];
}

// ============================================================================
// CONTEXT GROUNDING
// ============================================================================

const SYSTEM_PROMPT = `You are a helpful assistant for Aasim Shah's portfolio website.
Your ONLY purpose is to answer questions about:
- Aasim's professional experience
- Services offered
- Projects and case studies
- Skills and tech stack
- Contact information
- Testimonials and reviews

CRITICAL SAFETY RULES - YOU MUST FOLLOW THESE:

1. ONLY use information from the RETRIEVED CONTEXT section below
2. NEVER use your general knowledge about any topic
3. NEVER make assumptions or guesses
4. NEVER invent information that is not explicitly stated
5. If the retrieved context does not contain the answer, you MUST say:
   "This information is not available on the website."
6. Do not provide any information beyond what is in the context
7. If asked about topics unrelated to the portfolio, respond:
   "I can only answer questions about Aasim Shah's portfolio, experience, services, and projects."
8. Always be helpful within these constraints
9. Cite the section when providing information (e.g., "According to the services section...")
10. Be conversational and friendly while staying strictly within the context`;

export function buildGroundedPrompt(
  retrievedContext: string,
  userQuery: string
): string {
  return `${SYSTEM_PROMPT}

=== RETRIEVED CONTEXT (Use ONLY this information) ===
${retrievedContext || 'No relevant context found.'}
=== END OF CONTEXT ===

User Question: ${userQuery}

Answer the question using ONLY the information from the RETRIEVED CONTEXT above. Be helpful, concise, and cite sources when possible.`;
}

// ============================================================================
// MAIN SAFETY CHECK
// ============================================================================

export interface SafetyCheckResult {
  passed: boolean;
  input?: ChatInput;
  rateLimitResult?: RateLimitResult;
  confidenceResult?: ConfidenceCheckResult;
  fallbackResponse?: string;
  fallbackType?: FallbackType;
  headers?: Record<string, string>;
}

export async function runSafetyChecks(
  rawInput: unknown,
  clientIp: string
): Promise<SafetyCheckResult> {
  // 1. Validate input
  let input: ChatInput;
  try {
    input = validateChatInput(rawInput);
    input.message = sanitizeMessage(input.message);
  } catch {
    return {
      passed: false,
      fallbackResponse: getFallbackResponse('INVALID_INPUT'),
      fallbackType: 'INVALID_INPUT',
    };
  }
  
  // 2. Check rate limits
  const minuteLimit = checkRateLimit(clientIp, 'minute');
  const hourLimit = checkRateLimit(clientIp, 'hour');
  
  if (!minuteLimit.allowed || !hourLimit.allowed) {
    const result = !minuteLimit.allowed ? minuteLimit : hourLimit;
    const window = !minuteLimit.allowed ? 'minute' : 'hour';
    
    return {
      passed: false,
      rateLimitResult: result,
      fallbackResponse: getFallbackResponse('RATE_LIMITED'),
      fallbackType: 'RATE_LIMITED',
      headers: getRateLimitHeaders(result, window),
    };
  }
  
  return {
    passed: true,
    input,
    rateLimitResult: minuteLimit,
    headers: getRateLimitHeaders(minuteLimit, 'minute'),
  };
}

export function evaluateSearchResults(results: SearchResult[]): SafetyCheckResult {
  const confidenceResult = checkConfidence(results);
  
  if (!confidenceResult.passed) {
    const fallbackType: FallbackType = 
      confidenceResult.reason === 'no_results' ? 'NO_RESULTS' : 'LOW_CONFIDENCE';
    
    return {
      passed: false,
      confidenceResult,
      fallbackResponse: getFallbackResponse(fallbackType),
      fallbackType,
    };
  }
  
  return {
    passed: true,
    confidenceResult,
  };
}
