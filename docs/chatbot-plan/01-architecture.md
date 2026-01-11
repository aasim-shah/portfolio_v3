# System Architecture

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PORTFOLIO WEBSITE                               │
│                            (Next.js App Router)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐ │
│  │   Portfolio     │    │    Chatbot      │    │     Other Pages         │ │
│  │   Pages         │    │    Component    │    │     (About, Contact)    │ │
│  └─────────────────┘    └────────┬────────┘    └─────────────────────────┘ │
│                                  │                                          │
└──────────────────────────────────┼──────────────────────────────────────────┘
                                   │ HTTP/WebSocket
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CHAT API LAYER                                  │
│                         (Next.js API Routes)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐ │
│  │  /api/chat      │    │  Safety         │    │   Response              │ │
│  │  Route Handler  │───▶│  Validator      │───▶│   Streamer              │ │
│  └─────────────────┘    └────────┬────────┘    └─────────────────────────┘ │
│                                  │                                          │
└──────────────────────────────────┼──────────────────────────────────────────┘
                                   │ MCP Protocol (stdio/SSE)
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MCP SERVER                                      │
│                    (@modelcontextprotocol/sdk)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         TOOLS                                        │   │
│  ├─────────────────┬─────────────────┬─────────────────────────────────┤   │
│  │ search_portfolio│ get_section_    │ get_contact_                    │   │
│  │ _content        │ details         │ info                            │   │
│  └────────┬────────┴────────┬────────┴────────┬────────────────────────┘   │
│           │                 │                 │                             │
│           ▼                 ▼                 ▼                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    CONTEXT RETRIEVAL SERVICE                         │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                         │
└───────────────────────────────────┼─────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│       VECTOR DATABASE           │  │         LLM PROVIDER            │
│   (MongoDB Atlas Vector Search) │  │      (OpenAI / Anthropic)       │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│                                 │  │                                 │
│  ┌───────────────────────────┐  │  │  • Embedding Generation         │
│  │  portfolio_embeddings     │  │  │    (text-embedding-3-small)     │
│  │  Collection               │  │  │                                 │
│  ├───────────────────────────┤  │  │  • Chat Completion              │
│  │  • content_chunk          │  │  │    (gpt-4-turbo / claude-3)     │
│  │  • embedding_vector       │  │  │                                 │
│  │  • metadata               │  │  │  • Streaming Support            │
│  │  • section_type           │  │  │                                 │
│  │  • source_url             │  │  └─────────────────────────────────┘
│  │  • last_updated           │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

## Data Flow Diagrams

### 1. Data Ingestion Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        DATA INGESTION PIPELINE                            │
└──────────────────────────────────────────────────────────────────────────┘

Step 1: Content Extraction
┌─────────────────┐
│  Portfolio      │
│  Source Files   │
│  (/data/        │
│   index.tsx)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Content        │     Extracts:
│  Extractor      │───▶ • Experience data
│                 │     • Services data
└────────┬────────┘     • Projects data
         │              • Skills/Stack data
         ▼              • Testimonials
Step 2: Chunking        • Contact info
┌─────────────────┐
│  Smart          │     Strategy:
│  Chunker        │───▶ • Section-aware chunking
│                 │     • 500-token chunks
└────────┬────────┘     • 50-token overlap
         │              • Preserve context
         ▼
Step 3: Enrichment
┌─────────────────┐
│  Metadata       │     Adds:
│  Enricher       │───▶ • Section type
│                 │     • Source reference
└────────┬────────┘     • Timestamp
         │              • Keywords
         ▼
Step 4: Embedding
┌─────────────────┐
│  OpenAI         │     Model:
│  Embeddings     │───▶ text-embedding-3-small
│  API            │     Dimensions: 1536
└────────┬────────┘
         │
         ▼
