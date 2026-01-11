# Portfolio Chatbot - Setup Guide

## Overview

This chatbot uses RAG (Retrieval-Augmented Generation) to answer questions about Aasim Shah's portfolio. It includes:
- **Data Ingestion Pipeline**: Extract → Chunk → Embed → Store
- **Vector Search**: MongoDB Atlas with semantic search
- **Safety Layer**: Rate limiting, input validation, confidence checks
- **Chat Interface**: React component with real-time responses

---

## Prerequisites

1. **OpenAI API Key**: For embeddings and chat completions
2. **MongoDB Atlas Account**: For vector storage (free tier works)
3. **Node.js 18+**: Already installed

---

## Setup Instructions

### Step 1: Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-...

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_chatbot?retryWrites=true&w=majority

# Optional Configuration
MIN_SIMILARITY_SCORE=0.70
MAX_RESULTS=5
```

**Get your keys:**
- OpenAI: https://platform.openai.com/api-keys
- MongoDB: https://cloud.mongodb.com/ (create free cluster)

---

### Step 2: MongoDB Atlas Setup

1. **Create a Cluster** (if you haven't):
   - Go to https://cloud.mongodb.com/
   - Create a free M0 cluster
   - Name it anything you like

2. **Get Connection String**:
   - Click "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add to `.env.local` as `MONGODB_URI`

3. **Allow Network Access**:
   - Go to "Network Access" in Atlas
   - Add your IP address or allow from anywhere (0.0.0.0/0)

---

### Step 3: Run Data Ingestion

This extracts portfolio data, generates embeddings, and stores them:

```bash
npm run ingest
```

**What it does:**
1. Extracts ~50+ content items from your portfolio data
2. Chunks them into manageable pieces
3. Generates embeddings using OpenAI
4. Stores in MongoDB with metadata

**Expected output:**
```
🚀 Starting data ingestion pipeline...
🔍 Starting content extraction...
✅ Extracted 52 content items
📦 Starting content chunking...
✅ Created 52 chunks from 52 items
🧠 Generating embeddings...
✅ Generated embeddings for 52 chunks
💾 Storing embeddings in MongoDB Atlas...
✅ Stored 52 chunks in MongoDB Atlas
```

---

### Step 4: Create Vector Search Index

After ingestion completes, you'll see instructions for creating a vector search index.

**In MongoDB Atlas UI:**

1. Go to your cluster → **Search** tab
2. Click **"Create Search Index"**
3. Choose **"JSON Editor"**
4. Select your database: `portfolio_chatbot`
5. Select collection: `portfolio_embeddings`
6. Paste this configuration:

```json
{
  "name": "vector_index",
  "type": "vectorSearch",
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
```

7. Click **"Create Search Index"**
8. Wait 2-3 minutes for index to build (status becomes "Active")

---

### Step 5: Test the Application

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 and:
1. Look for the chatbot button (bottom-right corner)
2. Click it to open the chat interface
3. Try example questions:
   - "What services does Aasim offer?"
   - "Tell me about his experience"
   - "What are his hourly rates?"
   - "How can I contact him?"

---

## Project Structure

```
aasimshah.com/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          # Chat API endpoint
├── components/
│   └── Chatbot/
│       └── Chatbot.tsx           # React chat UI
├── lib/
│   ├── prompts.ts                # System prompts & templates
│   └── safety.ts                 # Rate limiting & validation
├── scripts/
│   └── ingest/
│       ├── index.ts              # Main ingestion script
│       ├── extractors/
│       │   └── portfolio-extractor.ts
│       ├── chunker.ts            # Text chunking
│       ├── embedder.ts           # OpenAI embeddings
│       └── store.ts              # MongoDB storage
└── types/
    └── index.ts                  # TypeScript definitions
```

---

## How It Works

### 1. User asks a question
```
"What services does Aasim offer?"
```

### 2. Safety checks
- Rate limiting (20 req/min, 100 req/hour)
- Input validation (length, content)
- Sanitization

### 3. Vector search
- Query → OpenAI embedding
- Search MongoDB for similar content
- Filter by confidence score (>0.70)

### 4. Response generation
- Format search results as context
- Send to GPT-4o-mini with system prompt
- Return natural language response

### 5. Display to user
- Markdown formatted
- Real-time streaming
- Chat history maintained

---

## Configuration

### Rate Limits

Edit in `lib/safety.ts`:
```typescript
const RATE_LIMIT_CONFIG = {
  maxRequestsPerMinute: 20,
  maxRequestsPerHour: 100,
};
```

### Confidence Threshold

Edit in `app/api/chat/route.ts`:
```typescript
const searchResults = await vs.search({
  embedding: queryEmbedding,
  maxResults: 5,
  minScore: 0.70,  // Adjust this (0.0 - 1.0)
});
```

### Model Selection

Edit in `app/api/chat/route.ts`:
```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',  // or 'gpt-4', 'gpt-3.5-turbo'
  temperature: 0.7,
  max_tokens: 800,
});
```

---

## Updating Content

When you update portfolio data:

```bash
# Re-run ingestion
npm run ingest

