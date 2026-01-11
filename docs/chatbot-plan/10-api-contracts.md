# API Contracts

## Overview

This document defines all API contracts for the portfolio AI chatbot system, including the Chat API endpoint, MCP tool interfaces, and internal service contracts.

## Chat API

### POST /api/chat

The main endpoint for chat interactions with streaming responses.

#### Request

```typescript
// Request Headers
{
  "Content-Type": "application/json",
  "Origin": "https://aasimshah.com"  // Required for CORS
}

// Request Body
interface ChatRequest {
  message: string;          // User's message (1-2000 characters)
  history?: ChatMessage[];  // Previous conversation (max 20 messages)
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
```

#### Example Request

```bash
curl -X POST https://aasimshah.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services do you offer?",
    "history": [
      {"role": "user", "content": "Hi"},
      {"role": "assistant", "content": "Hello! How can I help you today?"}
    ]
  }'
```

#### Response (Streaming SSE)

```typescript
// Response Headers
{
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "X-RateLimit-Limit": "20",
  "X-RateLimit-Remaining": "19",
  "X-RateLimit-Reset": "60"
}

// SSE Stream Format
data: {"content": "I"}
data: {"content": " offer"}
data: {"content": " several"}
data: {"content": " services"}
data: {"content": "..."}
data: [DONE]
```

#### Response (Non-Streaming Fallback)

For error responses or when streaming fails:

```typescript
interface ChatErrorResponse {
  error: string;
  code: ErrorCode;
  retryAfter?: number;  // For rate limiting
}

type ErrorCode = 
  | "INVALID_INPUT"
  | "RATE_LIMITED"
  | "NO_RESULTS"
  | "LOW_CONFIDENCE"
  | "SERVER_ERROR";
```

#### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success - streaming response |
| 400 | Bad Request - invalid input |
| 403 | Forbidden - CORS violation |
| 429 | Too Many Requests - rate limited |
| 500 | Internal Server Error |

#### Error Response Examples

```json
// 400 Bad Request
{
  "error": "Message cannot be empty",
  "code": "INVALID_INPUT"
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded. Please try again later.",
  "code": "RATE_LIMITED",
  "retryAfter": 45
}

// 500 Server Error
{
  "error": "An error occurred processing your request",
  "code": "SERVER_ERROR"
}
```

---

## MCP Tool Contracts

### Tool: search_portfolio_content

Semantic search across portfolio content.

#### Input Schema

```typescript
interface SearchPortfolioInput {
  query: string;                    // Search query (required)
  section_filter?: SectionType;     // Filter by section (optional)
  max_results?: number;             // Max results, default 5 (optional)
}

type SectionType = 
  | "about"
  | "experience"
  | "services"
  | "projects"
  | "skills"
  | "testimonials"
  | "contact"
  | "faq";
```

#### Output Schema

```typescript
// Success Response
interface SearchSuccessResponse {
  status: "success";
  query: string;
  result_count: number;
  results: SearchResult[];
}

interface SearchResult {
  rank: number;
  content: string;
  confidence: number;      // 0.0 - 1.0
  section: SectionType;
  title: string;
  source: string;
}

// No Results Response
interface SearchNoResultsResponse {
  status: "no_results";
  message: string;
  query: string;
  suggestion: string;
}

// Low Confidence Response
interface SearchLowConfidenceResponse {
  status: "low_confidence";
  message: string;
  query: string;
  highest_score: number;
  threshold: number;
}
```

#### Example

```json
// Input
{
  "query": "What is your hourly rate for MERN development?",
  "section_filter": "services",
  "max_results": 3
}

// Output
{
  "status": "success",
  "query": "What is your hourly rate for MERN development?",
  "result_count": 2,
  "results": [
    {
      "rank": 1,
      "content": "Service: MERN Stack Development\nPrice: $30 per hour\nDescription: Building scalable web applications...",
      "confidence": 0.94,
      "section": "services",
      "title": "MERN Stack Development",
      "source": "/data/index.tsx#myServicesPlans"
    },
    {
      "rank": 2,
      "content": "Service: API Development\nPrice: $40+ per hour...",
      "confidence": 0.82,
      "section": "services",
      "title": "API Development",
      "source": "/data/index.tsx#myServicesPlans"
    }
  ]
}
```

