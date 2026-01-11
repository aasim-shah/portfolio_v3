import { extractAllContent } from './extractors/portfolio-extractor';
import { chunkAllContent } from './chunker';
import { embedChunks } from './embedder';
import { storeEmbeddings, createVectorSearchIndex, closeConnection } from './store';

async function main() {
  console.log('🚀 Starting data ingestion pipeline...\n');
  
  try {
    // Step 1: Extract content
    const extractedContent = await extractAllContent();
    
    // Step 2: Chunk content
    const chunks = chunkAllContent(extractedContent);
    
    // Step 3: Generate embeddings
    const embeddedChunks = await embedChunks(chunks);
    
    // Step 4: Store in MongoDB
    await storeEmbeddings(embeddedChunks);
    
    // Step 5: Show vector index setup instructions
    console.log('\n📋 Next steps:');
    await createVectorSearchIndex();
    
    console.log('\n✨ Data ingestion complete!');
  } catch (error) {
    console.error('❌ Error during ingestion:', error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
}

main();
