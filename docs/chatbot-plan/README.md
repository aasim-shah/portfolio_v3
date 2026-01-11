# 🤖 Portfolio Chatbot Implementation

A production-ready RAG (Retrieval-Augmented Generation) chatbot for Aasim Shah's portfolio website.

## ✨ Features

- **RAG Pipeline**: Extracts, chunks, embeds, and stores portfolio content
- **Vector Search**: MongoDB Atlas with semantic similarity search
- **Safety Layer**: Rate limiting, input validation, confidence checking
- **Smart Responses**: Only answers from actual portfolio data
- **Beautiful UI**: Modern chat interface with markdown support
- **Production Ready**: Full error handling, type safety, and monitoring

## 🚀 Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup guide.

## 📖 Full Documentation

See [SETUP.md](./SETUP.md) for comprehensive documentation.

## 🏗️ Architecture

```
User Question
     ↓
Safety Checks (rate limit, validation)
     ↓
Generate Embedding (OpenAI)
     ↓
Vector Search (MongoDB Atlas)
     ↓
LLM Generation (GPT-4o-mini + context)
     ↓
Response (markdown formatted)
```

## 📦 Implementation Details

### Tech Stack
- **Frontend**: React 18, Next.js 15, TailwindCSS
- **Backend**: Next.js API Routes
- **AI/ML**: OpenAI (embeddings + chat)
- **Database**: MongoDB Atlas (vector search)
- **Language**: TypeScript (100% type safe)

### Data Pipeline
1. **Extraction**: Reads from `data/index.tsx`
2. **Chunking**: Max 500 tokens per chunk
3. **Embedding**: OpenAI text-embedding-3-small (1536 dimensions)
4. **Storage**: MongoDB with vector search index

### Safety Measures
- Rate limiting: 20/min, 100/hour per IP
- Input validation: Length, XSS, SQL injection
- Confidence threshold: 0.70 minimum similarity
- Graceful fallbacks: Helpful error messages

## 💰 Cost Estimation

For 10,000 queries/month:
- **Embeddings**: ~$0.20
- **Chat Completions**: ~$15
- **MongoDB**: Free tier (512MB)
- **Total**: ~$15-20/month

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `types/index.ts` | TypeScript definitions |
| `scripts/ingest/` | Data ingestion pipeline |
| `lib/safety.ts` | Rate limiting & validation |
| `lib/prompts.ts` | System prompts & templates |
| `app/api/chat/route.ts` | Chat API endpoint |
| `components/Chatbot/` | React chat interface |

## 🧪 Testing

Try these queries:
- "What services does Aasim offer?"
- "Tell me about his experience"
- "What are the hourly rates?"
- "How can I contact him?"

## 📊 Monitoring

Track these metrics:
- Response time
- Confidence scores
- Rate limit hits
- OpenAI token usage
- MongoDB query performance

## 🚢 Deployment

### Environment Variables
```bash
OPENAI_API_KEY=sk-proj-...
MONGODB_URI=mongodb+srv://...
```

### Build & Deploy
```bash
npm run build
npm run start
```

Works with Vercel, Netlify, or any Node.js hosting.

## 🛠️ Maintenance

### Update Content
```bash
npm run ingest
```

### Monitor Usage
- OpenAI Dashboard: https://platform.openai.com/usage
- MongoDB Atlas: https://cloud.mongodb.com/

### Adjust Settings
- Rate limits: `lib/safety.ts`
- Confidence: `app/api/chat/route.ts`
- Prompts: `lib/prompts.ts`

## 🎯 Next Steps

1. **Set up environment variables** (.env.local)
2. **Run data ingestion** (`npm run ingest`)
3. **Create vector index** (MongoDB Atlas)
4. **Test the chatbot** (`npm run dev`)
5. **Deploy to production** (Vercel/Netlify)

## 📝 Notes

- All content extracted from existing portfolio data
- No external APIs except OpenAI and MongoDB
- Works offline with cached embeddings
- Mobile-responsive chat interface
- Dark mode support built-in

## 🤝 Support

For issues:
1. Check [SETUP.md](./SETUP.md) troubleshooting section
2. Verify environment variables
3. Check MongoDB Atlas connection
4. Review OpenAI API status

## 📄 License

MIT License - Same as main project

---

Built with ❤️ for Aasim Shah's Portfolio