---

### Tool: get_section_details

Retrieve all content from a specific section.

#### Input Schema

```typescript
interface GetSectionInput {
  section: SectionType;  // Required
}
```

#### Output Schema

```typescript
// Success Response
interface SectionSuccessResponse {
  status: "success";
  section: SectionType;
  item_count: number;
  items: SectionItem[];
}

interface SectionItem {
  title: string;
  content: string;
  source: string;
}

// No Results Response
interface SectionNoResultsResponse {
  status: "no_results";
  message: string;
  section: SectionType;
}

// Error Response
interface SectionErrorResponse {
  status: "error";
  message: string;
}
```

#### Example

```json
// Input
{
  "section": "experience"
}

// Output
{
  "status": "success",
  "section": "experience",
  "item_count": 4,
  "items": [
    {
      "title": "Pixel Works Studio - Founder / CEO",
      "content": "Role: Founder / CEO\nCompany: Pixel Works Studio\nPeriod: October 2020 - Present\nLocation: Lahore, Pakistan\nDescription: Building software products...",
      "source": "/data/index.tsx#myExperience"
    },
    {
      "title": "dCodax (SMC-PVT) Ltd - Full Stack Developer",
      "content": "Role: Full Stack Developer\nCompany: dCodax...",
      "source": "/data/index.tsx#myExperience"
    }
  ]
}
```

---

### Tool: get_contact_info

Retrieve contact information.

#### Input Schema

```typescript
interface GetContactInput {
  // No parameters required
}
```

#### Output Schema

```typescript
interface ContactResponse {
  status: "success";
  contact: {
    email: string;
    phone: string;
    location: string;
    availability: string;
    platforms: {
      upwork: string;
      fiverr: string;
      github: string;
    };
    schedule_meeting: string;
  };
  raw_content: string[];
}
```

#### Example

```json
// Input
{}

// Output
{
  "status": "success",
  "contact": {
    "email": "contact@aasimshah.com",
    "phone": "+92-348-3360070",
    "location": "Bahria Town Phase 7, Rawalpindi, Pakistan",
    "availability": "Available for work",
    "platforms": {
      "upwork": "https://www.upwork.com/freelancers/aasimshah",
      "fiverr": "https://www.fiverr.com/users/aaasimmshah",
      "github": "https://www.github.com/aasim-shah"
    },
    "schedule_meeting": "Available via Cal.com integration on website"
  },
  "raw_content": [
    "Contact email: contact@aasimshah.com...",
    "About: Full Stack Developer based in Pakistan..."
  ]
}
```

---

## Internal Service Contracts

### VectorSearchService

```typescript
interface VectorSearchService {
  /**
   * Connect to MongoDB Atlas
   */
  connect(): Promise<void>;
  
  /**
   * Close database connection
   */
  close(): Promise<void>;
  
  /**
   * Perform vector similarity search
   */
  search(options: SearchOptions): Promise<SearchResult[]>;
  
  /**
   * Get all documents from a section
   */
  getBySection(section: SectionType): Promise<SearchResult[]>;
}

interface SearchOptions {
  embedding: number[];          // 1536-dimension vector
  sectionFilter?: SectionType;
  maxResults: number;
  minScore: number;             // Confidence threshold
}

interface SearchResult {
  content: string;
  score: number;
  section: string;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
  };
}
```

### EmbeddingService

```typescript
interface EmbeddingService {
  /**
   * Generate embedding for text
   */
  generateEmbedding(text: string): Promise<number[]>;
}
```

### SafetyService

```typescript
interface SafetyService {
  /**
   * Run all safety checks on input
   */
  runSafetyChecks(
    rawInput: unknown,
    clientIp: string
  ): Promise<SafetyCheckResult>;
  
  /**
   * Evaluate search results for confidence
   */
  evaluateSearchResults(
    results: SearchResult[]
  ): SafetyCheckResult;
}

interface SafetyCheckResult {
  passed: boolean;
  input?: ChatInput;
  rateLimitResult?: RateLimitResult;
  confidenceResult?: ConfidenceCheckResult;
  fallbackResponse?: string;
  fallbackType?: FallbackType;
  headers?: Record<string, string>;
}
```