# Restart dev server
npm run dev
```

The script automatically replaces old data in MongoDB.

---

## Troubleshooting

### "OPENAI_API_KEY is not set"
- Make sure `.env.local` exists and contains valid key
- Restart dev server after adding env vars

### "MONGODB_URI not configured"
- Check connection string format
- Ensure password doesn't contain special characters (URL encode if needed)
- Verify network access in MongoDB Atlas

### "Vector search index not found"
- Wait 2-3 minutes for index to build in Atlas
- Check index name is exactly `vector_index`
- Verify index is on correct collection

### Chatbot not appearing
- Check browser console for errors
- Ensure Chatbot component is imported in layout.tsx
- Clear browser cache and reload

### Low quality responses
- Lower confidence threshold (try 0.60)
- Add more content to portfolio data
- Adjust system prompt in `lib/prompts.ts`

---

## Production Deployment

### 1. Environment Variables

Set in Vercel/deployment platform:
- `OPENAI_API_KEY`
- `MONGODB_URI`

### 2. MongoDB Atlas

- Ensure cluster is production-ready
- Set up proper network access controls
- Enable authentication

### 3. Rate Limiting

For production, replace in-memory rate limiting with Redis:
- Add Redis (Upstash, Redis Cloud)
- Update `lib/safety.ts` to use Redis

### 4. Monitoring

- Add logging (Datadog, LogRocket)
- Monitor OpenAI usage
- Track MongoDB query performance

---

## API Endpoints

### POST /api/chat

**Request:**
```json
{
  "message": "What services does Aasim offer?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "role": "assistant",
  "content": "Aasim offers several services including..."
}
```

**Error Response:**
```json
{
  "error": "Message text",
  "code": "RATE_LIMITED",
  "retryAfter": 30
}
```

### GET /api/chat

Health check endpoint:
```json
{
  "status": "ok",
  "timestamp": "2026-01-11T12:00:00.000Z"
}
```

---

## Cost Estimation

### OpenAI Costs (per 1000 users/month)

**Embeddings (text-embedding-3-small):**
- Initial ingestion: ~$0.02 (one-time)
- Per query: ~$0.00002
- 10,000 queries: ~$0.20

**Chat Completions (gpt-4o-mini):**
- Per response: ~$0.0015
- 10,000 responses: ~$15

**Total: ~$15-20/month for 10,000 users**

### MongoDB Atlas

- Free tier: Up to 512MB storage (sufficient for this use case)
- Paid: $0.10/GB if needed

---

## Support

For issues or questions:
- Check troubleshooting section above
- Review MongoDB Atlas logs
- Check OpenAI API usage dashboard
- Verify environment variables are set correctly

---

## License

MIT License - Same as the main project
