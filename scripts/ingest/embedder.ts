// Embedder - Uses local embeddings via Transformers.js

import { generateEmbeddingsBatch } from '@/lib/embedding';
import { ContentChunk, EmbeddedChunk } from '@/types/chat';

export async function embedChunks(chunks: ContentChunk[]): Promise<EmbeddedChunk[]> {
  console.log('🧠 Generating embeddings using local model (bge-small-en-v1.5)...');
  
  const texts = chunks.map(chunk => chunk.content);
  const embeddings = await generateEmbeddingsBatch(texts);
  
  const embeddedChunks: EmbeddedChunk[] = chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }));
  
  console.log(`✅ Generated embeddings for ${embeddedChunks.length} chunks`);
  
  return embeddedChunks;
}
