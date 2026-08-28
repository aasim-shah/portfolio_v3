import { MetadataRoute } from 'next'
import { blogPosts } from '@/data'

const baseUrl = 'https://aasimshah.com'

/**
 * Per-route last-modified dates. These are intentionally distinct and hand-maintained
 * so Googlebot can use `lastmod` to prioritise recrawling. Bump the relevant date
 * whenever a page's content meaningfully changes.
 */
const pageLastModified: Record<string, string> = {
  '/': '2026-08-27',
  '/about': '2026-08-01',
  '/projects': '2026-08-20',
  '/services': '2026-08-01',
  '/contact': '2026-07-12',
  '/privacy': '2025-07-12',
  '/terms': '2025-07-12',
  '/refund': '2025-07-12',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = blogPosts
    .map((post) => post.updated ?? post.date)
    .sort()
    .at(-1)

  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: pageLastModified['/'], changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: pageLastModified['/about'], changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: pageLastModified['/projects'], changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: pageLastModified['/services'], changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: pageLastModified['/contact'], changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: newestPost ?? pageLastModified['/'], changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: pageLastModified['/privacy'], changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: pageLastModified['/terms'], changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund`, lastModified: pageLastModified['/refund'], changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [
    ...pages,
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
