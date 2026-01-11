# Implementation Tasks Checklist

## Overview

This document provides a comprehensive checklist of all tasks required to implement the portfolio AI chatbot system. Tasks are organized by phase and priority.

## Phase 1: Infrastructure Setup

### MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account (if not exists)
- [ ] Create new project: `portfolio-chatbot`
- [ ] Create M0 cluster (free tier for development)
- [ ] Configure network access (allow all IPs for Vercel)
- [ ] Create database user with read/write permissions
- [ ] Create database: `portfolio_chatbot`
- [ ] Create collection: `portfolio_embeddings`
- [ ] Create vector search index with configuration:
  ```json
  {
    "name": "vector_index",
    "type": "vectorSearch",
    "definition": {
      "fields": [
        { "type": "vector", "path": "embedding", "numDimensions": 1536, "similarity": "cosine" },
        { "type": "filter", "path": "section" }
      ]
    }
  }
  ```
- [ ] Test connection string locally
- [ ] Document connection string (save securely)

### OpenAI API Setup
- [ ] Create OpenAI account (if not exists)
- [ ] Generate API key for project
- [ ] Set up billing/usage limits
- [ ] Test API key with simple request
- [ ] Document API key (save securely)

### Environment Configuration
- [ ] Create `.env.example` with all required variables
- [ ] Create `.env.local` with actual values (git-ignored)
- [ ] Add environment variables to Vercel project settings

---

## Phase 2: Data Ingestion Pipeline

### Project Setup
- [ ] Create `scripts/ingest/` directory structure
- [ ] Install dependencies: `gpt-tokenizer`, `mongodb`, `openai`
- [ ] Add npm scripts to `package.json`:
  - `ingest`: Run full ingestion
  - `ingest:reindex`: Re-index all data

### Content Extraction
- [ ] Create `scripts/ingest/extractors/portfolio-extractor.ts`
- [ ] Implement extraction functions:
  - [ ] `extractAbout()` - About/bio information
  - [ ] `extractExperience()` - Work experience from `myExperience`
  - [ ] `extractServices()` - Services from `myServices`
  - [ ] `extractServicePlans()` - Pricing from `myServicesPlans`
  - [ ] `extractProjects()` - Projects from `myShowCases`
  - [ ] `extractSkills()` - Tech stack from `myStack`
  - [ ] `extractTestimonials()` - Reviews from `testimonials`
  - [ ] `extractFAQ()` - FAQ from `faqData`
  - [ ] `extractStats()` - Stats from `counterLists`
  - [ ] `extractContact()` - Contact information
- [ ] Test extraction with dry run

### Chunking
- [ ] Create `scripts/ingest/chunker.ts`
- [ ] Implement token-based chunking (500 tokens max)
- [ ] Add overlap support (50 tokens)
- [ ] Preserve section metadata
- [ ] Test with sample content

### Embedding Generation
- [ ] Create `scripts/ingest/embedder.ts`
- [ ] Implement OpenAI embedding calls
- [ ] Add batch processing (100 items per batch)
- [ ] Add rate limiting between batches
- [ ] Test with sample chunks

### Vector Storage
- [ ] Create `scripts/ingest/store.ts`
- [ ] Implement MongoDB insert operations
- [ ] Add version tracking for re-indexing
- [ ] Implement cleanup of old versions
- [ ] Test storage and retrieval

### Main Ingestion Script
- [ ] Create `scripts/ingest/index.ts`
- [ ] Orchestrate full pipeline
- [ ] Add progress logging
- [ ] Add error handling
- [ ] Test full pipeline end-to-end
- [ ] **Run initial data ingestion**

---

## Phase 3: MCP Server Implementation

### Project Setup
- [ ] Create `mcp-server/` directory
- [ ] Initialize with `package.json`
- [ ] Create `tsconfig.json` for ES modules
- [ ] Install dependencies: `@modelcontextprotocol/sdk`, `mongodb`, `openai`, `zod`

### Core Server
- [ ] Create `mcp-server/src/index.ts` - Entry point
- [ ] Create `mcp-server/src/server.ts` - Server setup
- [ ] Create `mcp-server/src/config.ts` - Configuration with Zod
- [ ] Create `mcp-server/src/types.ts` - Type definitions
- [ ] Test server starts without errors

### Services
- [ ] Create `mcp-server/src/services/vector-search.ts`
  - [ ] Implement `connect()` method
  - [ ] Implement `search()` method with vector search
  - [ ] Implement `getBySection()` method
  - [ ] Add connection pooling
- [ ] Create `mcp-server/src/services/embedding.ts`
  - [ ] Implement `generateEmbedding()` method
- [ ] Test services independently

### Tools
- [ ] Create `mcp-server/src/tools/index.ts` - Tool registry
- [ ] Create `mcp-server/src/tools/search-portfolio.ts`
  - [ ] Define tool schema
  - [ ] Implement handler with confidence checking
  - [ ] Return structured results
- [ ] Create `mcp-server/src/tools/get-section.ts`
  - [ ] Define tool schema
  - [ ] Implement section retrieval
