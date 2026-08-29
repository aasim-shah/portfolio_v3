import type { Metadata } from "next";
import ProjectsCasebook from "@/components/ProjectsCasebook";
import { myShowCases } from "@/data";

const SITE_URL = "https://aasimshah.com";

export const metadata: Metadata = {
  title: "Projects - SaaS, Infrastructure, AI & Backend Engineering",
  description:
    "Explore Aasim Shah's production work across VPN and location infrastructure, multi-tenant SaaS, restaurant and pharmacy systems, healthtech, AI chatbots, payments, and marketplaces.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Projects - SaaS, Infrastructure, AI & Backend Engineering | Aasim Shah",
    description:
      "Production work across VPN and location infrastructure, multi-tenant SaaS, healthtech, and AI systems.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

const publicProjects = myShowCases.filter((project) => project.slug);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: publicProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/projects/${project.slug}`,
    name: project.title,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col gap-0 h-min overflow-hidden p-0 relative w-full flex-nowrap items-center justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full max-w-[1120px] px-5 py-20 sm:px-8 lg:w-[88%] lg:px-0">
        <ProjectsCasebook />
      </div>
    </div>
  );
}