Step 5: Storage
┌─────────────────┐
│  MongoDB Atlas  │     Index:
│  Vector Store   │───▶ vectorSearch (HNSW)
│                 │     Similarity: cosine
└─────────────────┘
```

### 2. Chat Request Lifecycle

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        CHAT REQUEST LIFECYCLE                             │
└──────────────────────────────────────────────────────────────────────────┘

User: "What services does Aasim offer?"

Step 1: Request Reception
┌─────────────────────────────────────────────────────────────────────────┐
│  POST /api/chat                                                          │
│  Body: { "message": "What services does Aasim offer?", "history": [] }  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 2: Input Validation
┌─────────────────────────────────────────────────────────────────────────┐
│  • Sanitize user input                                                   │
│  • Rate limiting check                                                   │
│  • Session validation                                                    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 3: MCP Tool Invocation
┌─────────────────────────────────────────────────────────────────────────┐
│  MCP Client calls: search_portfolio_content                              │
│  Args: { query: "services Aasim offer", section_filter: "services" }    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 4: Vector Search
┌─────────────────────────────────────────────────────────────────────────┐
│  MongoDB Atlas Vector Search                                             │
│  • Generate query embedding                                              │
│  • Find top-k similar chunks (k=5)                                       │
│  • Apply similarity threshold (>0.75)                                    │
│  • Return ranked results with metadata                                   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 5: Context Assembly
┌─────────────────────────────────────────────────────────────────────────┐
│  Retrieved Context:                                                      │
│  [                                                                       │
│    { content: "MERN Stack Development...", score: 0.92, section: "..." }│
│    { content: "API Development...", score: 0.89, section: "..." }       │
│    { content: "Cloud & DevOps...", score: 0.85, section: "..." }        │
│  ]                                                                       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 6: Safety Check
┌─────────────────────────────────────────────────────────────────────────┐
│  IF results.length === 0 OR max_score < 0.70:                           │
│    return "This information is not available on the website."            │
│  ELSE:                                                                   │
│    proceed with LLM generation                                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 7: LLM Generation (Streaming)
┌─────────────────────────────────────────────────────────────────────────┐
│  System Prompt + Retrieved Context + User Question                       │
│  ───────────────────────────────────────────────────────────────────    │
│  Model: gpt-4-turbo                                                      │
│  Temperature: 0.1 (low creativity, high accuracy)                        │
│  Stream: true                                                            │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
Step 8: Response Streaming
┌─────────────────────────────────────────────────────────────────────────┐
│  SSE Stream to Client                                                    │
│  data: {"chunk": "Aasim offers "}                                        │
│  data: {"chunk": "the following services:"}                              │
│  data: {"chunk": "\n\n1. **MERN Stack Development**..."}                │
│  data: [DONE]                                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. MCP Tool Invocation Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        MCP TOOL INVOCATION FLOW                           │
└──────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Chat API      │         │   MCP Client    │         │   MCP Server    │
│   (Next.js)     │         │   (SDK)         │         │   (Node.js)     │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                           │
         │  1. User Query            │                           │
         │  ────────────────────────▶│                           │
         │                           │                           │
         │                           │  2. tools/list            │
         │                           │  ────────────────────────▶│
         │                           │                           │
         │                           │  3. Available Tools       │
         │                           │  ◀────────────────────────│
         │                           │  [search_portfolio_content│
         │                           │   get_section_details,    │
         │                           │   get_contact_info]       │
         │                           │                           │
         │                           │  4. tools/call            │
         │                           │  ────────────────────────▶│
         │                           │  {tool: "search_portfolio_│
         │                           │   content", args: {...}}  │
         │                           │                           │
         │                           │         ┌─────────────────┴───┐
         │                           │         │  Vector Search      │
         │                           │         │  Execution          │
         │                           │         └─────────────────┬───┘
         │                           │                           │
         │                           │  5. Tool Result           │
         │                           │  ◀────────────────────────│
         │                           │  {results: [...],         │
         │                           │   confidence: 0.89}       │
         │                           │                           │
         │  6. Context + Response    │                           │
         │  ◀────────────────────────│                           │
         │                           │                           │
         ▼                           ▼                           ▼
```

