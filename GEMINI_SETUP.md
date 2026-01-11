# 🚀 Gemini API Setup Guide

Your chatbot has been successfully migrated to use **Google's Gemini API** instead of OpenAI!

## ✅ What's Done

1. **Installed Dependencies**: `@google/generative-ai` package
2. **Created Gemini Files**:
   - `scripts/ingest/embedder.ts` - Gemini embedding service
   - `scripts/ingest/index.ts` - Gemini-based ingestion pipeline
   - `app/api/chat/route.ts` - Gemini-powered chat endpoint
3. **Backed Up OpenAI Files** (for future use):
   - `scripts/ingest/embedder.openai.ts`
   - `scripts/ingest/index.openai.ts`
4. **Environment Configuration**: Created `.env.local` with your Gemini API key

## 📋 Next Steps

### 1. Update MongoDB Connection String

Edit `.env.local` and add your MongoDB connection string:

```bash
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
```

### 2. Run the Ingestion Pipeline

This will extract your portfolio content, create embeddings with Gemini, and store them in MongoDB:

```bash
npm run ingest
```

### 3. Create Vector Search Index in MongoDB Atlas

After ingestion completes, you'll see instructions to create a vector search index. 

**IMPORTANT**: Gemini uses **768-dimensional** embeddings (vs OpenAI's 1536).

Go to MongoDB Atlas:
1. Navigate to: **Database → Search → Create Search Index**
2. Use the JSON configuration printed by the ingestion script
3. Make sure `numDimensions` is set to **768**

### 4. Start Development Server

```bash
npm run dev
```

Your chatbot will now use Gemini for both embeddings and chat responses!

## 🔄 Switching Back to OpenAI

If you want to switch back to OpenAI in the future:

```bash
# Restore OpenAI files
mv app/api/chat/route.ts app/api/chat/route.gemini.ts
mv scripts/ingest/embedder.ts scripts/ingest/embedder.gemini.ts
mv scripts/ingest/index.ts scripts/ingest/index.gemini.ts

mv scripts/ingest/embedder.openai.ts scripts/ingest/embedder.ts
mv scripts/ingest/index.openai.ts scripts/ingest/index.ts

# Update .env.local with OpenAI key
# Re-run ingestion with OpenAI
# Update MongoDB vector index to 1536 dimensions
```

## 🎯 Key Differences

| Feature | OpenAI | Gemini |
|---------|--------|--------|
| Embedding Model | text-embedding-3-small | embedding-001 |
| Embedding Dimensions | 1536 | 768 |
| Chat Model | gpt-3.5-turbo | gemini-1.5-flash |
| API Cost | Paid | Free tier available |
| Rate Limits | Varies by tier | Generous free tier |

## 🔑 API Keys

- **Gemini API Key**: Already configured in `.env.local`
- Get free Gemini API key at: https://makersuite.google.com/app/apikey

## 📊 Monitoring

Check your Gemini API usage at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com

---

**Questions?** Check the main README.md or open an issue.