- [ ] Create `mcp-server/src/tools/get-contact.ts`
  - [ ] Define tool schema
  - [ ] Return contact information
- [ ] Test all tools via MCP inspector

### Utilities
- [ ] Create `mcp-server/src/utils/logger.ts`
- [ ] Create `mcp-server/src/utils/validators.ts`

### Build & Test
- [ ] Build MCP server: `npm run build`
- [ ] Test with Claude Desktop (optional)
- [ ] Document MCP server usage

---

## Phase 4: Safety Layer

### Input Validation
- [ ] Create `lib/safety/input-validator.ts`
  - [ ] Implement Zod schema for chat input
  - [ ] Add message length validation (2000 chars max)
  - [ ] Add injection pattern blocking
  - [ ] Implement `sanitizeMessage()` function
- [ ] Write tests for input validation

### Rate Limiting
- [ ] Create `lib/safety/rate-limiter.ts`
  - [ ] Implement LRU cache for tracking
  - [ ] Add per-minute limit (20 req/min)
  - [ ] Add per-hour limit (100 req/hour)
  - [ ] Return rate limit headers
- [ ] Write tests for rate limiting

### Confidence Checking
- [ ] Create `lib/safety/confidence-checker.ts`
  - [ ] Implement threshold checking (0.70 minimum)
  - [ ] Return structured results with reasons
- [ ] Write tests for confidence checking

### Context Grounding
- [ ] Create `lib/safety/context-grounder.ts`
  - [ ] Build system prompt with safety rules
  - [ ] Format context for LLM
  - [ ] Assemble full message array
- [ ] Review and refine prompts

### Fallback Responses
- [ ] Create `lib/safety/fallback-responses.ts`
  - [ ] Define all fallback messages
  - [ ] Ensure messages are helpful and on-brand

### Safety Index
- [ ] Create `lib/safety/index.ts`
  - [ ] Export all safety functions
  - [ ] Implement `runSafetyChecks()` orchestrator
  - [ ] Implement `evaluateSearchResults()`
- [ ] Write integration tests

---

## Phase 5: Prompts Library

### System Prompt
- [ ] Create `lib/prompts/system-prompt.ts`
  - [ ] Define role and identity
  - [ ] Define capabilities scope
  - [ ] Add critical safety rules
  - [ ] Add response format guidelines

### Context Templates
- [ ] Create `lib/prompts/context-template.ts`
  - [ ] Format search results for LLM
  - [ ] Handle empty results case

### Response Constraints
- [ ] Create `lib/prompts/response-constraints.ts`
  - [ ] Define constraints for each query type
  - [ ] Add fallback constraints

### Query Classification
- [ ] Create `lib/prompts/query-classifier.ts`
  - [ ] Implement pattern matching
  - [ ] Map query types to sections

### Message Builder
- [ ] Create `lib/prompts/message-builder.ts`
  - [ ] Assemble full prompt structure
  - [ ] Handle conversation history

### LLM Configuration
- [ ] Create `lib/prompts/llm-config.ts`
  - [ ] Define model settings
  - [ ] Set temperature (0.1 for accuracy)

---

## Phase 6: Chat API Route

### API Route Setup
- [ ] Create `app/api/chat/route.ts`
- [ ] Implement POST handler
- [ ] Add CORS handling
- [ ] Add OPTIONS handler for preflight

### Request Processing
- [ ] Parse and validate request body
- [ ] Extract client IP for rate limiting
- [ ] Run safety checks
- [ ] Handle validation failures with proper responses

### MCP Integration
- [ ] Initialize MCP client
- [ ] Call search tool with user query
- [ ] Handle tool results

### LLM Integration
- [ ] Build messages with context
- [ ] Call OpenAI API with streaming
- [ ] Handle errors gracefully

### Response Streaming
- [ ] Implement SSE streaming
- [ ] Format chunks correctly
- [ ] Send [DONE] signal at end
- [ ] Handle stream errors

### Error Handling
- [ ] Add try-catch wrapper
- [ ] Return appropriate error responses
- [ ] Log errors for debugging

### Testing
- [ ] Test with curl/Postman
- [ ] Test rate limiting
- [ ] Test error scenarios
- [ ] Test streaming behavior

---

## Phase 7: React Components

### Setup
- [ ] Create `components/Chatbot/` directory
- [ ] Install dependencies: `framer-motion`, `lucide-react`, `react-markdown`
- [ ] Add Tailwind typography plugin

### Context Provider
- [ ] Create `components/Chatbot/ChatProvider.tsx`
  - [ ] Define state interface
  - [ ] Implement reducer
  - [ ] Create context and provider
  - [ ] Export `useChatContext` hook

### Streaming Hook
- [ ] Create `components/Chatbot/hooks/useChatStream.ts`
  - [ ] Implement fetch with streaming
  - [ ] Handle SSE parsing
  - [ ] Implement abort controller
  - [ ] Handle errors

