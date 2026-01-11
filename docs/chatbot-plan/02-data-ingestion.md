# Data Ingestion Pipeline

## Overview

The data ingestion pipeline extracts content from the portfolio website, processes it into semantic chunks, generates embeddings, and stores them in MongoDB Atlas for vector search.

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA INGESTION PIPELINE                              │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
  │   EXTRACT   │───▶│    CHUNK    │───▶│    EMBED    │───▶│    STORE    │
  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
        │                  │                  │                  │
        ▼                  ▼                  ▼                  ▼
  Portfolio Data    Semantic Chunks     Vector Embeddings   MongoDB Atlas
  (TypeScript)      (500 tokens)        (1536 dimensions)   (Vector Index)
```

## Step 1: Content Extraction

### Source Data Mapping

The portfolio data is stored in `/data/index.tsx`. Here's how each data type maps to content:

```typescript
// File: scripts/ingest/extractors/portfolio-extractor.ts

import {
  myExperience,
  myStack,
  myServices,
  myShowCases,
  testimonials,
  myServicesPlans,
  faqData,
  counterLists,
  followerData,
  socialLists,
  pagesLists
} from '@/data';

interface ExtractedContent {
  id: string;
  section: SectionType;
  title: string;
  content: string;
  metadata: {
    source: string;
    entities: string[];
    keywords: string[];
  };
}

// Content extraction functions for each section
export function extractExperience(): ExtractedContent[] {
  return myExperience.map(exp => ({
    id: `experience-${exp.id}`,
    section: SectionType.EXPERIENCE,
    title: exp.title,
    content: `
      Position: ${exp.title}
      Company: ${exp.company} (${exp.label})
      Period: ${exp.year}
      Description: ${exp.description}
      Company Website: ${exp.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myExperience',
      entities: [exp.company, exp.title],
      keywords: ['experience', 'work', 'job', exp.company.toLowerCase()]
    }
  }));
}

export function extractServices(): ExtractedContent[] {
  return myServices.map(service => ({
    id: `service-${service.id}`,
    section: SectionType.SERVICES,
    title: service.title,
    content: `
      Service: ${service.title}
      Description: ${service.description}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myServices',
      entities: [service.title],
      keywords: ['service', 'offer', service.title.toLowerCase()]
    }
  }));
}

export function extractServicePlans(): ExtractedContent[] {
  return myServicesPlans.map(plan => ({
    id: `service-plan-${plan.id}`,
    section: SectionType.SERVICES,
    title: plan.service,
    content: `
      Service: ${plan.service}
      Price: ${plan.price} per hour
      Description: ${plan.description}
      Completed Works: ${plan.completedWorks}
      Experience: ${plan.experience}
      Total Hours Worked: ${plan.totalHoursWorked}
      Booking Link: ${plan.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myServicesPlans',
      entities: [plan.service],
      keywords: ['price', 'rate', 'cost', 'hire', plan.service.toLowerCase()]
    }
  }));
}

export function extractProjects(): ExtractedContent[] {
  return myShowCases.map(project => ({
    id: `project-${project.id}`,
    section: SectionType.PROJECTS,
    title: project.title,
    content: `
      Project: ${project.title}
      Description: ${project.description}
      Type: ${project.type}
      Theme: ${project.theme}
      Pages: ${project.pages}
      Link: ${project.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myShowCases',
      entities: [project.title, project.type],
      keywords: ['project', 'portfolio', 'work', project.title.toLowerCase()]
    }
  }));
}

export function extractSkills(): ExtractedContent[] {
  return myStack.map(skill => ({
    id: `skill-${skill.id}`,
    section: SectionType.SKILLS,
    title: skill.title,
    content: `
      Technology: ${skill.title}
      Category: ${skill.description}
      Documentation: ${skill.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myStack',
      entities: [skill.title],
      keywords: ['skill', 'technology', 'stack', skill.title.toLowerCase()]
    }
  }));
}

export function extractTestimonials(): ExtractedContent[] {
  return testimonials.map(testimonial => ({
    id: `testimonial-${testimonial.id}`,
    section: SectionType.TESTIMONIALS,
    title: `Testimonial from ${testimonial.name}`,
    content: `
      Client: ${testimonial.name}
      Location: ${testimonial.location}
      Feedback: "${testimonial.description}"
    `.trim(),
    metadata: {
      source: '/data/index.tsx#testimonials',
      entities: [testimonial.name],
      keywords: ['testimonial', 'review', 'feedback', 'client']
    }
  }));
}

export function extractFAQ(): ExtractedContent[] {
  return faqData.map((faq, index) => ({
    id: `faq-${index}`,
    section: SectionType.FAQ,
    title: faq.question,
    content: `
      Question: ${faq.question}
      Answer: ${faq.answer}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#faqData',
      entities: [],
      keywords: ['faq', 'question', 'answer', 'help']
    }
  }));
}