---

## Database Schema

### Collection: portfolio_embeddings

```typescript
interface PortfolioEmbedding {
  _id: ObjectId;
  chunkId: string;              // Unique identifier
  content: string;              // Text content
  embedding: number[];          // 1536-dimension vector
  section: SectionType;         // Content section
  metadata: {
    title: string;              // Item title
    source: string;             // Source file reference
    entities: string[];         // Named entities
    keywords: string[];         // Keywords
    chunkIndex: number;         // Position in sequence
    totalChunks: number;        // Total chunks for item
  };
  version: number;              // For re-indexing
  createdAt: Date;
  updatedAt: Date;
}
```

### Indexes

```javascript
// Primary index
{ "chunkId": 1 }  // Unique

// Section filter index
{ "section": 1 }

// Version index (for cleanup)
{ "version": 1 }

// Vector search index
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
      }
    ]
  }
}
```

---

## Rate Limiting Contract

### Headers

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Max requests per window |
| `X-RateLimit-Remaining` | Remaining requests |
| `X-RateLimit-Reset` | Seconds until reset |
| `Retry-After` | Seconds to wait (when limited) |

### Limits

| Window | Limit | Scope |
|--------|-------|-------|
| Per Minute | 20 | Per IP |
| Per Hour | 100 | Per IP |

### Response When Limited

```typescript
// HTTP 429
{
  "error": "Rate limit exceeded. Please try again later.",
  "code": "RATE_LIMITED",
  "retryAfter": 45
}

// Headers
{
  "Retry-After": "45",
  "X-RateLimit-Limit": "20",
  "X-RateLimit-Remaining": "0",
  "X-RateLimit-Reset": "45"
}
```

---

## WebSocket Contract (Future)

Reserved for potential real-time features.

```typescript
// Connection
ws://aasimshah.com/api/chat/ws

// Client -> Server
interface WsClientMessage {
  type: "message" | "typing" | "ping";
  payload?: {
    content?: string;
    history?: ChatMessage[];
  };
}

// Server -> Client
interface WsServerMessage {
  type: "chunk" | "done" | "error" | "pong";
  payload?: {
    content?: string;
    error?: string;
  };
}
```

---

## Health Check API

### GET /api/health

```typescript
// Response
interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  services: {
    database: "healthy" | "unhealthy" | "unknown";
    openai: "healthy" | "unhealthy" | "not-checked";
  };
}
```

#### Example

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "database": "healthy",
    "openai": "not-checked"
  }
}
```

---

## TypeScript Type Exports

```typescript
// types/chat.ts

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatErrorResponse {
  error: string;
  code: ErrorCode;
  retryAfter?: number;
}

export type ErrorCode =
  | "INVALID_INPUT"
  | "RATE_LIMITED"
  | "NO_RESULTS"
  | "LOW_CONFIDENCE"
  | "SERVER_ERROR";

export type SectionType =
  | "about"
  | "experience"
  | "services"
  | "projects"
  | "skills"
  | "testimonials"
  | "contact"
  | "faq";

export interface SearchResult {
  content: string;
  score: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
  };
}
```

---

## Validation Rules Summary

| Field | Rule |
|-------|------|
| `message` | Required, 1-2000 characters |
| `history` | Optional, max 20 messages |
| `history[].role` | Must be "user" or "assistant" |
| `history[].content` | Required string |
| `section_filter` | Must be valid SectionType |
| `max_results` | 1-10, default 5 |

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_INPUT` | 400 | Request validation failed |
| `RATE_LIMITED` | 429 | Too many requests |
| `NO_RESULTS` | 200* | No relevant content found |
| `LOW_CONFIDENCE` | 200* | Results below threshold |
| `SERVER_ERROR` | 500 | Internal error |

*Returned in response body with fallback message, not as HTTP error
