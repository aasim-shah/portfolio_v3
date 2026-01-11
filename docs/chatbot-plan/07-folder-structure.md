# Project Folder Structure

## Overview

This document defines the professional folder structure for the portfolio AI chatbot system. The structure follows a modular, service-based organization that integrates with the existing Next.js portfolio site.

## Complete Project Structure

```
aasimshah.com/
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables (git-ignored)
├── .gitignore
├── package.json                    # Root package.json with workspaces
├── pnpm-workspace.yaml             # pnpm workspace configuration
├── tsconfig.json                   # Base TypeScript config
├── README.md
│
├── app/                            # Next.js App Router (existing)
│   ├── layout.tsx                  # Root layout (add ChatProvider)
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Global styles
│   ├── favicon.ico
│   ├── (pages)/                    # Route groups (existing)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── services/
│   │   └── ...
│   └── api/                        # API Routes (NEW)
│       └── chat/
│           └── route.ts            # Chat API endpoint
│
├── components/                     # React components (existing + new)
│   ├── Header/
│   ├── Hero/
│   ├── Footer/
│   ├── ui/                         # shadcn/ui components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   └── Chatbot/                    # NEW: Chatbot components
│       ├── index.ts                # Public exports
│       ├── ChatWidget.tsx          # Main widget container
│       ├── ChatProvider.tsx        # Context provider
│       ├── ChatHeader.tsx          # Chat window header
│       ├── ChatMessages.tsx        # Message list
│       ├── ChatInput.tsx           # Input area
│       ├── ChatTrigger.tsx         # Floating action button
│       ├── MessageBubble.tsx       # Individual message
│       ├── TypingIndicator.tsx     # Loading animation
│       ├── WelcomeMessage.tsx      # Initial greeting
│       └── hooks/
│           ├── useChatStream.ts    # Streaming hook
│           ├── useChatState.ts     # State management
│           └── useAutoScroll.ts    # Auto-scroll behavior
│
├── lib/                            # Shared utilities (NEW)
│   ├── safety/                     # Safety layer
│   │   ├── index.ts                # Main exports
│   │   ├── input-validator.ts      # Input validation
│   │   ├── rate-limiter.ts         # Rate limiting
│   │   ├── confidence-checker.ts   # Confidence threshold
│   │   ├── context-grounder.ts     # Context grounding
│   │   ├── response-validator.ts   # Response validation
│   │   └── fallback-responses.ts   # Fallback templates
│   │
│   ├── prompts/                    # Prompt templates
│   │   ├── index.ts
│   │   ├── system-prompt.ts        # System prompt
│   │   ├── context-template.ts     # Context formatting
│   │   ├── response-constraints.ts # Response rules
│   │   ├── fallback-templates.ts   # Fallback messages
│   │   ├── message-builder.ts      # Message assembly
│   │   ├── query-classifier.ts     # Query type detection
│   │   └── llm-config.ts           # LLM configuration
│   │
│   ├── mcp/                        # MCP client utilities
│   │   ├── index.ts
│   │   ├── client.ts               # MCP client wrapper
│   │   └── types.ts                # MCP types
│   │
│   └── utils/                      # General utilities
│       ├── logger.ts               # Logging utility
│       └── errors.ts               # Error handling
│
├── data/                           # Portfolio data (existing)
│   └── index.tsx                   # All portfolio content
│
├── types/                          # TypeScript types (existing + new)
│   ├── index.ts                    # Existing types
│   └── chat.ts                     # NEW: Chat-related types
│
├── docs/                           # Documentation (NEW)
│   └── chatbot-plan/               # This planning documentation
│       ├── README.md
│       ├── 01-architecture.md
│       ├── 02-data-ingestion.md
│       ├── 03-mcp-server.md
│       ├── 04-safety-rules.md
│       ├── 05-nextjs-component.md
│       ├── 06-prompting-strategy.md
│       ├── 07-folder-structure.md
│       ├── 08-deployment.md
│       ├── 09-tasks-checklist.md
│       └── 10-api-contracts.md
│
├── scripts/                        # Build & utility scripts (NEW)
│   └── ingest/                     # Data ingestion pipeline
│       ├── index.ts                # Main ingestion script
│       ├── extract.ts              # Content extraction
│       ├── chunker.ts              # Content chunking
│       ├── embedder.ts             # Embedding generation
│       ├── store.ts                # Vector storage
│       ├── reindex.ts              # Re-indexing script
│       └── extractors/
│           └── portfolio-extractor.ts  # Portfolio data extractor
│
├── mcp-server/                     # MCP Server (NEW - separate package)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts                # Entry point
│       ├── server.ts               # Server setup
│       ├── config.ts               # Configuration
│       ├── types.ts                # Type definitions
│       ├── tools/                  # MCP Tools
│       │   ├── index.ts            # Tool registry
│       │   ├── search-portfolio.ts # Search tool
│       │   ├── get-section.ts      # Section tool
│       │   └── get-contact.ts      # Contact tool
│       ├── services/               # Business logic
│       │   ├── vector-search.ts    # MongoDB vector search
│       │   ├── embedding.ts        # OpenAI embeddings
│       │   └── content-filter.ts   # Result filtering
│       └── utils/
│           ├── logger.ts           # Logging
│           └── validators.ts       # Input validation
│
└── __tests__/                      # Test files (NEW)
    ├── safety/
    │   └── safety.test.ts          # Safety layer tests
    ├── mcp/
    │   └── tools.test.ts           # MCP tool tests
    └── components/
        └── chatbot.test.tsx        # Component tests
```

