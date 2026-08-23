import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data";

const articleContent: Record<string, { heading: string; paragraphs: string[] }[]> = {
  "scalable-mern-stack-applications": [
    {
      heading: "Start with the operating model",
      paragraphs: [
        "A scalable application starts with a clear understanding of users, permissions, tenant boundaries, operational workflows, and the data that must remain isolated. I define those constraints before selecting schemas or creating endpoints.",
        "For multi-tenant products, the tenancy model affects authentication, database access, reporting, billing, background jobs, and observability. Treating it as a first-class architectural decision avoids expensive migrations later.",
      ],
    },
    {
      heading: "Keep the backend explicit",
      paragraphs: [
        "I separate transport, validation, business logic, and persistence so that individual parts can evolve without turning route handlers into the entire application. REST resources stay predictable, errors are structured, and authorization is enforced close to the business rule.",
        "MongoDB is useful for flexible product data, while MySQL and PostgreSQL are strong choices for transactional and relational workloads. The correct database is the one that matches the consistency, query, and operational requirements of the product.",
      ],
    },
    {
      heading: "Design for production from day one",
      paragraphs: [
        "Deployments, environment configuration, logs, metrics, backups, and incident visibility are part of product engineering. CI/CD and repeatable infrastructure reduce manual risk, while Grafana and Prometheus make system behaviour visible before users report a problem.",
      ],
    },
  ],
  "production-apis-cloud-infrastructure": [
    {
      heading: "Reliability is an application feature",
      paragraphs: [
        "Production APIs need more than correct responses. They need controlled timeouts, useful errors, authentication boundaries, rate controls, idempotent operations where appropriate, and metrics that reveal latency, throughput, saturation, and failure rates.",
      ],
    },
    {
      heading: "Automate repeatable operations",
      paragraphs: [
        "For VPN infrastructure, scripted Node.js and Bash workflows replaced manual server configuration with repeatable provisioning. The same principle applies to application deployment: if a process is performed more than once, it should be made predictable and auditable.",
        "CI/CD through GitHub Actions can build, validate, and deploy consistently. Container and process metrics then provide feedback about whether the release is healthy in its real environment.",
      ],
    },
    {
      heading: "Observe the whole path",
      paragraphs: [
        "A useful observability stack connects host health, containers, application processes, Redis, Kafka, and user-facing API behaviour. Dashboards are only the beginning; actionable alerting rules and clear incident ownership turn metrics into operational reliability.",
      ],
    },
  ],
  "designing-flexible-saas-backends": [
    {
      heading: "Make tenancy and permissions explicit",
      paragraphs: [
        "SaaS flexibility should not weaken isolation. Each request must carry a verified tenant context, and every data access path must respect it. Roles and permissions should represent real business responsibilities instead of being scattered as one-off checks.",
      ],
    },
    {
      heading: "Model workflows, not screens",
      paragraphs: [
        "Restaurant, pharmacy, hotel, and marketplace products have different interfaces, but their backends share important patterns: state transitions, audit history, notifications, inventory or capacity constraints, payments, and real-time updates. Modelling these workflows directly keeps the system maintainable when the UI changes.",
      ],
    },
    {
      heading: "Integrations need boundaries",
      paragraphs: [
        "Payment gateways, messaging providers, and AI services should sit behind application-owned interfaces. That boundary centralizes error handling and webhook verification, protects the core domain from provider-specific details, and makes future migrations possible.",
      ],
    },
  ],
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://aasimshah.com/blogs/${post.slug}` },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const sections = articleContent[slug];
  if (!post || !sections) notFound();

  return (
    <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
      <article className="flex flex-col gap-8 w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] p-[80px_0px]">
        <Link href="/blogs" className="text-[14px] font-semibold text-light-gray-2 hover:text-light-gray-4">← Back to all posts</Link>
        <header className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <div className="flex flex-wrap gap-3 text-[14px] text-light-gray-2">
            <span>{post.category}</span><span>·</span><span>{post.publishedAt}</span><span>·</span><span>{post.readTime}</span>
          </div>
          <h1 className="mt-5 text-[32px] font-bold leading-[1.15] text-white sm:text-[40px]">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-light-gray-2">{post.excerpt}</p>
        </header>
        {sections.map((section) => (
          <section key={section.heading} className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[24px] font-bold text-white">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-[16px] leading-[1.8] text-light-gray-2">{paragraph}</p>)}
          </section>
        ))}
      </article>
    </div>
  );
}
