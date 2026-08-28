"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { starLig } from "@/app/assets/assets";
import { testimonials } from "@/data";

/**
 * Client testimonials. Renders nothing until `testimonials` in `data/index.tsx`
 * contains real, attributable quotes. Do not add placeholder names — fabricated
 * reviews are a policy and SEO risk. `Review` structured data is emitted only for
 * real entries.
 */
export default function Testimonials() {
  if (!testimonials.length) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewBody: t.description,
        author: { "@type": "Person", name: t.name },
        itemReviewed: { "@id": "https://aasimshah.com/#service" },
        ...(t.projectType ? { name: t.projectType } : {}),
      },
    })),
  };

  return (
    <div className="flex w-full flex-none flex-col items-start justify-start gap-[30px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="w-full flex-none">
        <SectionHeading
          icon={starLig}
          title="Words from clients"
          description="What people say about working with me."
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-[10px] lg:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.figure
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex h-full flex-col justify-between gap-5 rounded-xl border border-dark-gray-3 bg-very-dark-gray p-5"
          >
            <blockquote className="text-[15px] font-medium leading-[1.7] text-light-gray-2">
              &ldquo;{testimonial.description}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {testimonial.avatar ? (
                <span className="relative h-[42px] w-[42px] flex-none overflow-hidden rounded-lg border border-border-color bg-dark-gray-3">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name}`}
                    fill
                    sizes="42px"
                    className="object-cover object-center"
                  />
                </span>
              ) : null}
              <span className="flex flex-col">
                <span className="text-[15px] font-bold text-light-gray-4">
                  {testimonial.name}
                </span>
                <span className="text-[12px] font-medium text-light-gray-2">
                  {[testimonial.role, testimonial.company, testimonial.location]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