## Package.json Configuration

### Root package.json

```json
{
  "name": "aasimshah-portfolio",
  "version": "2.0.0",
  "private": true,
  "workspaces": [
    "mcp-server"
  ],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "ingest": "tsx scripts/ingest/index.ts",
    "ingest:reindex": "tsx scripts/ingest/reindex.ts",
    "mcp:dev": "npm run dev --workspace=mcp-server",
    "mcp:build": "npm run build --workspace=mcp-server",
    "mcp:start": "npm run start --workspace=mcp-server",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.330.0",
    "react-markdown": "^9.0.0",
    "openai": "^4.28.0",
    "mongodb": "^6.3.0",
    "zod": "^3.22.4",
    "lru-cache": "^10.2.0",
    "@modelcontextprotocol/sdk": "^1.0.0",
    "gpt-tokenizer": "^2.1.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.10",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0"
  }
}
```

### MCP Server package.json

```json
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

## Environment Variables

### .env.example (Root)

```env
# ===========================================
# Portfolio AI Chatbot - Environment Variables
# ===========================================

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_chatbot

# OpenAI API
OPENAI_API_KEY=sk-...

# Anthropic API (optional, alternative to OpenAI)
ANTHROPIC_API_KEY=sk-ant-...

# LLM Provider Selection
LLM_PROVIDER=openai  # or 'anthropic'

# Vector Search Configuration
VECTOR_INDEX_NAME=vector_index
MIN_SIMILARITY_SCORE=0.70
MAX_RESULTS=5

# Rate Limiting
RATE_LIMIT_PER_MINUTE=20
RATE_LIMIT_PER_HOUR=100

# Logging
LOG_LEVEL=info  # debug, info, warn, error

# MCP Server
MCP_SERVER_PATH=./mcp-server/dist/index.js

# Application
NEXT_PUBLIC_APP_URL=https://aasimshah.com
```

## TypeScript Configuration

### tsconfig.json (Root)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "scripts/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "mcp-server"
  ]
}
```

## Key File Locations Summary

| Component | Location | Purpose |
|-----------|----------|---------|
| Chat API Route | `app/api/chat/route.ts` | Main chat endpoint |
| Chat Components | `components/Chatbot/` | UI components |
| Safety Layer | `lib/safety/` | Input validation, rate limiting |
| Prompts | `lib/prompts/` | System prompts, templates |
| MCP Client | `lib/mcp/` | MCP client wrapper |
| Ingestion Scripts | `scripts/ingest/` | Data pipeline |
| MCP Server | `mcp-server/src/` | MCP server code |
| Tests | `__tests__/` | Test files |
| Documentation | `docs/chatbot-plan/` | Planning docs |

## Integration Points

### 1. Layout Integration
```typescript
// app/layout.tsx
import { ChatProvider, ChatWidget } from '@/components/Chatbot';
```

### 2. API Route
```typescript
// app/api/chat/route.ts
import { runSafetyChecks } from '@/lib/safety';
import { buildMessages } from '@/lib/prompts';
```

### 3. Data Source
```typescript
// scripts/ingest/extractors/portfolio-extractor.ts
import { myExperience, myServices, ... } from '@/data';
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ChatWidget.tsx` |
| Hooks | camelCase with `use` prefix | `useChatStream.ts` |
| Utilities | kebab-case | `rate-limiter.ts` |
| Types | kebab-case | `chat.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_MESSAGE_LENGTH` |
| API Routes | lowercase | `route.ts` |
