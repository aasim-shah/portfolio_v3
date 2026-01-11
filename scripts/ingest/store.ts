import { MongoClient, Collection } from 'mongodb';
import { EmbeddedChunk, StoredChunk, SearchResult, SearchOptions, SectionType } from '@/types';

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = 'portfolio_chatbot';
const COLLECTION_NAME = 'portfolio_embeddings';

let client: MongoClient | null = null;

async function getCollection(): Promise<Collection<StoredChunk>> {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
  }
  
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

export async function storeEmbeddings(
  embeddedChunks: EmbeddedChunk[],
  version: number = Date.now()
): Promise<void> {
  console.log('💾 Storing embeddings in MongoDB Atlas...');
  
  const collection = await getCollection();
  const now = new Date();
  
  // Prepare documents
  const documents: StoredChunk[] = embeddedChunks.map(chunk => ({
    chunkId: chunk.id,
    content: chunk.content,
    embedding: chunk.embedding,
    section: chunk.section,
    metadata: {
      title: chunk.metadata.title,
      source: chunk.metadata.source,
      entities: chunk.metadata.entities,
      keywords: chunk.metadata.keywords,
      isPartial: chunk.metadata.isPartial,
      totalChunks: chunk.metadata.totalChunks,
      chunkIndex: chunk.chunkIndex,
      tokenCount: chunk.tokenCount,
    },
    createdAt: now,
    updatedAt: now,
    version,
  }));
  
  // Clear existing data
  await collection.deleteMany({});
  
  // Insert new documents
  if (documents.length > 0) {
    await collection.insertMany(documents);
  }
  
  console.log(`✅ Stored ${documents.length} chunks in MongoDB Atlas`);
  console.log(`   Version: ${version}`);
}

export async function createVectorSearchIndex(): Promise<void> {
  console.log('\n🔧 Vector Search Index Configuration:');
  console.log('═══════════════════════════════════════════════════════════');
  
  const indexDefinition = {
    name: 'vector_index',
    type: 'vectorSearch',
    definition: {
      fields: [
        {
          type: 'vector',
          path: 'embedding',
          numDimensions: 384, // bge-small-en-v1.5 dimensions
          similarity: 'cosine',
        },
        {
          type: 'filter',
          path: 'section',
        },
        {
          type: 'filter',
          path: 'metadata.keywords',
        },
      ],
    },
  };
  
  console.log(JSON.stringify(indexDefinition, null, 2));
  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n⚠️  IMPORTANT: Create this index in MongoDB Atlas:');
  console.log('   1. Go to: https://cloud.mongodb.com/');
  console.log('   2. Select your cluster → Search → Create Search Index');
  console.log('   3. Choose "JSON Editor" and paste the configuration above');
  console.log('   4. Name it "vector_index" and create');
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Vector search service for querying
export class VectorSearchService {
  private client: MongoClient;
  private collection: Collection<StoredChunk> | null = null;
  private isAtlas: boolean = false;
  
  constructor(private mongodbUri: string) {
    this.client = new MongoClient(mongodbUri);
    // Check if using Atlas (contains mongodb.net or mongodb+srv)
    this.isAtlas = mongodbUri.includes('mongodb.net') || mongodbUri.includes('mongodb+srv');
  }
  
  async connect(): Promise<void> {
    await this.client.connect();
    this.collection = this.client
      .db(DATABASE_NAME)
      .collection(COLLECTION_NAME);
  }
  
  async close(): Promise<void> {
    await this.client.close();
  }

  // Check if database has been seeded
  async isSeeded(): Promise<boolean> {
    if (!this.collection) {
      throw new Error('Database not connected');
    }
    const count = await this.collection.countDocuments();
    return count > 0;
  }

  // Calculate cosine similarity between two vectors
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same length');
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

  // Local MongoDB vector search (fallback)
  private async searchLocal(options: SearchOptions): Promise<SearchResult[]> {
    if (!this.collection) {
      throw new Error('Database not connected');
    }

    const { embedding, sectionFilter, maxResults, minScore } = options;
    
    // Fetch documents with optional section filter
    const filter = sectionFilter ? { section: sectionFilter } : {};
    const documents = await this.collection.find(filter).toArray();
    
    // Calculate similarity for each document
    const results = documents.map(doc => {
      const score = this.cosineSimilarity(embedding, doc.embedding);
      return {
        content: doc.content,
        score,
        section: doc.section as SectionType,
        metadata: doc.metadata,
      };
    });
    
    // Filter by minimum score and sort by score descending
    const filtered = results
      .filter(r => r.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
    
    return filtered;
  }

  // Atlas vector search (when available)
  private async searchAtlas(options: SearchOptions): Promise<SearchResult[]> {
    if (!this.collection) {
      throw new Error('Database not connected');
    }
    
    const { embedding, sectionFilter, maxResults, minScore } = options;
    
    // Build the vector search pipeline
    const pipeline: any[] = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: maxResults * 10,
          limit: maxResults * 2,
          ...(sectionFilter && {
            filter: { section: sectionFilter },
          }),
        },
      },
      {
        $addFields: {
          score: { $meta: 'vectorSearchScore' },
        },
      },
      {
        $match: {
          score: { $gte: minScore },
        },
      },
      {
        $limit: maxResults,
      },
      {
        $project: {
          _id: 0,
          content: 1,
          score: 1,
          section: 1,
          metadata: 1,
        },
      },
    ];
    
    const results = await this.collection.aggregate(pipeline).toArray();
    
    return results as unknown as SearchResult[];
  }
  
  async search(options: SearchOptions): Promise<SearchResult[]> {
    // Use local search for non-Atlas deployments, Atlas search otherwise
    if (this.isAtlas) {
      try {
        return await this.searchAtlas(options);
      } catch (error: any) {
        // If Atlas search fails, fall back to local search
        if (error.code === 6047401 || error.codeName === 'Location6047401') {
          console.log('⚠️  Atlas vector search not available, using local similarity search');
          return await this.searchLocal(options);
        }
        throw error;
      }
    } else {
      console.log('🔍 Using local vector search (cosine similarity)');
      return await this.searchLocal(options);
    }
  }
  
  async getBySection(section: SectionType): Promise<SearchResult[]> {
    if (!this.collection) {
      throw new Error('Database not connected');
    }
    
    const results = await this.collection
      .find({ section })
      .project({
        _id: 0,
        content: 1,
        section: 1,
        metadata: 1,
      })
      .toArray();
    
    return results.map(r => ({
      ...r,
      score: 1.0,
    })) as unknown as SearchResult[];
  }
}
