// Local Embedding Service using Transformers.js
// Uses bge-small-en-v1.5 model - free, deterministic, no API keys required

import { pipeline, env } from '@xenova/transformers';

// Configure transformers.js to use local cache
env.allowLocalModels = true;
env.useBrowserCache = false;

let embeddingPipeline: any = null;

const EMBEDDING_MODEL = 'Xenova/bge-small-en-v1.5';
const EMBEDDING_DIMENSIONS = 384; // bge-small-en-v1.5 produces 384-dim vectors

/**
 * Initialize the local embedding pipeline
 * Downloads the model on first run (~24MB)
 */
async function initializeEmbeddings(): Promise<void> {
  if (embeddingPipeline) return;
  
  console.log('🧠 Loading local embedding model (bge-small-en-v1.5)...');
  embeddingPipeline = await pipeline('feature-extraction', EMBEDDING_MODEL);
  console.log({ embeddingPipeline});
  console.log('✅ Embedding model loaded successfully');
}

/**
 * Generate embedding for a single text
 * Uses mean pooling for sentence-level embeddings
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  await initializeEmbeddings();
  
  // Generate embedding
  const output = await embeddingPipeline(text, {
    pooling: 'mean',
    normalize: true,
  });
  
  // Convert to regular array
  const embedding = Array.from(output.data) as number[];
  
  return embedding;
}

/**
 * Generate embeddings for multiple texts in batch
 * More efficient than calling generateEmbedding multiple times
 */
export async function generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  await initializeEmbeddings();
  
  const embeddings: number[][] = [];
  
  // Process in smaller batches to avoid memory issues
  const batchSize = 10;
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    for (const text of batch) {
      const output = await embeddingPipeline(text, {
        pooling: 'mean',
        normalize: true,
      });
      embeddings.push(Array.from(output.data) as number[]);
    }
    
    // Progress indicator
    if (i + batchSize < texts.length) {
      console.log(`  Processed ${i + batchSize}/${texts.length} texts`);
    }
  }
  
  return embeddings;
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Embeddings must have the same dimension');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL };
