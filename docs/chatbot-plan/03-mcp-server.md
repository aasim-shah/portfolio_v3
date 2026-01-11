# MCP Server Implementation

## Overview

The MCP (Model Context Protocol) server provides a standardized interface for the chatbot to access portfolio data through well-defined tools. It acts as the bridge between the LLM and the vector database.

## MCP Server Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MCP SERVER                                     │
│                    (@modelcontextprotocol/sdk)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      SERVER CORE                                 │   │
│  │  • Protocol Handler                                              │   │
│  │  • Tool Registry                                                 │   │
│  │  • Request/Response Management                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         TOOLS                                    │   │
│  ├─────────────────┬─────────────────┬─────────────────────────────┤   │
│  │ search_portfolio│ get_section_    │ get_contact_                │   │
│  │ _content        │ details         │ info                        │   │
│  └────────┬────────┴────────┬────────┴────────┬────────────────────┘   │
│           │                 │                 │                         │
│  ┌────────▼─────────────────▼─────────────────▼────────────────────┐   │
│  │                    SERVICES LAYER                                │   │
│  │  • VectorSearchService                                           │   │
│  │  • EmbeddingService                                              │   │
│  │  • ContentFilterService                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
mcp-server/
├── src/
│   ├── index.ts                 # Server entry point
│   ├── server.ts                # MCP server setup
│   ├── config.ts                # Configuration
│   ├── types.ts                 # Type definitions
│   ├── tools/
│   │   ├── index.ts             # Tool registry
│   │   ├── search-portfolio.ts  # Main search tool
│   │   ├── get-section.ts       # Section details tool
│   │   └── get-contact.ts       # Contact info tool
│   ├── services/
│   │   ├── vector-search.ts     # MongoDB vector search
│   │   ├── embedding.ts         # OpenAI embeddings
│   │   └── content-filter.ts    # Result filtering
│   └── utils/
│       ├── logger.ts            # Logging utilities
│       └── validators.ts        # Input validation
├── package.json
├── tsconfig.json
└── .env.example
```

## Server Implementation

### Entry Point

```typescript
// File: mcp-server/src/index.ts

import { createMCPServer } from './server';
import { config } from './config';
import { logger } from './utils/logger';

async function main(): Promise<void> {
  logger.info('Starting Portfolio MCP Server...');
  
  const server = await createMCPServer();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('Shutting down MCP server...');
    await server.close();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    logger.info('Shutting down MCP server...');
    await server.close();
    process.exit(0);
  });
  
  logger.info(`MCP Server running on ${config.transport}`);
}

main().catch((error) => {
  logger.error('Failed to start MCP server:', error);
  process.exit(1);
});
```

### Server Setup

```typescript
// File: mcp-server/src/server.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { registerTools, getToolHandlers } from './tools';
import { VectorSearchService } from './services/vector-search';
import { EmbeddingService } from './services/embedding';
import { config } from './config';
import { logger } from './utils/logger';

export interface MCPServerContext {
  vectorSearch: VectorSearchService;
  embedding: EmbeddingService;
}

export async function createMCPServer(): Promise<Server> {
  // Initialize services
  const vectorSearch = new VectorSearchService(config.mongodbUri);
  const embedding = new EmbeddingService(config.openaiApiKey);
  
  await vectorSearch.connect();
  
  const context: MCPServerContext = {
    vectorSearch,
    embedding,
  };
  
  // Create server
  const server = new Server(
    {
      name: 'portfolio-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );
  
  // Register tool listing handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = registerTools();
    logger.debug(`Returning ${tools.length} tools`);
    return { tools };
  });
  
  // Register tool execution handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    logger.info(`Tool called: ${name}`, { args });
    
    const handlers = getToolHandlers(context);
    const handler = handlers[name];
    
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    try {
      const result = await handler(args);
      logger.info(`Tool ${name} completed successfully`);
      return result;
    } catch (error) {
      logger.error(`Tool ${name} failed:`, error);
      throw error;
    }
  });
  
  // Connect transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  logger.info('MCP Server initialized successfully');
  
  return server;
}
```

### Configuration

```typescript
// File: mcp-server/src/config.ts

import { z } from 'zod';

const configSchema = z.object({
  mongodbUri: z.string().min(1),
  openaiApiKey: z.string().min(1),
  transport: z.enum(['stdio', 'sse']).default('stdio'),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  vectorSearchConfig: z.object({
    indexName: z.string().default('vector_index'),
    minScore: z.number().default(0.70),
    maxResults: z.number().default(5),
  }).default({}),
});

export type Config = z.infer<typeof configSchema>;

function loadConfig(): Config {
  return configSchema.parse({
    mongodbUri: process.env.MONGODB_URI,
    openaiApiKey: process.env.OPENAI_API_KEY,
    transport: process.env.MCP_TRANSPORT || 'stdio',
    logLevel: process.env.LOG_LEVEL || 'info',
    vectorSearchConfig: {
      indexName: process.env.VECTOR_INDEX_NAME || 'vector_index',
      minScore: parseFloat(process.env.MIN_SIMILARITY_SCORE || '0.70'),
      maxResults: parseInt(process.env.MAX_RESULTS || '5', 10),
    },
  });
}

export const config = loadConfig();
```

### Type Definitions

```typescript
// File: mcp-server/src/types.ts

export enum SectionType {
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  SERVICES = 'services',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  FAQ = 'faq',
}

export interface SearchResult {
  content: string;
  score: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
  };
}

export interface ToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}

export interface SearchToolArgs {
  query: string;
  section_filter?: SectionType;
  max_results?: number;
}

export interface SectionToolArgs {
  section: SectionType;
}

export interface ContactToolArgs {
  // No arguments needed
}
```

## Tool Implementations

### Tool Registry

```typescript
// File: mcp-server/src/tools/index.ts

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { MCPServerContext } from '../server';
import { ToolResponse, SearchToolArgs, SectionToolArgs } from '../types';
import { handleSearchPortfolio } from './search-portfolio';
import { handleGetSection } from './get-section';
import { handleGetContact } from './get-contact';

export function registerTools(): Tool[] {
  return [
    {
      name: 'search_portfolio_content',
      description: `Search the portfolio website content using semantic search. 
        Use this tool to find information about Aasim Shah's experience, services, 
        projects, skills, testimonials, and contact information. 
        Returns relevant content chunks with confidence scores.
        IMPORTANT: Only use results with score >= 0.70 for answering questions.`,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query to find relevant portfolio content',
          },
          section_filter: {
            type: 'string',
            enum: ['about', 'experience', 'services', 'projects', 'skills', 'testimonials', 'contact', 'faq'],
            description: 'Optional: Filter results to a specific section',
          },
          max_results: {
            type: 'number',
            description: 'Maximum number of results to return (default: 5)',
            default: 5,
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'get_section_details',
      description: `Get all content from a specific section of the portfolio.
        Use this when the user asks about a specific category like 
        "all services", "all projects", "all experience", etc.`,
      inputSchema: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            enum: ['about', 'experience', 'services', 'projects', 'skills', 'testimonials', 'contact', 'faq'],
            description: 'The section to retrieve',
          },
        },
        required: ['section'],
      },
    },
    {
      name: 'get_contact_info',
      description: `Get Aasim Shah's contact information including email, 
        phone, social media links, and availability status.
        Use this when users ask how to contact, hire, or reach out.`,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  ];
}

export type ToolHandler = (args: Record<string, unknown>) => Promise<ToolResponse>;

export function getToolHandlers(context: MCPServerContext): Record<string, ToolHandler> {
  return {
    search_portfolio_content: (args) => handleSearchPortfolio(args as SearchToolArgs, context),
    get_section_details: (args) => handleGetSection(args as SectionToolArgs, context),
    get_contact_info: () => handleGetContact(context),
  };
}
```

### Search Portfolio Tool

```typescript
// File: mcp-server/src/tools/search-portfolio.ts

import { MCPServerContext } from '../server';
import { SearchToolArgs, ToolResponse, SectionType } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';

export async function handleSearchPortfolio(
  args: SearchToolArgs,
  context: MCPServerContext
): Promise<ToolResponse> {
  const { query, section_filter, max_results = 5 } = args;
  
  logger.info('Searching portfolio content', { query, section_filter, max_results });
  
  // Generate embedding for the query
  const queryEmbedding = await context.embedding.generateEmbedding(query);
  
  // Perform vector search
  const results = await context.vectorSearch.search({
    embedding: queryEmbedding,
    sectionFilter: section_filter as SectionType | undefined,
    maxResults: Math.min(max_results, 10), // Cap at 10
    minScore: config.vectorSearchConfig.minScore,
  });
  
  // Check if we have any valid results
  if (results.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'no_results',
            message: 'No relevant content found in the portfolio for this query.',
            query,
            suggestion: 'This information may not be available on the website.',
          }, null, 2),
        },
      ],
    };
  }
  
  // Filter results below threshold
  const validResults = results.filter(r => r.score >= config.vectorSearchConfig.minScore);
  
  if (validResults.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'low_confidence',
            message: 'Found some content but confidence is too low to provide accurate information.',
            query,
            highest_score: results[0]?.score || 0,
            threshold: config.vectorSearchConfig.minScore,
          }, null, 2),
        },
      ],
    };
  }
  
  // Format successful results
  const formattedResults = validResults.map((result, index) => ({
    rank: index + 1,
    content: result.content,
    confidence: Math.round(result.score * 100) / 100,
    section: result.section,
    title: result.metadata.title,
    source: result.metadata.source,
  }));
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          status: 'success',
          query,
          result_count: formattedResults.length,
          results: formattedResults,
        }, null, 2),
      },
    ],
  };
}
```

### Get Section Details Tool

```typescript
// File: mcp-server/src/tools/get-section.ts

import { MCPServerContext } from '../server';
import { SectionToolArgs, ToolResponse, SectionType } from '../types';
import { logger } from '../utils/logger';

export async function handleGetSection(
  args: SectionToolArgs,
  context: MCPServerContext
): Promise<ToolResponse> {
  const { section } = args;
  
  logger.info('Getting section details', { section });
  
  // Validate section
  if (!Object.values(SectionType).includes(section as SectionType)) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'error',
            message: `Invalid section: ${section}. Valid sections are: ${Object.values(SectionType).join(', ')}`,
          }, null, 2),
        },
      ],
      isError: true,
    };
  }
  
  // Get all content from the section
  const results = await context.vectorSearch.getBySection(section as SectionType);
  
  if (results.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'no_results',
            message: `No content found for section: ${section}`,
            section,
          }, null, 2),
        },
      ],
    };
  }
  
  // Format results
  const formattedResults = results.map((result) => ({
    title: result.metadata.title,
    content: result.content,
    source: result.metadata.source,
  }));
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          status: 'success',
          section,
          item_count: formattedResults.length,
          items: formattedResults,
        }, null, 2),
      },
    ],
  };
}
```

### Get Contact Info Tool

```typescript
// File: mcp-server/src/tools/get-contact.ts

import { MCPServerContext } from '../server';
import { ToolResponse, SectionType } from '../types';
import { logger } from '../utils/logger';

export async function handleGetContact(
  context: MCPServerContext
): Promise<ToolResponse> {
  logger.info('Getting contact information');
  
  // Get contact section content
  const results = await context.vectorSearch.getBySection(SectionType.CONTACT);
  
  // Also get about section for additional contact context
  const aboutResults = await context.vectorSearch.getBySection(SectionType.ABOUT);
  
  // Combine relevant information
  const allContent = [...results, ...aboutResults];
  
  if (allContent.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'no_results',
            message: 'Contact information not found.',
          }, null, 2),
        },
      ],
    };
  }
  
  // Extract and format contact information
  const contactInfo = {
    status: 'success',
    contact: {
      email: 'contact@aasimshah.com',
      phone: '+92-348-3360070',
      location: 'Bahria Town Phase 7, Rawalpindi, Pakistan',
      availability: 'Available for work',
      platforms: {
        upwork: 'https://www.upwork.com/freelancers/aasimshah',
        fiverr: 'https://www.fiverr.com/users/aaasimmshah',
        github: 'https://www.github.com/aasim-shah',
      },
      schedule_meeting: 'Available via Cal.com integration on website',
    },
    raw_content: allContent.map(r => r.content),
  };
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(contactInfo, null, 2),
      },
    ],
  };
}
```

## Services Implementation

### Vector Search Service

```typescript
// File: mcp-server/src/services/vector-search.ts

import { MongoClient, Collection } from 'mongodb';
import { SectionType, SearchResult } from '../types';
import { logger } from '../utils/logger';

interface StoredChunk {
  chunkId: string;
  content: string;
  embedding: number[];
  section: string;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
  };
}

interface SearchOptions {
  embedding: number[];
  sectionFilter?: SectionType;
  maxResults: number;
  minScore: number;
}

export class VectorSearchService {
  private client: MongoClient;
  private collection: Collection<StoredChunk> | null = null;
  
  constructor(private mongodbUri: string) {
    this.client = new MongoClient(mongodbUri);
  }
  
  async connect(): Promise<void> {
    await this.client.connect();
    this.collection = this.client
      .db('portfolio_chatbot')
      .collection('portfolio_embeddings');
    logger.info('Connected to MongoDB Atlas');
  }
  
