# Portfolio AI Chatbot

A production-ready RAG (Retrieval-Augmented Generation) chatbot for Aasim Shah's portfolio website.

## ✨ Key Features

- **Local Embeddings**: Uses bge-small-en-v1.5 (free, no API keys, deterministic)
- **Gemini AI Chat**: Uses Google Gemini Pro for intelligent, natural response generation
- **Smart Context Understanding**: Gemini analyzes retrieved portfolio data and generates human-like responses
- **Zero Hallucinations**: Strict safety layer ensures only portfolio-based answers
- **Streaming Responses**: Real-time SSE streaming for better UX
- **Smart Search**: MongoDB Atlas vector search with confidence scoring
- **Rate Limiting**: 20 req/min, 100 req/hour per IP
- **Beautiful UI**: Modern chat widget with dark mode support

## 🚀 Quick Setup

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` with:

```bash
# MongoDB Atlas (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Google Gemini API (Required)
GOOGLE_API_KEY=your_gemini_api_key_here
```

**Get API Keys:**
- MongoDB: https://cloud.mongodb.com/ (Free tier available)
- Gemini: https://ai.google.dev/ (Free tier available)

### 3. Run Data Ingestion

This extracts portfolio content, generates embeddings (locally!), and stores in MongoDB:

```bash
npm run ingest
```

**What happens:**
1. Extracts content from `data/index.tsx`
2. Chunks content (~40-70 chunks)
3. Generates embeddings using local bge-small-en-v1.5 model (~24MB download on first run)
4. Stores in MongoDB Atlas
5. Takes ~1-2 minutes

### 4. Create Vector Search Index

After ingestion, create the index in MongoDB Atlas:

1. Go to https://cloud.mongodb.com/
2. Select your cluster → **Search** → **Create Search Index**
3. Choose **JSON Editor**
4. Paste this configuration:

```json
{
  "name": "vector_index",
  "type": "vectorSearch",
  "definition": {
    "fields": [
      {
        "type": "vector",
        "path": "embedding",
        "numDimensions": 384,
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

5. Click **Create Search Index**
6. Wait for index to build (~2-5 minutes)

### 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and click the chat button in the bottom-right corner!

## 📊 Architecture

```
User Query
    ↓
Safety Checks (rate limit, validation)
    ↓
Generate Embedding (LOCAL bge-small-en-v1.5)
    ↓
Vector Search (MongoDB Atlas)
    ↓
Confidence Check (min 0.70 score)
    ↓
Format Context with Metadata
    ↓
Gemini AI Generation (streaming)
    ↓
Smart, Natural Response
```

## 🤖 How Gemini AI Works

Instead of just returning raw database text, the chatbot now:

1. **Retrieves Context**: Finds relevant portfolio data using vector search
2. **Formats Context**: Adds metadata (confidence scores, sections, titles) for better AI understanding
3. **Gemini Processing**: Sends context + system prompt to Gemini Pro
4. **Smart Response**: Gemini generates natural, conversational responses based on retrieved data
5. **Streaming**: Response streams word-by-word for real-time feel

### Example Transformation:

**Without Gemini (Raw DB):**
```
Contact Aasim Shah:
• Email: contact@aasimshah.com (Primary contact - response within 24-48 hours)
• Location: Pakistan (Available for remote work globally)
...
```

**With Gemini AI (Smart Response):**
```
You can reach Aasim at **contact@aasimshah.com** - he typically responds within 
24-48 hours. He's based in Pakistan but works remotely with clients worldwide. 
Would you like to know more about his availability or services?
```

## 🔒 Safety Features

### Input Validation
- Max 2000 characters
- Blocks injection attempts
- Sanitizes HTML/scripts

### Rate Limiting
- 20 requests per minute per IP
- 100 requests per hour per IP
- Exponential backoff

### Confidence Threshold
- Minimum similarity score: 0.70
- No results → Fallback response
- Low confidence → Helpful suggestion

### Context Grounding
- **ONLY uses retrieved portfolio data**
- **NEVER uses general knowledge**
- **NEVER invents information**
- Strict system prompt enforcement

## 📁 Project Structure

```
app/api/chat/
  route.ts                 # Chat API endpoint (Gemini + streaming)

components/Chatbot/
  Chatbot.tsx              # Chat UI component

lib/
  embedding.ts             # Local embedding service (Transformers.js)
  safety.ts                # Safety layer (validation, rate limiting, confidence)

scripts/ingest/
  index.ts                 # Main ingestion orchestrator
  extract.ts               # Content extraction from data/index.tsx
  chunker.ts               # Text chunking with overlap
  embedder.ts              # Embedding generation (local)
  store.ts                 # MongoDB storage + vector search

types/
  chat.ts                  # TypeScript definitions
```

## 🧪 Testing the Chatbot

Try these example queries:

### ✅ Good Queries (will work)
- "What services does Aasim offer?"
- "Tell me about his experience"
- "What are his hourly rates?"
- "How can I contact him?"
- "What projects has he worked on?"
- "What technologies does he use?"

### ❌ Out-of-Scope Queries (will fallback)
- "What's the weather today?"
- "Tell me a joke"
- "What's 2+2?"

The chatbot will politely refuse and redirect to portfolio topics.

## 💰 Cost Estimation

### For 10,000 queries/month:

**Embeddings:** $0 (local, free!)
**Chat (Gemini):** $0-5 (free tier covers ~60 queries/min)
**MongoDB:** $0 (free tier: 512MB)
**Total:** $0-5/month

## 🔧 Configuration

### Rate Limits (lib/safety.ts)
```typescript
const RATE_LIMITS = {
  minute: { windowMs: 60 * 1000, maxRequests: 20 },
  hour: { windowMs: 60 * 60 * 1000, maxRequests: 100 },
};
```

### Confidence Threshold (lib/safety.ts)
```typescript
const MIN_CONFIDENCE_SCORE = 0.70;
```

### Vector Search (app/api/chat/route.ts)
```typescript
const VECTOR_CONFIG = {
  minScore: 0.70,
  maxResults: 5,
};
```

## 🔄 Updating Portfolio Content

When you update `data/index.tsx`, re-run ingestion:

```bash
npm run ingest
```

This will:
1. Extract new content
2. Re-generate embeddings
3. Replace old data in MongoDB
4. Takes ~1-2 minutes

## 🐛 Troubleshooting

### Embedding model not downloading
```bash
# Clear cache and retry
rm -rf node_modules/.cache
npm run ingest
```

### MongoDB connection issues
- Check `MONGODB_URI` in `.env.local`
- Verify IP whitelist in Atlas (allow 0.0.0.0/0 for development)
- Test connection: https://cloud.mongodb.com/

### Vector search not working
- Ensure index is created and active in Atlas
- Index name must be exactly: `vector_index`
- Wait 2-5 minutes for index to build

### Chatbot not responding
1. Check browser console for errors
2. Verify API endpoint: http://localhost:3000/api/chat
3. Check server logs for errors
4. Ensure `GOOGLE_API_KEY` is set

## 📈 Monitoring

### Check MongoDB Usage
- Dashboard: https://cloud.mongodb.com/
- Collection: `portfolio_chatbot.portfolio_embeddings`
- Expected documents: ~40-70

### Check API Usage
- Gemini: https://ai.google.dev/
- Rate limits: Check response headers

### Log Levels
Set in `.env.local`:
```bash
LOG_LEVEL=debug  # debug, info, warn, error
```

## 🚢 Deployment

The chatbot works with any Next.js hosting:

### Vercel (Recommended)
```bash
vercel deploy
```

Set environment variables in Vercel dashboard.

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

**Important:** Set all environment variables on your hosting platform!

## 🎯 How It Works

### Data Ingestion (One-time)
1. **Extract**: Reads from `data/index.tsx` (experience, services, projects, etc.)
2. **Chunk**: Splits into 500-token chunks with 50-token overlap
3. **Embed**: Generates 384-dim vectors using local bge-small-en-v1.5 model
4. **Store**: Saves to MongoDB with metadata

### Chat Flow (Per Query)
1. **Validate**: Check input length, block injection attempts
2. **Rate Limit**: Ensure user hasn't exceeded limits
3. **Embed Query**: Generate embedding (locally, ~50ms)
4. **Vector Search**: Find top-5 similar chunks in MongoDB
5. **Check Confidence**: Ensure score ≥ 0.70
6. **Build Prompt**: Inject retrieved context + strict safety rules
7. **Generate**: Stream response from Gemini
8. **Return**: SSE stream to client

## 🔐 Security Notes

- No API keys stored client-side
- Rate limiting per IP
- Input sanitization
- Context grounding prevents hallucinations
- CORS restricted to your domain in production

## 📝 License

Same as main project (MIT)

---

**Built with:**
- Next.js 15
- Transformers.js (local embeddings)
- Google Gemini Pro
- MongoDB Atlas Vector Search
- TypeScript
- Tailwind CSS

**Need help?** Check the troubleshooting section or contact Aasim at contact@aasimshah.com
