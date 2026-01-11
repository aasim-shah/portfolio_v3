import OpenAI from 'openai';
import { ContentChunk, EmbeddedChunk } from '@/types';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 100;

export class EmbeddingService {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
      dimensions: EMBEDDING_DIMENSIONS,
    });
    
    return response.data[0].embedding;
  }
  
  async generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
    const response = await this.openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: texts,
      dimensions: EMBEDDING_DIMENSIONS,
    });
    
    return response.data.map(item => item.embedding);
  }
}

export async function embedChunks(chunks: ContentChunk[]): Promise<EmbeddedChunk[]> {
  console.log('🧠 Generating embeddings...');
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  const embeddingService = new EmbeddingService(apiKey);
  const embeddedChunks: EmbeddedChunk[] = [];
  
  // Process in batches
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(chunk => chunk.content);
    
    console.log(`  Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);
    
    const embeddings = await embeddingService.generateEmbeddingsBatch(texts);
    
    for (let j = 0; j < batch.length; j++) {
      embeddedChunks.push({
        ...batch[j],
        embedding: embeddings[j],
      });
    }
    
    // Rate limiting: wait between batches
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log(`✅ Generated embeddings for ${embeddedChunks.length} chunks`);
  
  return embeddedChunks;
}
