import type { Metadata } from "next";
import { briefcaseIconley } from "@/app/assets/assets";
import MyExperience from "@/components/MyExperience/MyExperience";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Aasim Shah (Asim Shah) - Full-Stack Developer",
  description: "Learn about Aasim Shah, also searched as Asim Shah, a senior full-stack developer in Islamabad, Pakistan with experience in SaaS, APIs, cloud infrastructure, fintech, healthtech, and AI.",
  alternates: { canonical: "https://aasimshah.com/about" },
  openGraph: {
    title: "About Syed Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
    description: "Backend-focused engineer with 5+ years across VPN infrastructure, multi-tenant SaaS, fintech, healthtech, AI systems, and cloud automation.",
    url: "https://aasimshah.com/about",
    type: "profile",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://aasimshah.com/about#profile",
  name: "About Syed Aasim Shah",
  description: "Professional profile of Syed Aasim Shah, also known as Aasim Shah and Asim Shah, a senior full-stack developer in Islamabad, Pakistan.",
  url: "https://aasimshah.com/about",
  isPartOf: { "@id": "https://aasimshah.com/#website" },
  mainEntity: { "@id": "https://aasimshah.com/#person" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aasimshah.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://aasimshah.com/about" },
    ],
  },
};

const focusAreas = [
  "Solution architecture and backend API design",
  "Multi-tenant SaaS with isolated tenant data models",
  "Event-driven and WebSocket-based real-time systems",
  "Cloud provisioning, infrastructure automation, and observability",
  "Fintech payment integrations and subscription workflows",
  "AI/LLM systems, RAG pipelines, and semantic search",
];

export default function About() {
  return (
    <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="flex flex-col gap-[60px] w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] items-center p-[80px_0px]">
        <SectionHeading icon={briefcaseIconley} titleAs="h1" title="About Syed Aasim Shah" description="Senior Full-Stack Engineer and Solution Architect based in Islamabad, Pakistan." />

        <section className="w-full rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[24px] font-bold text-white">Engineering production systems end to end</h2>
          <p className="mt-4 text-[16px] font-medium leading-[1.7] text-light-gray-2">
            I am a backend-focused engineer with 5+ years of experience across networking infrastructure, multi-tenant SaaS, fintech payments, healthtech, and AI/LLM platforms. My work spans system design, APIs, databases, cloud and server provisioning, observability, infrastructure automation, and the React and Next.js applications that operate those systems.
          </p>
          <p className="mt-4 text-[16px] font-medium leading-[1.7] text-light-gray-2">
            My full name is Syed Aasim Shah, and my name is also commonly searched and spelled as Asim Shah. I am based in Islamabad and work with product teams and clients across Pakistan and internationally.
          </p>
          <p className="mt-4 text-[16px] font-medium leading-[1.7] text-light-gray-2">
            I currently help operate infrastructure covering 45+ VPN servers across 20+ regions for a consumer product serving approximately 2M mobile users. As Founder and CTO at CoreByte Studio, I have also taken 8+ SaaS and infrastructure products from architecture through launch and managed operations.
          </p>
        </section>

        <section className="grid w-full grid-cols-1 gap-[10px] sm:grid-cols-2">
          <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">Architecture focus</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] font-medium text-light-gray-2">
              {focusAreas.map((area) => <li key={area}>• {area}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
              <h2 className="text-[20px] font-bold text-white">Education</h2>
              <p className="mt-3 font-semibold text-light-gray-4">Bachelor of Computer Science</p>
              <p className="text-[15px] text-light-gray-2">AUP Peshawar · 2019–2023</p>
            </div>
            <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
              <h2 className="text-[20px] font-bold text-white">Languages</h2>
              <p className="mt-3 text-[15px] text-light-gray-2">English and Urdu — Fluent</p>
              <p className="text-[15px] text-light-gray-2">German — Basic</p>
            </div>
            <div className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
              <h2 className="text-[20px] font-bold text-white">CoreByte Studio</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-light-gray-2">Founder and CTO at a software studio building reliable web, mobile, backend, cloud, and AI products.</p>
              <a className="mt-3 inline-block font-semibold text-light-gray-4 hover:underline" href="https://corebytestudio.com" target="_blank" rel="noreferrer">corebytestudio.com</a>
            </div>
          </div>
        </section>

        <MyExperience />

        <section className="w-full rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">Certifications & training</h2>
          <div className="mt-4 flex flex-col gap-3 text-[15px] text-light-gray-2">
            <p><strong className="text-light-gray-4">2023 · Coursera</strong> — Advanced Backend Development using Node.js and Express.js</p>
            <p><strong className="text-light-gray-4">2021 · Udemy</strong> — Advanced MERN Stack course</p>
          </div>
        </section>
      </div>
    </div>
  );
}
