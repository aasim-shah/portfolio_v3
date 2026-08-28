import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import MyExperience from "@/components/MyExperience/MyExperience";
import MyServices from "@/components/MyServices/MyServices";
import MyStack from "@/components/MyStack/MyStack";
import ShowCase from "@/components/ShowCase";
import Testimonials from "@/components/Testimonials";
import HomeChatbot from "@/components/HomeChatbot";

export const metadata: Metadata = {
  alternates: { canonical: "https://aasimshah.com" },
  openGraph: {
    url: "https://aasimshah.com",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Syed Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
  description:
    "Portfolio of Syed Aasim Shah, a backend-focused Senior Full-Stack Engineer and Solution Architect specializing in production SaaS, infrastructure, fintech, and AI systems.",
  url: "https://aasimshah.com",
  isPartOf: { "@id": "https://aasimshah.com/#website" },
  about: { "@id": "https://aasimshah.com/#person" },
  mainEntity: { "@id": "https://aasimshah.com/#person" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aasimshah.com" },
    ],
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Full-Stack Product Engineering",
      description:
        "Production applications using Node.js, React, Next.js, TypeScript, and relational and document databases.",
    },
    {
      "@type": "Service",
      position: 2,
      name: "API Development",
      description:
        "REST APIs, database architecture, real-time systems, payment gateways, and AI integrations.",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Cloud & DevOps",
      description:
        "Linux and WireGuard automation, CI/CD, observability, and multi-cloud deployments.",
    },
    {
      "@type": "Service",
      position: 4,
      name: "SaaS Product Development",
      description:
        "Multi-tenant SaaS delivery from system design through launch and managed operations.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className="flex lg:flex-1 flex-col gap-0 h-min px-5 overflow-hidden p-0 relative lg:px-0 w-full flex-wrap lg:flex-nowrap items-center justify-start">
        <div className="gap-[100px] flex-col max-w-full w-full lg:max-w-[750px] lg:w-[80%] lg:flex-nowrap flex items-center flex-none h-min justify-center  relative overflow-hidden lg:overflow-visible p-[80px_0px]  ">
          <Hero />
          <MyExperience />
          <MyStack />
          <MyServices />
          <Testimonials />
          <ShowCase showData={4} isMore />
          <HomeChatbot />
        </div>
      </div>
    </>
  );
}
