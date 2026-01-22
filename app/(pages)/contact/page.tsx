"use client"
import type React from "react"
import { emailIcon, questionMarkIcon } from "@/app/assets/assets"
import SectionHeading from "@/components/SectionHeading"
import { faqData } from "@/data"
import Button from "@/components/ui/Button"
import { Calendar1, Mail } from "lucide-react"
import ContactForm from "@/components/ContactForm/ContactForm"
import FAQ from "@/components/FAQ/FAQ"

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
              jobTitle: "Full Stack Developer",
              email: "contact@aasimshah.com",
              url: "https://aasimshah.com",
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.upwork.com/freelancers/aasimshah",
                "https://www.fiverr.com/users/aaasimmshah",
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

      <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
        <div className="flex flex-col gap-[60px] w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] items-center p-[80px_0px]">
          <SectionHeading
            icon={emailIcon}
            title="I Love to hear from you."
            description="Connect with Me Today. Let's Create Something Amazing Together!"
          >
            <div className="w-full ">
              <div className="flex  items-start flex-none flex-nowrap  w-full gap-5 h-min justify-start p-0 relative">
                <Button position='left' className="w-min" icon={<Mail size={18} />} title='Email Me' />
                <Button position='left' className="w-min" icon={<Calendar1 size={18} />} title='Schedule Call' />
              </div>
            </div>
          </SectionHeading>

          <ContactForm />

          <SectionHeading
            icon={questionMarkIcon}
            title="Common Queries"
            description="Get Answers to Common Queries. Your Questions, Addressed Simply."
          />

          <FAQ data={faqData} />

        </div>
      </div>
    </>
  )
}

