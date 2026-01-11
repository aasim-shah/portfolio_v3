# Deployment Guide

## Overview

This document covers deploying the portfolio AI chatbot system to production, including infrastructure setup, MCP server deployment, security configuration, and re-indexing strategies.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PRODUCTION ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────┘

                              Internet
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │       Cloudflare       │
                    │    (CDN + WAF + DNS)   │
                    └───────────┬────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                            Vercel                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                     Next.js Application                              │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌────────────────────────┐  │ │
│  │  │  Static Pages │  │  API Routes   │  │  Edge Functions        │  │ │
│  │  │  (SSG/ISR)    │  │  /api/chat    │  │  (Rate Limiting)       │  │ │
│  │  └───────────────┘  └───────┬───────┘  └────────────────────────┘  │ │
│  └─────────────────────────────┼───────────────────────────────────────┘ │
└────────────────────────────────┼─────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
      ┌─────────────────────┐    ┌─────────────────────┐
      │   MongoDB Atlas     │    │   OpenAI API        │
      │   (Vector Search)   │    │   (Embeddings +     │
      │                     │    │    Completions)     │
      └─────────────────────┘    └─────────────────────┘
```

## Option 1: Vercel Deployment (Recommended)

### Why Vercel?
- Native Next.js support
- Automatic edge functions
- Built-in analytics
- Easy environment variable management
- Automatic HTTPS and CDN

### Step 1: Prepare for Deployment

```bash
# 1. Ensure all dependencies are installed
npm install

# 2. Build locally to verify
npm run build

# 3. Run type checks
npm run typecheck

# 4. Run tests
npm test
```

### Step 2: Vercel Configuration

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "functions": {
    "app/api/chat/route.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://aasimshah.com"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        }
      ]
    }
  ]
}
```

### Step 3: Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `MIN_SIMILARITY_SCORE` | Vector search threshold | `0.70` |
| `MAX_RESULTS` | Max search results | `5` |
| `LOG_LEVEL` | Logging level | `info` |

### Step 4: Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Option 2: Self-Hosted Deployment

### Using Docker

#### Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - MIN_SIMILARITY_SCORE=0.70
      - MAX_RESULTS=5
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: MCP Server as separate container
  mcp-server:
    build: ./mcp-server
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    restart: unless-stopped
```

## MongoDB Atlas Setup

### Step 1: Create Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new project: "portfolio-chatbot"
3. Create a free M0 cluster (or M10+ for production)
4. Choose region closest to your deployment (e.g., US East)

### Step 2: Configure Network Access

1. Go to Security → Network Access
2. Add IP addresses:
   - For Vercel: Add `0.0.0.0/0` (Vercel uses dynamic IPs)
   - For self-hosted: Add your server's IP

### Step 3: Create Database User

1. Go to Security → Database Access
2. Create a new user with read/write access to the `portfolio_chatbot` database

### Step 4: Get Connection String

1. Go to Deployment → Database → Connect
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

### Step 5: Create Vector Search Index

1. Go to your cluster → Browse Collections
2. Create database: `portfolio_chatbot`
3. Create collection: `portfolio_embeddings`
4. Go to Atlas Search → Create Search Index
5. Use JSON Editor and paste:

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
      }
    ]
  }
}
```

## Data Ingestion in Production

### Initial Ingestion

```bash
# Run from your local machine or CI/CD
MONGODB_URI="mongodb+srv://..." \
OPENAI_API_KEY="sk-..." \
npm run ingest
```

### Automated Re-Indexing

#### Option 1: GitHub Actions

```yaml
# .github/workflows/reindex.yml
name: Re-index Portfolio Data

on:
  # Manual trigger
  workflow_dispatch:
  
  # On push to data file
  push:
    paths:
      - 'data/index.tsx'
  
  # Weekly schedule
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight

jobs:
  reindex:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ingestion
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: npm run ingest
      
      - name: Notify on failure
        if: failure()
        run: echo "Ingestion failed - add notification logic here"
```

#### Option 2: Vercel Cron

```typescript
// app/api/cron/reindex/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { runIngestion } from '@/scripts/ingest';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await runIngestion();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Re-indexing failed:', error);
    return NextResponse.json({ error: 'Re-indexing failed' }, { status: 500 });
  }
}
```

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/reindex",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

## Security Configuration

### 1. API Route Security

```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  // CORS check
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://aasimshah.com',
    'https://www.aasimshah.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  // Rate limiting (see lib/safety/rate-limiter.ts)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // ... rest of handler
}
```

### 2. Environment Variable Security

- Never commit `.env.local` to git
- Use Vercel/hosting provider's secret management
- Rotate API keys periodically
- Use separate keys for development/production

### 3. Content Security Policy

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data:;
      font-src 'self';
      connect-src 'self' https://api.openai.com;
    `.replace(/\n/g, ''),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];
```

## Monitoring & Observability

### 1. Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      openai: 'unknown',
    },
  };

  try {
    // Check MongoDB
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    await client.db().command({ ping: 1 });
    await client.close();
    checks.services.database = 'healthy';
  } catch {
    checks.services.database = 'unhealthy';
    checks.status = 'degraded';
  }

  // Note: Don't check OpenAI on every health check (rate limits)
  checks.services.openai = 'not-checked';

  return NextResponse.json(checks, {
    status: checks.status === 'healthy' ? 200 : 503,
  });
}
```

### 2. Logging

```typescript
// lib/utils/logger.ts (production version)
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export function log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    metadata,
  };

  // In production, send to logging service (e.g., Vercel Logs, Datadog, etc.)
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(entry));
  } else {
    console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, metadata || '');
  }
}
```

### 3. Error Tracking

Consider integrating Sentry:

```typescript
// lib/utils/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, { extra: context });
}
```

## Performance Optimization

### 1. Edge Caching

```typescript
// For static content, use ISR
export const revalidate = 3600; // Revalidate every hour
```

### 2. Response Streaming

Already implemented in the chat API - ensures fast time-to-first-byte.

### 3. Database Connection Pooling

```typescript
// lib/db/mongodb.ts
import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 60000,
    });
    await client.connect();
  }
  return client;
}
```

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables set
- [ ] MongoDB Atlas cluster created and configured
- [ ] Vector search index created
- [ ] Initial data ingestion completed
- [ ] Local build successful
- [ ] Tests passing

### Deployment
- [ ] Deploy to staging first
- [ ] Verify chatbot functionality
- [ ] Check API response times
- [ ] Verify rate limiting works
- [ ] Test error scenarios

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check API latency metrics
- [ ] Verify re-indexing cron job
- [ ] Set up alerts for failures
- [ ] Document any issues

## Cost Estimation

### Monthly Costs (Approximate)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| MongoDB Atlas | M10 | $57/month |
| OpenAI API | Pay-as-you-go | $10-50/month* |
| **Total** | | **~$87-127/month** |

*OpenAI costs depend on usage:
- Embeddings: ~$0.0001 per query
- GPT-4 Turbo: ~$0.01-0.03 per response
- Estimated 1000 chats/month = ~$30

### Cost Optimization Tips

1. Use `gpt-3.5-turbo` instead of GPT-4 for lower costs
2. Cache common queries
3. Use MongoDB Atlas free tier (M0) for low traffic
4. Implement aggressive rate limiting
s