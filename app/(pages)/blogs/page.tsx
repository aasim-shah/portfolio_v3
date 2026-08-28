import type { Metadata } from "next";
import { calendarIcon } from "@/app/assets/assets";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - MERN Stack, Production APIs, SaaS & Cloud Infrastructure",
  description:
    "Practical write-ups by Syed Aasim Shah on building scalable MERN stack applications, running production APIs and cloud infrastructure, and designing flexible multi-tenant SaaS backends.",
  alternates: { canonical: "https://aasimshah.com/blogs" },
  openGraph: {
    title: "Blog - MERN Stack, Production APIs, SaaS & Cloud Infrastructure",
    description:
      "Lessons from shipping production SaaS, backend APIs, and cloud infrastructure.",
    url: "https://aasimshah.com/blogs",
    type: "website",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Syed Aasim Shah — Engineering Blog",
  description:
    "Insights on MERN stack development, production APIs, SaaS architecture, and cloud infrastructure.",
  url: "https://aasimshah.com/blogs",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: `https://aasimshah.com/blogs/${post.slug}`,
    author: { "@id": "https://aasimshah.com/#person" },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aasimshah.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://aasimshah.com/blogs" },
  ],
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const needle = query.toLowerCase();

  const posts = needle
    ? blogPosts.filter((post) =>
        [post.title, post.excerpt, post.category]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    : blogPosts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
        <div className="flex flex-col gap-[60px] w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] items-center p-[80px_0px]">
          <SectionHeading
            icon={calendarIcon}
            titleAs="h1"
            title="Engineering Blog"
            description="Thoughts, lessons, and practical write-ups on software engineering, SaaS products, backend systems, and modern web development."
          />

          <div className="w-full">
            <form
              method="get"
              action="/blogs"
              role="search"
              className="flex w-full flex-wrap items-center gap-3"
            >
              <label htmlFor="blog-search" className="sr-only">
                Search the blog
              </label>
              <input
                id="blog-search"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search posts…"
                className="min-h-11 flex-1 rounded-lg border border-dark-gray-3 bg-very-dark-gray px-4 text-sm text-white placeholder:text-light-gray-1 focus:border-dark-gray-7 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-lg border border-dark-gray-3 bg-dark-gray-3 px-4 text-sm font-semibold text-light-gray-4 transition-colors hover:bg-almost-black"
              >
                Search
              </button>
            </form>
            {query ? (
              <p className="mt-3 text-sm text-light-gray-2">
                {posts.length} result{posts.length === 1 ? "" : "s"} for{" "}
                <span className="text-light-gray-4">&ldquo;{query}&rdquo;</span> ·{" "}
                <Link href="/blogs" className="hover:text-light-gray-4">
                  Clear
                </Link>
              </p>
            ) : null}
          </div>

          <div className="grid w-full grid-cols-1 gap-5">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-light-gray-2">
                  <span className="rounded-full border border-dark-gray-3 px-3 py-1 text-light-gray-4">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>{post.publishedAt}</time>
                  <span>{post.readTime}</span>
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  <h2 className="text-[24px] font-bold leading-[1.2] text-white">
                    <Link href={`/blogs/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-base font-medium text-light-gray-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center rounded-lg border border-dark-gray-3 bg-dark-gray-3 px-4 py-2 text-sm font-semibold text-light-gray-4 transition-all duration-300 hover:bg-almost-black"
                  >
                    Read post
                  </Link>
                </div>
              </article>
            ))}

            {posts.length === 0 ? (
              <p className="text-sm text-light-gray-2">
                No posts match that search.{" "}
                <Link href="/blogs" className="text-light-gray-4 hover:underline">
                  View all posts
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
