// Main Ingestion Script
// Orchestrates the entire data ingestion pipeline

import { extractAllContent } from './extract';
import { chunkAllContent } from './chunker';
import { embedChunks } from './embedder';
import { storeEmbeddings, createVectorSearchIndex, closeConnection } from './store';

async function runIngestion(): Promise<void> {
  console.log('🚀 Starting Portfolio Data Ingestion Pipeline');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const startTime = Date.now();
  
  try {
    // Step 1: Extract content
    const extractedContent = await extractAllContent();
    console.log('');
    
    // Step 2: Chunk content
    const chunks = chunkAllContent(extractedContent);
    console.log('');
    
    // Step 3: Generate embeddings (using local model)
    const embeddedChunks = await embedChunks(chunks);
    console.log('');
    
    // Step 4: Store in MongoDB
    const version = Date.now();
    await storeEmbeddings(embeddedChunks, version);
    console.log('');
    
    // Print index creation instructions
    await createVectorSearchIndex();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✨ Ingestion completed in ${duration}s`);
    
    // Print summary
    console.log('\n📊 Summary:');
    console.log(`   - Content items: ${extractedContent.length}`);
    console.log(`   - Chunks created: ${chunks.length}`);
    console.log(`   - Embeddings generated: ${embeddedChunks.length}`);
    console.log(`   - Embedding model: bge-small-en-v1.5 (local, 384 dimensions)`);
    console.log(`   - Version: ${version}`);
    
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    throw error;
  } finally {
    await closeConnection();
  }
}

// Run if executed directly
if (require.main === module) {
  runIngestion().catch(console.error);
}

export { runIngestion };
