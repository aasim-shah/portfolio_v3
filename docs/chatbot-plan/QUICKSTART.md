# Portfolio Chatbot - Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Add Environment Variables

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-proj-your-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_chatbot
```

### 2. Run Data Ingestion

```bash
npm run ingest
```

This will:
- Extract ~52 content items from your portfolio
- Generate embeddings using OpenAI
- Store everything in MongoDB

### 3. Create Vector Search Index

In MongoDB Atlas:
1. Go to your cluster → **Search** tab
2. Click **"Create Search Index"** → **"JSON Editor"**
3. Database: `portfolio_chatbot`, Collection: `portfolio_embeddings`
4. Paste this JSON:

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
    }
  ]
}
```

5. Wait 2-3 minutes for index to build

### 4. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 and click the chatbot button (bottom-right)!

---

## 📂 What Was Created

```
✅ Types (types/index.ts)
   - All TypeScript definitions for chatbot, RAG, and safety

✅ Data Ingestion Pipeline (scripts/ingest/)
   - portfolio-extractor.ts - Extracts content from your portfolio data
   - chunker.ts - Splits content into optimal chunks
   - embedder.ts - Generates OpenAI embeddings
   - store.ts - Stores in MongoDB with vector search

✅ Safety Layer (lib/safety.ts)
   - Rate limiting (20/min, 100/hour)
   - Input validation & sanitization
   - Confidence checking

✅ Prompts Library (lib/prompts.ts)
   - System prompt with guidelines
   - Context formatters
   - Example questions

✅ Chat API (app/api/chat/route.ts)
   - RAG implementation
   - Vector search integration
   - OpenAI chat completion

✅ React Component (components/Chatbot/Chatbot.tsx)
   - Beautiful chat UI
   - Real-time messaging
   - Markdown support
   - Example questions

✅ Integration (app/layout.tsx)
   - Chatbot added to all pages
```

---

## 🎯 Key Features

### 1. RAG (Retrieval-Augmented Generation)
- Searches your portfolio content using semantic similarity
- Only returns information from your actual portfolio data
- No hallucinations or made-up information

### 2. Safety Layer
- **Rate Limiting**: 20 requests/minute, 100/hour per user
- **Input Validation**: Blocks XSS, SQL injection, oversized inputs
- **Confidence Checking**: Falls back gracefully when unsure

### 3. Smart Context
- Extracts 50+ content items from your portfolio
- Chunks them intelligently (max 500 tokens each)
- Stores with metadata (section, keywords, entities)

### 4. Production Ready
- MongoDB Atlas vector search
- Error handling & fallbacks
- Rate limit headers
- TypeScript type safety

---

## 🧪 Test Questions

Try these in the chatbot:

**Services & Pricing:**
- "What services does Aasim offer?"
- "What are the hourly rates?"
- "How do I hire Aasim?"

**Experience:**
- "Tell me about his work experience"
- "What companies has he worked with?"
- "What's his background?"

**Projects:**
- "Show me recent projects"
- "What technologies does he use?"
- "What kind of websites does he build?"

**Contact:**
- "How can I contact Aasim?"
- "What's his email address?"
- "Where is he located?"

---

## 📊 How It Works

1. **User asks**: "What services does Aasim offer?"
2. **Safety check**: Rate limit, validate input
3. **Generate embedding**: Convert question to vector (1536 dimensions)
4. **Vector search**: Find similar content in MongoDB (cosine similarity >0.70)
5. **LLM generation**: Send context + question to GPT-4o-mini
6. **Response**: Natural language answer based on portfolio data
7. **Display**: Markdown-formatted response in chat UI

---

## 🔧 Configuration

### Adjust Rate Limits
`lib/safety.ts`:
```typescript
const RATE_LIMIT_CONFIG = {
  maxRequestsPerMinute: 20,  // Change this
  maxRequestsPerHour: 100,   // Change this
};
```

### Adjust Confidence Threshold
`app/api/chat/route.ts`:
```typescript
minScore: 0.70,  // Lower = more results (try 0.60)
```

### Change AI Model
`app/api/chat/route.ts`:
```typescript
model: 'gpt-4o-mini',  // Try 'gpt-4' or 'gpt-3.5-turbo'
```

---

## 💡 Tips

1. **Low Quality Responses?**
   - Lower confidence threshold to 0.60
   - Add more detailed content to your portfolio data
   - Adjust system prompt in `lib/prompts.ts`

2. **Updating Content?**
   - Just run `npm run ingest` again
   - It automatically replaces old data

3. **Production Deployment?**
   - Add env vars to Vercel/hosting platform
   - Replace in-memory rate limiting with Redis
   - Monitor OpenAI API usage

4. **Cost Concerns?**
   - Use `gpt-3.5-turbo` instead of `gpt-4o-mini`
   - Reduce `max_tokens` in API route
   - Cache frequently asked questions

---

## 📚 Full Documentation

See `/docs/chatbot-plan/SETUP.md` for detailed documentation including:
- Troubleshooting guide
- Production deployment steps
- API reference
- Cost estimation
- Monitoring setup

---

## 🎉 You're Done!

The chatbot is now fully integrated into your portfolio. It will:
- ✅ Answer questions about your work, services, and experience
- ✅ Only use information from your actual portfolio
- ✅ Handle rate limiting and validation automatically
- ✅ Fall back gracefully when unsure
- ✅ Provide a great user experience

**Next Steps:**
1. Set up your API keys
2. Run the ingestion script
3. Create the vector search index
4. Test the chatbot!
