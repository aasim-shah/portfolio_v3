import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { myShowCases } from "@/data";
import { projectContent } from "@/data/projectContent";

const SITE_URL = "https://aasimshah.com";

export function generateStaticParams() {
  return myShowCases
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = myShowCases.find((item) => item.slug === slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${slug}`;
  const title = `${project.title} - ${project.type} Case Study`;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = myShowCases.find((item) => item.slug === slug);
  const content = slug ? projectContent[slug] : undefined;
  if (!project || !content) notFound();

  const url = `${SITE_URL}/projects/${project.slug}`;
  const otherProjects = myShowCases.filter(
    (item) => item.slug && item.slug !== project.slug
  );

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: project.title,
    description: project.description,
    url: project.link || url,
    applicationCategory: project.type,
    operatingSystem: "Web",
    creator: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    keywords: content.stack.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="flex flex-col gap-8 w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] p-[80px_0px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-light-gray-2">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-light-gray-4">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/projects" className="hover:text-light-gray-4">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-light-gray-4">{project.title}</li>
          </ol>
        </nav>

        <header className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 768px) 100vw, 750px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[13px] text-light-gray-2">
            <span>{content.tagline}</span><span>·</span><span>{project.status}</span>
          </div>
          <h1 className="mt-4 text-[32px] font-bold leading-[1.15] text-white sm:text-[40px]">
            {project.title}
          </h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-light-gray-2">{project.description}</p>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Visit live site <ArrowUpRight size={14} />
            </a>
          ) : null}
        </header>

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[24px] font-bold text-white">Overview</h2>
          {content.overview.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[16px] leading-[1.8] text-light-gray-2">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">My role</h2>
          <p className="mt-4 text-[16px] leading-[1.8] text-light-gray-2">{content.role}</p>
        </section>

        <section className="grid w-full grid-cols-1 gap-[10px] sm:grid-cols-2">
          <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">Key capabilities</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] font-medium text-light-gray-2">
              {content.capabilities.map((capability) => (
                <li key={capability}>• {capability}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-dark-gray-4 px-3 py-1 font-IBM_Plex_Mono text-[11px] text-light-gray-2"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-full rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">Scale &amp; operating detail</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <strong className="text-2xl font-semibold text-white">{stat.value}</strong>
                <p className="mt-1 text-[13px] leading-5 text-light-gray-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">Other projects</h2>
          <ul className="mt-4 flex flex-col gap-3 text-[15px] text-light-gray-2">
            {otherProjects.map((item) => (
              <li key={item.slug}>
                <Link href={`/projects/${item.slug}`} className="font-semibold text-light-gray-4 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-[1.7] text-light-gray-2">
            Need something similar built?{" "}
            <Link href="/services" className="font-semibold text-light-gray-4 hover:underline">See services</Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-light-gray-4 hover:underline">start a project</Link>.
          </p>
        </section>

        <Link href="/projects" className="text-[14px] font-semibold text-light-gray-2 hover:text-light-gray-4">
          ← Back to all projects
        </Link>
      </article>
    </div>
  );
}