## Component Responsibilities

### 1. Next.js Frontend (`/app`)

| Component | Responsibility |
|-----------|----------------|
| `ChatWidget` | Floating chat button + expandable chat window |
| `ChatMessages` | Render message history with proper formatting |
| `ChatInput` | User input with send button and loading states |
| `useChatStream` | Custom hook for SSE streaming |

### 2. Chat API (`/app/api/chat`)

| Function | Responsibility |
|----------|----------------|
| `POST /api/chat` | Main chat endpoint |
| `validateInput()` | Sanitize and validate user input |
| `invokeMCPTool()` | Call MCP server tools |
| `streamResponse()` | Stream LLM response to client |

### 3. MCP Server (`/mcp-server`)

| Component | Responsibility |
|-----------|----------------|
| `server.ts` | MCP server initialization |
| `tools/` | Tool definitions and handlers |
| `services/vectorSearch.ts` | MongoDB vector search operations |
| `services/embedding.ts` | OpenAI embedding generation |

### 4. Ingestion Pipeline (`/scripts/ingest`)

| Script | Responsibility |
|--------|----------------|
| `extract.ts` | Extract content from portfolio data |
| `chunk.ts` | Split content into semantic chunks |
| `embed.ts` | Generate embeddings via OpenAI |
| `store.ts` | Store in MongoDB Atlas |

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Layer 1: Input Validation                                              │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ • Max message length (2000 chars)                                  │ │
│  │ • Sanitize HTML/scripts                                            │ │
│  │ • Block injection patterns                                         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Layer 2: Rate Limiting                                                 │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ • 20 requests per minute per IP                                    │ │
│  │ • 100 requests per hour per IP                                     │ │
│  │ • Exponential backoff on limit exceed                              │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Layer 3: Content Grounding                                             │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ • Only use retrieved context                                       │ │
│  │ • Minimum similarity threshold (0.70)                              │ │
│  │ • Safe fallback for no results                                     │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Layer 4: API Security                                                  │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ • API keys in environment variables                                │ │
│  │ • CORS restricted to portfolio domain                              │ │
│  │ • HTTPS only in production                                         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Embedding Strategy

### Model Selection
- **Model**: `text-embedding-3-small`
- **Dimensions**: 1536
- **Cost**: $0.00002 per 1K tokens
- **Performance**: Excellent for semantic search

### Chunking Strategy
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CHUNKING PARAMETERS                              │
├─────────────────────────────────────────────────────────────────────────┤
│  Chunk Size:     500 tokens (~375 words)                                │
│  Overlap:        50 tokens (~38 words)                                  │
│  Separator:      Section boundaries > Paragraph > Sentence              │
│  Min Chunk:      100 tokens (avoid tiny fragments)                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Section Types for Filtering
```typescript
enum SectionType {
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  SERVICES = 'services',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  FAQ = 'faq'
}
```

## Vector Storage Schema

```typescript
// MongoDB Collection: portfolio_embeddings
interface PortfolioChunk {
  _id: ObjectId;
  content: string;              // The actual text content
  embedding: number[];          // 1536-dimensional vector
  metadata: {
    section: SectionType;       // Section classification
    title: string;              // Chunk title/header
    source: string;             // Source file/URL
    keywords: string[];         // Extracted keywords
    entities: string[];         // Named entities (projects, companies)
  };
  createdAt: Date;
  updatedAt: Date;
  version: number;              // For re-indexing tracking
}

// Vector Search Index Definition
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "type": "knnVector",
        "dimensions": 1536,
        "similarity": "cosine"
      },
      "metadata.section": {
        "type": "string"
      }
    }
  }
}
```

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Token | < 500ms | P95 |
| Full Response Time | < 3s | P95 |
| Vector Search Latency | < 100ms | P95 |
| Embedding Generation | < 200ms | P95 |
| Concurrent Users | 50+ | Sustained |
| Availability | 99.9% | Monthly |
