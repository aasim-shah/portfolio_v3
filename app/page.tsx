"use client"
import Hero from "@/components/Hero/Hero";
import MyExperience from "@/components/MyExperience/MyExperience";
import MyServices from "@/components/MyServices/MyServices";
import MyStack from "@/components/MyStack/MyStack";
import ShowCase from "@/components/ShowCase";
import ChatbotWidget from "fyrebot-widget";
import React from "react";

export default function Home() {
  return (
    <>
      {/* Structured Data for WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
            description: "Portfolio of Aasim Shah, a backend-focused Senior Full-Stack Engineer and Solution Architect specializing in production SaaS, infrastructure, fintech, and AI systems.",
            url: "https://aasimshah.com",
            mainEntity: {
              "@type": "Person",
              name: "Aasim Shah",
              jobTitle: "Senior Full-Stack Engineer & Solution Architect",
              description: "Backend-focused engineer with 5+ years of experience across multi-tenant SaaS, VPN infrastructure, fintech payments, healthtech, and AI systems.",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://aasimshah.com",
                },
              ],
            },
          }),
        }}
      />
      
      {/* Structured Data for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "Full-Stack Product Engineering",
                description: "Production applications using Node.js, React, Next.js, TypeScript, and relational and document databases.",
              },
              {
                "@type": "Service",
                position: 2,
                name: "API Development",
                description: "REST APIs, database architecture, real-time systems, payment gateways, and AI integrations.",
              },
              {
                "@type": "Service",
                position: 3,
                name: "Cloud & DevOps",
                description: "Linux and WireGuard automation, CI/CD, observability, and multi-cloud deployments.",
              },
              {
                "@type": "Service",
                position: 4,
                name: "SaaS Product Development",
                description: "Multi-tenant SaaS delivery from system design through launch and managed operations.",
              },
            ],
          }),
        }}
      />

      <div className="flex lg:flex-1 flex-col gap-0 h-min px-5 overflow-hidden p-0 relative lg:px-0 w-full flex-wrap lg:flex-nowrap items-center justify-start">
        <div className="gap-[100px] flex-col max-w-full w-full lg:max-w-[750px] lg:w-[80%] lg:flex-nowrap flex items-center flex-none h-min justify-center  relative overflow-hidden lg:overflow-visible p-[80px_0px]  ">
          <Hero />
          <MyExperience />
          <MyStack />
          <MyServices />
          <ShowCase showData={4} isMore />
          <ChatbotWidget
            apiUrl="https://api.fyreway.com/api"
            apiKey="sk_Eul4xSznW_uisLy8wBi1k4Nfb6jaGXmB"
            primaryColor="#000ff"
            title="Chat with Aasim"
            subtitle="Ask about my experience and projects"
            suggestedQuestions={[
              {id: "0", question: "Who is Aasim Shah?"},
              {id: "1", question: "What services do you offer?"},
              {id: "2", question: "Can you tell me about your experience?"},
              {id: "3", question: "What technologies do you specialize in?"},
            ]}
          />
        </div>
      </div>
    </>
  );
}
