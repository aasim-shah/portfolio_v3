"use client";

import { myShowCases } from "@/data";
import {
  ProjectGraphic,
  publicProjectPresentation,
} from "./ProjectsCasebook";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShowCase({
  isMore = true,
  showData = 2,
}: {
  isMore: boolean;
  showData: number;
}) {
  const projects = myShowCases.slice(0, Math.min(showData, 7));

  return (
    <section id="projects" className="w-full">
      <header className="pb-8">
        <p className="font-IBM_Plex_Mono text-[10px] uppercase tracking-[0.2em] text-light-gray-1">
          Selected engineering work
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.7fr] md:items-end">
          <h2 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[36px]">
            Production systems,
            <br />
            shown as they ship.
          </h2>
          <p className="text-sm leading-6 text-light-gray-2">
            Real interfaces, technical decisions, and operating scale.
          </p>
        </div>
      </header>

      <div className="border-t border-dashed border-dark-gray-6" />

      <div className="grid gap-5 border-b border-dark-gray-4 py-6 sm:grid-cols-[0.42fr_1fr_auto] sm:items-center">
        <div>
          <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.16em] text-light-gray-1">
            Leadership / Studio
          </p>
          <p className="mt-2 text-xs text-light-gray-2">Founder &amp; CTO</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">CoreByte Studio</h3>
          <p className="mt-2 text-xs leading-5 text-light-gray-2">
            Architecture, engineering direction, delivery, and production
            operations across web, mobile, cloud, and AI products.
          </p>
        </div>
        <Link
          href="https://corebytestudio.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-white transition-opacity hover:opacity-70"
        >
          Studio <ArrowUpRight size={14} />
        </Link>
      </div>

      <div>
        {projects.map((item, index) => {
          const presentation = publicProjectPresentation[item.id];

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-7 border-b border-dark-gray-4 py-9 xl:grid-cols-[minmax(0,1.28fr)_minmax(300px,0.72fr)] xl:items-stretch"
            >
              <ProjectGraphic
                title={item.title}
                href={item.link}
                projectId={item.id}
                presentation={presentation}
              />

              <div className="flex min-w-0 flex-col border-t border-dark-gray-4 pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.16em] text-light-gray-1">
                      {String(index + 1).padStart(2, "0")} / {presentation.eyebrow}
                    </p>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-light-gray-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5">
                  <ul className="space-y-1.5 border-y border-dark-gray-4 py-3 text-[10px] leading-5 text-light-gray-2">
                    {presentation.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="font-IBM_Plex_Mono text-[8px] uppercase tracking-widest text-light-gray-1">
                      {item.technologies}
                    </p>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-70"
                    >
                      View live <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {isMore && (
        <Link
          href="/projects"
          className="group mt-6 flex w-full items-center justify-between border-y border-dark-gray-4 py-4 text-sm font-medium text-white transition-colors hover:border-dark-gray-7"
        >
          <span>View the complete project casebook</span>
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </section>
  );
}
