import { notFound } from "next/navigation";
import { blogPosts } from "@/data";
import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/ogImage";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return renderOgImage({
    eyebrow: `${post.category} · aasimshah.com`,
    title: post.title,
    subtitle: `By Syed Aasim Shah · ${post.publishedAt}`,
  });
}