### Chat Widget
- [ ] Create `components/Chatbot/ChatWidget.tsx`
  - [ ] Container with animations
  - [ ] Keyboard handling (Escape to close)
  - [ ] Responsive sizing

### Chat Header
- [ ] Create `components/Chatbot/ChatHeader.tsx`
  - [ ] Avatar and title
  - [ ] Online status indicator
  - [ ] Close and clear buttons

### Chat Messages
- [ ] Create `components/Chatbot/ChatMessages.tsx`
  - [ ] Auto-scroll behavior
  - [ ] Empty state handling
  - [ ] Error display

### Message Bubble
- [ ] Create `components/Chatbot/MessageBubble.tsx`
  - [ ] User vs assistant styling
  - [ ] Markdown rendering
  - [ ] Streaming cursor

### Chat Input
- [ ] Create `components/Chatbot/ChatInput.tsx`
  - [ ] Auto-resize textarea
  - [ ] Character counter
  - [ ] Send/cancel buttons
  - [ ] Keyboard shortcuts

### Chat Trigger
- [ ] Create `components/Chatbot/ChatTrigger.tsx`
  - [ ] Floating action button
  - [ ] Animation on toggle
  - [ ] Notification badge

### Welcome Message
- [ ] Create `components/Chatbot/WelcomeMessage.tsx`
  - [ ] Greeting text
  - [ ] Quick action buttons

### Typing Indicator
- [ ] Create `components/Chatbot/TypingIndicator.tsx`
  - [ ] Animated dots

### Public Exports
- [ ] Create `components/Chatbot/index.ts`
  - [ ] Export all public components

### Layout Integration
- [ ] Update `app/layout.tsx`
  - [ ] Add ChatProvider
  - [ ] Add ChatWidget

### Styling
- [ ] Add CSS animations to `globals.css`
- [ ] Update Tailwind config for typography
- [ ] Test dark/light mode

---

## Phase 8: Testing

### Unit Tests
- [ ] Test safety layer functions
- [ ] Test prompt builders
- [ ] Test query classifier
- [ ] Test chunking logic

### Integration Tests
- [ ] Test API route end-to-end
- [ ] Test MCP tool execution
- [ ] Test vector search queries

### Component Tests
- [ ] Test ChatProvider context
- [ ] Test useChatStream hook
- [ ] Test UI components render

### Manual Testing
- [ ] Test happy path conversations
- [ ] Test out-of-scope questions
- [ ] Test rate limiting
- [ ] Test error scenarios
- [ ] Test mobile responsiveness
- [ ] Test dark/light theme

---

## Phase 9: Deployment

### Pre-Deployment
- [ ] Run full build locally
- [ ] Run all tests
- [ ] Review environment variables
- [ ] Check MongoDB Atlas is ready
- [ ] Verify vector index is active

### Vercel Setup
- [ ] Connect repository to Vercel
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy to preview

### Testing in Preview
- [ ] Test chatbot functionality
- [ ] Check API response times
- [ ] Verify rate limiting
- [ ] Test on mobile devices

### Production Deployment
- [ ] Deploy to production
- [ ] Verify DNS/domain
- [ ] Test production chatbot
- [ ] Monitor for errors

### Post-Deployment
- [ ] Set up monitoring/alerts
- [ ] Configure re-indexing cron
- [ ] Document deployment process
- [ ] Create runbook for issues

---

## Phase 10: Documentation & Polish

### Code Documentation
- [ ] Add JSDoc comments to key functions
- [ ] Document environment variables
- [ ] Create README for chatbot feature

### User Documentation
- [ ] Document chatbot capabilities
- [ ] Add FAQ for common questions
- [ ] Create troubleshooting guide

### Performance Optimization
- [ ] Review and optimize prompts
- [ ] Check response times
- [ ] Optimize vector search queries
- [ ] Review rate limits

### Final Review
- [ ] Security audit
- [ ] Code review
- [ ] Performance testing
- [ ] Accessibility review

---

## Task Priority Legend

| Priority | Description |
|----------|-------------|
| 🔴 **P0** | Critical - Blocks other work |
| 🟠 **P1** | High - Core functionality |
| 🟡 **P2** | Medium - Important features |
| 🟢 **P3** | Low - Nice to have |

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Infrastructure | 1 day | None |
| Phase 2: Data Ingestion | 2 days | Phase 1 |
| Phase 3: MCP Server | 2 days | Phase 1 |
| Phase 4: Safety Layer | 1 day | None |
| Phase 5: Prompts | 1 day | None |
| Phase 6: Chat API | 2 days | Phases 2-5 |
| Phase 7: React Components | 2 days | Phase 6 |
| Phase 8: Testing | 1 day | Phase 7 |
| Phase 9: Deployment | 1 day | Phase 8 |
| Phase 10: Documentation | 1 day | Phase 9 |
| **Total** | **~14 days** | |

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run data ingestion
npm run ingest

# 4. Start development server
npm run dev

# 5. Build MCP server
npm run mcp:build

# 6. Run tests
npm test

# 7. Deploy
vercel --prod
```
