import type { Metadata } from "next";
import { zapIcon } from "@/app/assets/assets";
import MyStack from "@/components/MyStack/MyStack";
import SectionHeading from "@/components/SectionHeading";
import ShowCase from "@/components/ShowCase";
import Testimonials from "@/components/Testimonials";
import ServicesPlansGrid from "@/components/Services/ServicesPlansGrid";
import { myServicesPlans } from "@/data";

export const metadata: Metadata = {
  title: "Full-Stack Development Services in Pakistan",
  description:
    "Hire Aasim Shah (Syed Aasim Shah), a senior full-stack developer in Islamabad, Pakistan, for backend architecture, SaaS products, APIs, and cloud infrastructure — from design through launch and managed operations.",
  alternates: { canonical: "https://aasimshah.com/services" },
  openGraph: {
    title: "Full-Stack Development Services in Pakistan | Aasim Shah",
    description:
      "Backend architecture, SaaS delivery, APIs, and cloud infrastructure services from a senior full-stack engineer based in Islamabad, Pakistan.",
    url: "https://aasimshah.com/services",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://aasimshah.com/services#service",
  serviceType: "Full-Stack Development Services in Pakistan",
  provider: { "@id": "https://aasimshah.com/#person" },
  url: "https://aasimshah.com/services",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: myServicesPlans.map((plan) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `https://aasimshah.com/services/${plan.slug}#service`,
        name: plan.service,
        description: plan.description,
        url: `https://aasimshah.com/services/${plan.slug}`,
      },
      url: "https://aasimshah.com/contact",
    })),
  },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: myServicesPlans.map((plan, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://aasimshah.com/services/${plan.slug}`,
    name: plan.service,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aasimshah.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://aasimshah.com/services" },
  ],
};

export default function SearvicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-1 flex-col gap-0 h-min overflow-hidden p-0 relative w-w-full flex-nowrap items-center justify-start">
        <div className="gap-[60px] flex-col max-w-full w-full lg:max-w-[750px] px-5 lg:px-0 lg:w-[80%] flex-nowrap flex items-center flex-none h-min justify-center  relative overflow-visible p-[80px_0px]  ">
          <SectionHeading
            icon={zapIcon}
            titleAs="h1"
            title="Full-Stack Development Services in Pakistan"
            description="Work with a senior full-stack developer in Islamabad, Pakistan for production software—from backend architecture and user-facing applications through deployment and managed operations."
          />

          <section className="w-full rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[24px] font-bold text-white">
              Full-stack engineering from architecture to launch
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-light-gray-2">
              I help startups and product teams build reliable web platforms with Node.js, React, Next.js, TypeScript, PostgreSQL, MongoDB, and cloud infrastructure. Based in Islamabad, I work remotely with clients across Pakistan and worldwide on SaaS products, backend APIs, real-time systems, payment integrations, AI features, and production operations.
            </p>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-light-gray-2">
              Engagements can cover a complete product build, a difficult backend or infrastructure problem, or ongoing engineering support. My experience includes 8+ launched products and infrastructure serving approximately 2M users across 20+ regions.
            </p>
          </section>

          <ServicesPlansGrid />

          <Testimonials />

          <p className="w-full text-[13px] leading-6 text-light-gray-2">
            Client references from past engagements are available on request —{" "}
            <a
              href="mailto:contact@aasimshah.com"
              className="font-semibold text-light-gray-4 hover:underline"
            >
              contact@aasimshah.com
            </a>
            .
          </p>

          <MyStack />
          <ShowCase isMore showData={4} />
        </div>
      </div>
    </>
  );
}
