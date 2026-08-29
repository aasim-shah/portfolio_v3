import { MetadataRoute } from 'next'

/**
 * The wildcard rule below already allows every crawler, including AI bots.
 * These are named explicitly anyway: some AI crawlers check for a rule that
 * names them before falling back to the wildcard, and being explicit signals
 * intent (this site wants to be cited by AI answer engines) rather than
 * leaving it to a default.
 */
const aiCrawlers = [
  'GPTBot', // OpenAI - training
  'OAI-SearchBot', // OpenAI - ChatGPT search
  'ChatGPT-User', // OpenAI - live ChatGPT browsing
  'ClaudeBot', // Anthropic - training
  'Claude-Web', // Anthropic - live Claude browsing
  'anthropic-ai',
  'PerplexityBot', // Perplexity search
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews training
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl (used to train many LLMs)
  'Bytespider', // ByteDance / TikTok
  'Amazonbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/admin/'],
      })),
    ],
    sitemap: 'https://aasimshah.com/sitemap.xml',
  }
}
