import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { myServices, myShowCases } from "@/data";
import { serviceContent } from "@/data/serviceContent";

const SITE_URL = "https://aasimshah.com";

export function generateStaticParams() {
  return myServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = myServices.find((item) => item.slug === slug);
  if (!service) return {};
  const url = `${SITE_URL}/services/${slug}`;
  const title = `${service.title} Services in Pakistan`;

  return {
    title,
    description: `${service.description} Hire Aasim Shah, a senior full-stack developer in Islamabad, Pakistan.`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${title} | Aasim Shah`,
      description: service.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Aasim Shah`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = myServices.find((item) => item.slug === slug);
  const content = slug ? serviceContent[slug] : undefined;
  if (!service || !content) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;
  const otherServices = myServices.filter((item) => item.slug !== service.slug);
  const relatedProjects = myShowCases.filter(
    (project) => project.slug && content.relatedProjectSlugs.includes(project.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${service.title} Services`,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <li><Link href="/services" className="hover:text-light-gray-4">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-light-gray-4">{service.title}</li>
          </ol>
        </nav>

        <header className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <p className="text-[13px] text-light-gray-2">{content.tagline}</p>
          <h1 className="mt-4 text-[32px] font-bold leading-[1.15] text-white sm:text-[40px]">
            {service.title} Services in Pakistan
          </h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-light-gray-2">{service.description}</p>

          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project <ArrowUpRight size={14} />
          </Link>
        </header>

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[24px] font-bold text-white">Overview</h2>
          {content.overview.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[16px] leading-[1.8] text-light-gray-2">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="grid w-full grid-cols-1 gap-[10px] sm:grid-cols-2">
          <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">What&apos;s included</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] font-medium text-light-gray-2">
              {content.whatsIncluded.map((item) => (
                <li key={item}>• {item}</li>
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
          <h2 className="text-[20px] font-bold text-white">Track record</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <strong className="text-2xl font-semibold text-white">{stat.value}</strong>
                <p className="mt-1 text-[13px] leading-5 text-light-gray-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedProjects.length > 0 ? (
          <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">Related work</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-light-gray-2">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="font-semibold text-light-gray-4 hover:underline">
                    {project.title}
                  </Link>
                  {" — "}
                  {project.description}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">Other services</h2>
          <ul className="mt-4 flex flex-col gap-3 text-[15px] text-light-gray-2">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="font-semibold text-light-gray-4 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-[1.7] text-light-gray-2">
            Ready to talk specifics?{" "}
            <Link href="/contact" className="font-semibold text-light-gray-4 hover:underline">Get in touch</Link>{" "}
            or see the full{" "}
            <Link href="/projects" className="font-semibold text-light-gray-4 hover:underline">project list</Link>.
          </p>
        </section>

        <Link href="/services" className="text-[14px] font-semibold text-light-gray-2 hover:text-light-gray-4">
          ← Back to all services
        </Link>
      </article>
    </div>
  );
}
