// Content Chunker
// Splits content into semantic chunks with overlap

import { encode, decode } from 'gpt-tokenizer';
import { ExtractedContent, ContentChunk, SectionType } from '@/types/chat';

interface ChunkConfig {
  maxTokens: number;
  overlapTokens: number;
  minTokens: number;
}

const DEFAULT_CONFIG: ChunkConfig = {
  maxTokens: 500,
  overlapTokens: 50,
  minTokens: 100,
};

export function chunkContent(
  extracted: ExtractedContent,
  config: ChunkConfig = DEFAULT_CONFIG
): ContentChunk[] {
  const tokens = encode(extracted.content);
  
  // If content fits in single chunk, return as-is
  if (tokens.length <= config.maxTokens) {
    return [{
      id: `${extracted.id}-chunk-0`,
      chunkIndex: 0,
      content: extracted.content,
      tokenCount: tokens.length,
      section: extracted.section,
      metadata: {
        title: extracted.title,
        source: extracted.metadata.source,
        entities: extracted.metadata.entities,
        keywords: extracted.metadata.keywords,
        isPartial: false,
        totalChunks: 1,
      },
    }];
  }
  
  // Split into overlapping chunks
  const chunks: ContentChunk[] = [];
  let startToken = 0;
  let chunkIndex = 0;
  
  while (startToken < tokens.length) {
    const endToken = Math.min(startToken + config.maxTokens, tokens.length);
    const chunkTokens = tokens.slice(startToken, endToken);
    const chunkContent = decode(chunkTokens);
    
    // Skip if chunk is too small (except for last chunk)
    if (chunkTokens.length >= config.minTokens || startToken + config.maxTokens >= tokens.length) {
      chunks.push({
        id: `${extracted.id}-chunk-${chunkIndex}`,
        chunkIndex,
        content: chunkContent,
        tokenCount: chunkTokens.length,
        section: extracted.section,
        metadata: {
          title: `${extracted.title} (Part ${chunkIndex + 1})`,
          source: extracted.metadata.source,
          entities: extracted.metadata.entities,
          keywords: extracted.metadata.keywords,
          isPartial: true,
          totalChunks: -1,
        },
      });
      chunkIndex++;
    }
    
    // Move to next chunk with overlap
    startToken = endToken - config.overlapTokens;
    
    if (startToken >= tokens.length - config.overlapTokens) {
      break;
    }
  }
  
  // Update totalChunks in metadata
  chunks.forEach(chunk => {
    chunk.metadata.totalChunks = chunks.length;
  });
  
  return chunks;
}

export function chunkAllContent(
  extractedContent: ExtractedContent[],
  config?: ChunkConfig
): ContentChunk[] {
  console.log('📦 Starting content chunking...');
  
  const allChunks: ContentChunk[] = [];
  
  for (const content of extractedContent) {
    const chunks = chunkContent(content, config);
    allChunks.push(...chunks);
  }
  
  console.log(`✅ Created ${allChunks.length} chunks from ${extractedContent.length} items`);
  
  return allChunks;
}