  async close(): Promise<void> {
    await this.client.close();
    logger.info('Disconnected from MongoDB Atlas');
  }
  
  async search(options: SearchOptions): Promise<SearchResult[]> {
    if (!this.collection) {
      throw new Error('Database not connected');
    }
    
    const { embedding, sectionFilter, maxResults, minScore } = options;
    
    // Build the vector search pipeline
    const pipeline: object[] = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: embedding,
          numCandidates: maxResults * 10, // Over-fetch for filtering
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
    
    logger.debug('Executing vector search', { sectionFilter, maxResults, minScore });
    
    const results = await this.collection.aggregate(pipeline).toArray();
    
    logger.info(`Vector search returned ${results.length} results`);
    
    return results as SearchResult[];
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
      score: 1.0, // Direct retrieval, full confidence
    })) as SearchResult[];
  }
}
```

### Embedding Service

```typescript
// File: mcp-server/src/services/embedding.ts

import OpenAI from 'openai';
import { logger } from '../utils/logger';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;

export class EmbeddingService {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async generateEmbedding(text: string): Promise<number[]> {
    logger.debug('Generating embedding for query');
    
    const response = await this.openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
      dimensions: EMBEDDING_DIMENSIONS,
    });
    
    return response.data[0].embedding;
  }
}
```

### Logger Utility

```typescript
// File: mcp-server/src/utils/logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private level: LogLevel;
  
  constructor(level: LogLevel = 'info') {
    this.level = level;
  }
  
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }
  
  private formatMessage(level: LogLevel, message: string, meta?: object): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }
  
  debug(message: string, meta?: object): void {
    if (this.shouldLog('debug')) {
      console.error(this.formatMessage('debug', message, meta));
    }
  }
  
  info(message: string, meta?: object): void {
    if (this.shouldLog('info')) {
      console.error(this.formatMessage('info', message, meta));
    }
  }
  
  warn(message: string, meta?: object): void {
    if (this.shouldLog('warn')) {
      console.error(this.formatMessage('warn', message, meta));
    }
  }
  
  error(message: string, error?: unknown): void {
    if (this.shouldLog('error')) {
      const meta = error instanceof Error 
        ? { error: error.message, stack: error.stack }
        : { error };
      console.error(this.formatMessage('error', message, meta));
    }
  }
}

export const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel) || 'info'
);
```

## Package Configuration

```json
// File: mcp-server/package.json
{
  "name": "portfolio-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for portfolio chatbot",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "mongodb": "^6.3.0",
    "openai": "^4.28.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
```

```json
// File: mcp-server/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Example Tool Responses

### Successful Search Response

```json
{
  "status": "success",
  "query": "What services does Aasim offer?",
  "result_count": 4,
  "results": [
    {
      "rank": 1,
      "content": "Service: MERN Stack Development\nPrice: $30 per hour\nDescription: Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js.\nCompleted Works: 50+\nExperience: 5+ years\nTotal Hours Worked: 1500+ hours",
      "confidence": 0.92,
      "section": "services",
      "title": "MERN Stack Development",
      "source": "/data/index.tsx#myServicesPlans"
    },
    {
      "rank": 2,
      "content": "Service: API Development\nPrice: $40+ per hour\nDescription: Designing and developing RESTful and GraphQL APIs for seamless data communication.",
      "confidence": 0.89,
      "section": "services",
      "title": "API Development",
      "source": "/data/index.tsx#myServicesPlans"
    }
  ]
}
```

### No Results Response

```json
{
  "status": "no_results",
  "message": "No relevant content found in the portfolio for this query.",
  "query": "What is the weather today?",
  "suggestion": "This information may not be available on the website."
}
```

### Low Confidence Response

```json
{
  "status": "low_confidence",
  "message": "Found some content but confidence is too low to provide accurate information.",
  "query": "blockchain development",
  "highest_score": 0.52,
  "threshold": 0.70
}
```

## Environment Variables

```env
# File: mcp-server/.env.example

# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
OPENAI_API_KEY=sk-...

# Optional
MCP_TRANSPORT=stdio
LOG_LEVEL=info
VECTOR_INDEX_NAME=vector_index
MIN_SIMILARITY_SCORE=0.70
MAX_RESULTS=5
```

## Running the MCP Server

### Development

```bash
cd mcp-server
npm install
npm run dev
```

### Production

```bash
cd mcp-server
npm run build
npm start
```

### Integration with Claude Desktop (for testing)

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "MONGODB_URI": "mongodb+srv://...",
        "OPENAI_API_KEY": "sk-..."
      }
    }
  }
}
```
