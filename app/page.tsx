"use client"
import Hero from "@/components/Hero/Hero";
import MyExperience from "@/components/MyExperience/MyExperience";
import MyServices from "@/components/MyServices/MyServices";
import MyStack from "@/components/MyStack/MyStack";
import ShowCase from "@/components/ShowCase";
import Testimonials from "@/components/Testimonials";
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
            name: "Aasim Shah - Full Stack Developer Portfolio",
            description: "Portfolio of Aasim Shah, an experienced Full Stack Developer specializing in MERN Stack development, API development, and cloud solutions.",
            url: "https://aasimshah.com",
            mainEntity: {
              "@type": "Person",
              name: "Aasim Shah",
              jobTitle: "Full Stack Developer",
              description: "Experienced Full Stack Developer with 5+ years of experience, specializing in MERN Stack, API development, and cloud solutions. 40+ completed projects.",
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
      
      {/* Structured Data for Offers/Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Offer",
                position: 1,
                name: "MERN Stack Development",
                description: "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js.",
                price: "30",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                position: 2,
                name: "API Development",
                description: "Designing and developing RESTful and GraphQL APIs for seamless data communication.",
                price: "40",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                position: 3,
                name: "Cloud & DevOps",
                description: "Deploying and managing cloud-based applications with CI/CD pipelines, Docker, and AWS.",
                price: "80",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                position: 4,
                name: "Complete Project Development",
                description: "End-to-end development including website, admin dashboard, cross-platform mobile app, and AWS deployment.",
                price: "30",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
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
          <ShowCase showData={2} isMore />
          <Testimonials />
          <ChatbotWidget
            apiUrl="https://api.fyreway.com/api"
            apiKey="sk_Eul4xSznW_uisLy8wBi1k4Nfb6jaGXmB"
            primaryColor="#000ff"
            title="Chat with Aasim"
            subtitle="Ask me about Aasim shah"
            suggestedQuestions={[
              {id: "0", question: "Who is Aasim shah ?"},
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
