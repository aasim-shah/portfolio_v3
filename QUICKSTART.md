# 🚀 Portfolio AI Chatbot - Quick Start

## ✅ What's Been Implemented

A **production-ready RAG chatbot** with:
- ✅ **Local embeddings** (bge-small-en-v1.5) - Free, no API keys
- ✅ **Gemini Pro** for chat generation only
- ✅ **Zero hallucinations** - Strict safety layer
- ✅ **Streaming responses** - Real-time SSE
- ✅ **MongoDB Vector Search** - Smart retrieval
- ✅ **Rate limiting** - 20/min, 100/hour per IP
- ✅ **Beautiful UI** - Chat widget with dark mode

## 📋 Prerequisites

You need:
1. **MongoDB Atlas** account (free tier) - [Sign up](https://cloud.mongodb.com/)
2. **Google Gemini API** key (free tier) - [Get key](https://ai.google.dev/)

## 🏃 Quick Setup (5 minutes)

### Step 1: Set Environment Variables

Create `.env.local` in the root directory:

```bash
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
GOOGLE_API_KEY=your_gemini_api_key_here
```

### Step 2: Run Data Ingestion

```bash
npm run ingest
```

**Expected output:**
```
🚀 Starting Portfolio Data Ingestion Pipeline
═══════════════════════════════════════════════════════════

🔍 Starting content extraction...
✅ Extracted 29 content items

📦 Starting content chunking...
✅ Created 29 chunks from 29 items

🧠 Generating embeddings using local model (bge-small-en-v1.5)...
🧠 Loading local embedding model (bge-small-en-v1.5)...
✅ Embedding model loaded successfully
✅ Generated embeddings for 29 chunks

💾 Storing embeddings in MongoDB Atlas...
✅ Connected to MongoDB Atlas
✅ Stored 29 chunks in MongoDB Atlas
   Version: 1736617200000

✨ Ingestion completed in 45.32s
```

**Note:** First run downloads the embedding model (~24MB). Subsequent runs are faster.

### Step 3: Create Vector Search Index

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
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
      }
    ]
  }
}
```

5. Click **Create Search Index**
6. Wait 2-5 minutes for it to build (refresh until status is "Active")

### Step 4: Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** and click the purple chat button in the bottom-right corner! 🎉

## 🧪 Test Queries

Try these to see the chatbot in action:

### ✅ Portfolio Questions (Will Work)
- "What services does Aasim offer?"
- "Tell me about his experience at Dcodax"
- "What are his hourly rates?"
- "How can I contact him?"
- "What projects has he built?"
- "What technologies does he know?"
- "Can he work remotely?"

### ❌ Out-of-Scope (Will Politely Decline)
- "What's the weather today?"
- "Tell me a joke"
- "Who won the World Cup?"

The chatbot will refuse and redirect back to portfolio topics.

## 🎯 How It Works

```
User: "What services does Aasim offer?"
    ↓
✅ Input validation & rate limiting
    ↓
🧠 Generate embedding (LOCAL - bge-small-en-v1.5)
    ↓
🔍 Vector search in MongoDB (top 5 results)
    ↓
🎯 Confidence check (min 0.70 score)
    ↓
📝 Build grounded prompt with retrieved context
    ↓
🤖 Gemini generates response (streaming)
    ↓
💬 Stream to user in real-time
```

## 📁 Key Files

```
app/api/chat/route.ts          # Chat API endpoint
components/Chatbot/Chatbot.tsx # Chat UI component
lib/embedding.ts                # Local embedding service
lib/safety.ts                   # Safety layer
scripts/ingest/                 # Data ingestion pipeline
types/chat.ts                   # TypeScript types
```

## 🔄 Updating Content

When you update `data/index.tsx`:

```bash
npm run ingest
```

This re-extracts, re-chunks, and re-embeds all content (~1-2 minutes).

## 🐛 Troubleshooting

### "Cannot find MongoDB collection"
- Ensure `MONGODB_URI` is set in `.env.local`
- Run `npm run ingest` first
- Check MongoDB Atlas dashboard for the collection

### "Vector search not working"
- Ensure the vector index is created and **Active** in Atlas
- Index name must be exactly: `vector_index`
- Wait 2-5 minutes after creating the index

### "Gemini API error"
- Check `GOOGLE_API_KEY` is set correctly
- Verify key at: https://ai.google.dev/
- Ensure you're using a valid Gemini Pro key

### "Embedding model not downloading"
```bash
# Clear cache and retry
rm -rf node_modules/.cache
npm run ingest
```

## 💰 Cost

For 10,000 queries/month:
- **Embeddings:** $0 (100% local, free!)
- **Gemini Pro:** $0-5 (free tier: 60 req/min)
- **MongoDB:** $0 (free tier: 512MB)
- **Total:** $0-5/month

## 🎨 Customization

### Adjust confidence threshold
Edit `lib/safety.ts`:
```typescript
const MIN_CONFIDENCE_SCORE = 0.70; // Lower = more lenient
```

### Change rate limits
Edit `lib/safety.ts`:
```typescript
const RATE_LIMITS = {
  minute: { windowMs: 60 * 1000, maxRequests: 20 },
  hour: { windowMs: 60 * 60 * 1000, maxRequests: 100 },
};
```

### Modify system prompt
Edit `lib/safety.ts` → `SYSTEM_PROMPT`

## 🚢 Deployment

Deploy to Vercel (or any Next.js host):

```bash
vercel deploy
```

**Important:** Set environment variables in your hosting dashboard:
- `MONGODB_URI`
- `GOOGLE_API_KEY`

## 📊 Monitoring

Check MongoDB Atlas dashboard:
- Collection: `portfolio_chatbot.portfolio_embeddings`
- Expected documents: ~29-70 (depends on content)
- Check vector index status

## ✨ Features

### Safety Layer
- ✅ Input validation (max 2000 chars)
- ✅ XSS/injection blocking
- ✅ Rate limiting per IP
- ✅ Confidence threshold (0.70)
- ✅ Context grounding (no hallucinations)

### UI Features
- ✅ Streaming responses
- ✅ Markdown support
- ✅ Suggested questions
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Smooth animations

## 📚 Full Documentation

See `CHATBOT_README.md` for comprehensive documentation.

## 🆘 Need Help?

1. Check `CHATBOT_README.md` for detailed troubleshooting
2. Review browser console for errors
3. Check server logs: `npm run dev`
4. Contact: contact@aasimshah.com

---

**You're all set!** The chatbot is now live on your portfolio. 🎉
