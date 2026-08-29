import type { Metadata } from "next";
import { faqData } from "@/data";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm/ContactForm";
import FAQ from "@/components/FAQ/FAQ";
import ScheduleButton from "@/components/ui/ScheduleButton";

export const metadata: Metadata = {
  title: "Contact Aasim Shah - Hire a Full-Stack Developer in Pakistan",
  description:
    "Get in touch with Syed Aasim Shah (Aasim Shah / Asim Shah), a senior full-stack developer in Islamabad, Pakistan, for SaaS, backend, and cloud infrastructure projects.",
  alternates: { canonical: "https://aasimshah.com/contact" },
  openGraph: {
    title: "Contact Aasim Shah - Hire a Full-Stack Developer in Pakistan",
    description:
      "Get in touch with Syed Aasim Shah for SaaS, backend, and cloud infrastructure projects.",
    url: "https://aasimshah.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Aasim Shah",
            description: "Get in touch with Aasim Shah for web development projects and consultations.",
            url: "https://aasimshah.com/contact",
            mainEntity: {
              "@type": "Person",
              name: "Aasim Shah",
              jobTitle: "Senior Full-Stack Engineer & Solution Architect",
              email: "contact@aasimshah.com",
              url: "https://aasimshah.com",
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.linkedin.com/in/aasimshah/",
                "https://www.instagram.com/themistyframes_/",
              ],
            },
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
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
                name: "Contact",
                item: "https://aasimshah.com/contact",
              },
            ],
          }),
        }}
      />

      <div className="w-full px-5 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[960px] py-12 sm:py-16">
          <header className="pb-12 sm:pb-14">
            <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.18em] text-light-gray-1">
              Contact
            </p>
            <h1 className="mt-5 text-[40px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[52px]">
              Let&apos;s work together.
            </h1>
            <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-light-gray-2">
              Tell me what you&apos;re building, where you&apos;re stuck, and what a
              successful outcome looks like.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:contact@aasimshah.com"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Email me <Mail size={14} />
              </a>
              <ScheduleButton label="Schedule a call" />
              <a
                href="/Aasim_Shah_Senior_FSE.pdf"
                target="_blank"
                rel="noreferrer"
                className="ml-1 inline-flex min-h-11 items-center gap-2 px-2 text-xs font-medium text-light-gray-2 transition-colors hover:text-white"
              >
                Résumé <ArrowUpRight size={13} />
              </a>
            </div>
          </header>

          <section className="border-t border-dark-gray-4 py-12 sm:py-14">
            <ContactForm />
          </section>

          <section className="border-t border-dark-gray-4 pt-12 sm:pt-14">
            <div className="pb-8">
              <h2 className="text-[26px] font-semibold tracking-[-0.035em] text-white">
                Common questions
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-light-gray-2">
                A few useful details before we start.
              </p>
            </div>
            <FAQ data={faqData} />
          </section>
        </div>
      </div>
    </>
  )
}