export function extractStats(): ExtractedContent[] {
  const statsContent = counterLists.map(stat => 
    `${stat.title}: ${stat.value}`
  ).join('\n');
  
  return [{
    id: 'stats-overview',
    section: SectionType.ABOUT,
    title: 'Portfolio Statistics',
    content: `
      Portfolio Statistics and Achievements:
      ${statsContent}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#counterLists',
      entities: [],
      keywords: ['stats', 'numbers', 'clients', 'experience', 'projects']
    }
  }];
}

export function extractAbout(): ExtractedContent[] {
  // Static about content from the website
  return [{
    id: 'about-main',
    section: SectionType.ABOUT,
    title: 'About Aasim Shah',
    content: `
      Name: Syed Aasim Shah
      Role: Senior MERN Stack Developer / Full-Stack Developer
      Location: Rawalpindi, Pakistan
      
      Professional Summary:
      I craft high-performance web apps, seamless APIs, and dynamic full-stack solutions—turning ideas into reality!
      
      Specialization:
      - MERN Stack Development (MongoDB, Express, React, Node.js)
      - API Development (RESTful and GraphQL)
      - Cloud & DevOps (AWS, Docker, CI/CD)
      - Cross-platform Mobile Development (Flutter)
      
      Availability: Available for work
      
      Contact:
      - Email: contact@aasimshah.com
      - Phone: +92-348-3360070
      - Upwork: https://www.upwork.com/freelancers/aasimshah
      - Fiverr: https://www.fiverr.com/users/aaasimmshah
      - GitHub: https://www.github.com/aasim-shah
    `.trim(),
    metadata: {
      source: 'app/page.tsx + components/Hero/Hero.tsx',
      entities: ['Aasim Shah', 'Syed Aasim Shah'],
      keywords: ['about', 'developer', 'mern', 'fullstack', 'contact', 'hire']
    }
  }];
}

export function extractContact(): ExtractedContent[] {
  return [{
    id: 'contact-info',
    section: SectionType.CONTACT,
    title: 'Contact Information',
    content: `
      Contact Aasim Shah:
      
      Email: contact@aasimshah.com
      Phone: +92-348-3360070
      
      Freelance Platforms:
      - Upwork: https://www.upwork.com/freelancers/aasimshah
      - Fiverr: https://www.fiverr.com/users/aaasimmshah
      
      Social Media:
      - GitHub: https://www.github.com/aasim-shah
      - LinkedIn: Available on the website
      
      Schedule a Meeting:
      You can schedule a 15-minute call via Cal.com integration on the website.
      
      Business Location:
      Bahria Town Phase 7, Rawalpindi, Pakistan
    `.trim(),
    metadata: {
      source: 'multiple sources',
      entities: ['contact@aasimshah.com'],
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'schedule', 'call']
    }
  }];
}
```

### Main Extraction Orchestrator

```typescript
// File: scripts/ingest/extract.ts

import {
  extractExperience,
  extractServices,
  extractServicePlans,
  extractProjects,
  extractSkills,
  extractTestimonials,
  extractFAQ,
  extractStats,
  extractAbout,
  extractContact
} from './extractors/portfolio-extractor';

export interface ExtractedContent {
  id: string;
  section: SectionType;
  title: string;
  content: string;
  metadata: {
    source: string;
    entities: string[];
    keywords: string[];
  };
}

export async function extractAllContent(): Promise<ExtractedContent[]> {
  console.log('🔍 Starting content extraction...');
  
  const allContent: ExtractedContent[] = [
    ...extractAbout(),
    ...extractExperience(),
    ...extractServices(),
    ...extractServicePlans(),
    ...extractProjects(),
    ...extractSkills(),
    ...extractTestimonials(),
    ...extractFAQ(),
    ...extractStats(),
    ...extractContact(),
  ];
  
  console.log(`✅ Extracted ${allContent.length} content items`);
  
  return allContent;
}
```

## Step 2: Smart Chunking

### Chunking Strategy

```typescript
// File: scripts/ingest/chunker.ts

import { encode, decode } from 'gpt-tokenizer';

interface ChunkConfig {
  maxTokens: number;      // Maximum tokens per chunk
  overlapTokens: number;  // Overlap between chunks
  minTokens: number;      // Minimum tokens (avoid tiny chunks)
}

const DEFAULT_CONFIG: ChunkConfig = {
  maxTokens: 500,
  overlapTokens: 50,
  minTokens: 100,
};

export interface ContentChunk {
  id: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
    isPartial: boolean;
    totalChunks: number;
  };
}

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
          totalChunks: -1, // Will be updated after processing
        },
      });
      chunkIndex++;
    }
    
    // Move to next chunk with overlap
    startToken = endToken - config.overlapTokens;
    
    // Prevent infinite loop
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
```

## Step 3: Embedding Generation

### OpenAI Embedding Service

```typescript
// File: scripts/ingest/embedder.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 100; // OpenAI allows up to 2048 inputs per request

export interface EmbeddedChunk extends ContentChunk {
  embedding: number[];
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
    dimensions: EMBEDDING_DIMENSIONS,
  });
  
  return response.data[0].embedding;
}

async function generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    dimensions: EMBEDDING_DIMENSIONS,
  });
  
  return response.data.map(item => item.embedding);
}

export async function embedChunks(chunks: ContentChunk[]): Promise<EmbeddedChunk[]> {
  console.log('🧠 Generating embeddings...');
  
  const embeddedChunks: EmbeddedChunk[] = [];
  
  // Process in batches
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(chunk => chunk.content);
    
    console.log(`  Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);
    
    const embeddings = await generateEmbeddingsBatch(texts);
    
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
```

## Step 4: Vector Storage

### MongoDB Atlas Storage

```typescript
// File: scripts/ingest/store.ts

import { MongoClient, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = 'portfolio_chatbot';
const COLLECTION_NAME = 'portfolio_embeddings';

interface StoredChunk {
  _id?: string;
  chunkId: string;
  content: string;
  embedding: number[];
  section: string;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
    isPartial: boolean;
    totalChunks: number;
    chunkIndex: number;
    tokenCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

let client: MongoClient | null = null;

async function getCollection(): Promise<Collection<StoredChunk>> {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

export async function storeEmbeddings(
  embeddedChunks: EmbeddedChunk[],
  version: number = 1
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
  
  // Clear existing data for this version
  await collection.deleteMany({ version });
  
  // Insert new documents
  if (documents.length > 0) {
    await collection.insertMany(documents);
  }
  
  console.log(`✅ Stored ${documents.length} chunks in MongoDB Atlas`);
}

export async function createVectorSearchIndex(): Promise<void> {
  console.log('🔧 Creating vector search index...');
  
  const collection = await getCollection();
  
  // Note: Vector search index must be created via Atlas UI or Atlas Admin API
  // This is the index definition to use:
  const indexDefinition = {
    name: 'vector_index',
    type: 'vectorSearch',
    definition: {
      fields: [
        {
          type: 'vector',
          path: 'embedding',
          numDimensions: 1536,
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
  
  console.log('📋 Vector search index definition:');
  console.log(JSON.stringify(indexDefinition, null, 2));
  console.log('\n⚠️  Create this index via MongoDB Atlas UI or Admin API');
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
```

## Step 5: Main Ingestion Script

```typescript
// File: scripts/ingest/index.ts

import { extractAllContent } from './extract';
import { chunkAllContent } from './chunker';
import { embedChunks } from './embedder';
import { storeEmbeddings, createVectorSearchIndex, closeConnection } from './store';

async function runIngestion(): Promise<void> {
  console.log('🚀 Starting portfolio data ingestion pipeline\n');
  
  const startTime = Date.now();
  
  try {
    // Step 1: Extract content
    const extractedContent = await extractAllContent();
    console.log('');
    
    // Step 2: Chunk content
    const chunks = chunkAllContent(extractedContent);
    console.log('');
    
    // Step 3: Generate embeddings
    const embeddedChunks = await embedChunks(chunks);
    console.log('');
    
    // Step 4: Store in MongoDB
    const version = Date.now(); // Use timestamp as version
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
    console.log(`   - Version: ${version}`);
    
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    throw error;
  } finally {
    await closeConnection();
  }
}

// Run if executed directly
runIngestion().catch(console.error);

export { runIngestion };
```

## MongoDB Atlas Vector Search Index

### Index Creation (Atlas UI)

Create this index in MongoDB Atlas UI under "Atlas Search" → "Create Search Index":

```json
{
  "name": "vector_index",
  "type": "vectorSearch",
  "definition": {
    "fields": [
      {
        "type": "vector",
        "path": "embedding",
        "numDimensions": 1536,
        "similarity": "cosine"
      },
      {
        "type": "filter",
        "path": "section"
      },
      {
        "type": "filter", 
        "path": "metadata.keywords"
      }
    ]
  }
}
```

## Re-Indexing Strategy

### When to Re-Index

1. **Portfolio Data Changes**: When `/data/index.tsx` is updated
2. **Scheduled Re-Index**: Weekly cron job to ensure freshness
3. **Manual Trigger**: Admin endpoint or CLI command

### Re-Indexing Script

```typescript
// File: scripts/ingest/reindex.ts

import { runIngestion } from './index';

async function reindex(): Promise<void> {
  console.log('🔄 Starting re-indexing process...\n');
  
  // Run full ingestion (will replace existing data)
  await runIngestion();
  
  console.log('\n🔄 Re-indexing complete');
}

reindex().catch(console.error);
```

### Package.json Scripts

```json
{
  "scripts": {
    "ingest": "tsx scripts/ingest/index.ts",
    "ingest:reindex": "tsx scripts/ingest/reindex.ts"
  }
}
```

## Data Schema Summary

### Input: Portfolio Data Structure

```typescript
// From /data/index.tsx
interface PortfolioData {
  myExperience: myExperienceTypes[];
  myStack: myStackTypes[];
  myServices: myServicesTypes[];
  myServicesPlans: myServicesPlansTypes[];
  myShowCases: myShowCasesTypes[];
  testimonials: testimonialsTypes[];
  faqData: FAQ[];
  counterLists: counterListsType[];
  followerData: FollowerData[];
  socialLists: socialListsTypes[];
  pagesLists: pagesListsType[];
}
```

### Output: MongoDB Document Structure

```typescript
interface StoredChunk {
  _id: ObjectId;
  chunkId: string;              // e.g., "experience-1-chunk-0"
  content: string;              // The text content
  embedding: number[];          // 1536-dimensional vector
  section: SectionType;         // 'experience', 'services', etc.
  metadata: {
    title: string;              // Chunk title
    source: string;             // Source file reference
    entities: string[];         // Named entities
    keywords: string[];         // Search keywords
    isPartial: boolean;         // Is this a partial chunk?
    totalChunks: number;        // Total chunks for this content
    chunkIndex: number;         // Index within content
    tokenCount: number;         // Token count
  };
  createdAt: Date;
  updatedAt: Date;
  version: number;              // Ingestion version timestamp
}
```

## Environment Variables Required

```env
# .env.local
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb+srv://...
```

## Estimated Content Volume

| Section | Items | Est. Chunks |
|---------|-------|-------------|
| About | 1 | 1-2 |
| Experience | 3 | 3-6 |
| Services | 4 | 4-8 |
| Service Plans | 4 | 4-8 |
| Projects | 4 | 4-8 |
| Skills | 10 | 10-15 |
| Testimonials | 4 | 4-8 |
| FAQ | 6 | 6-12 |
| Stats | 1 | 1 |
| Contact | 1 | 1 |
| **Total** | **~38** | **~40-70** |

Estimated embedding cost: ~$0.001 (negligible)
