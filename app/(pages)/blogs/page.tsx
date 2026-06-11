import { calendarIcon } from "@/app/assets/assets";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Aasim Shah Blog",
            description:
              "Insights on MERN stack development, production APIs, SaaS architecture, and cloud infrastructure.",
            url: "https://aasimshah.com/blogs",
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              url: `https://aasimshah.com/blogs/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Syed Aasim Shah",
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://aasimshah.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://aasimshah.com/blogs",
              },
            ],
          }),
        }}
      />

      <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
        <div className="flex flex-col gap-[60px] w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] items-center p-[80px_0px]">
          <SectionHeading
            icon={calendarIcon}
            title="My Blog Posts"
            description="Thoughts, lessons, and practical write-ups on software engineering, SaaS products, backend systems, and modern web development."
          />

          <div className="grid w-full grid-cols-1 gap-5">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-light-gray-2">
                  <span className="rounded-full border border-dark-gray-3 px-3 py-1 text-light-gray-4">
                    {post.category}
                  </span>
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  <h2 className="text-[24px] font-bold leading-[1.2] text-white">
                    {post.title}
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
          </div>
        </div>
      </div>
    </>
  );
}
