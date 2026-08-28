"use client";

import { AvatarMe, handGif } from "@/app/assets/assets";
import { getCalApi } from "@calcom/embed-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Download,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const metrics = [
  { value: "5+", label: "Years of experience" },
  { value: "8+", label: "Products launched" },
  { value: "5", label: "Product domains" },
];

const coreStack = [
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Docker",
  "WireGuard",
  "Grafana",
  "Next.js",
];

export default function Hero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="relative w-full">
      <section className="grid gap-6 border-b border-border-color py-4 sm:py-8 lg:min-h-[520px] lg:grid-cols-[0.55fr_1.45fr] lg:items-center lg:gap-12 lg:py-10">
        <div className="relative flex min-h-[260px] items-start justify-center lg:min-h-[280px] ">
          <Image
            src={AvatarMe}
            alt="Illustrated portrait of Syed Aasim Shah"
            priority
            className="h-auto w-full max-w-[230px] object-contain object-top opacity-95 sm:max-w-[260px] lg:max-w-[380px]"
          />
        </div>

        <div className="py-1 lg:py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex items-center gap-3 text-light-gray-2">
              <Image
                src={handGif}
                alt="Waving hand"
                width={22}
                height={22}
                className="waveHand h-[22px] w-[22px]"
              />
              <p className="text-[20px] font-medium tracking-[-0.02em]">
                Hello, I am
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1 text-xs sm:text-right">
              <span className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.16em] text-light-gray-1">
                Founder &amp; CTO
              </span>
              <span className="text-dark-gray-8">/</span>
              <a
                href="https://corebytestudio.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-light-gray-4 transition-opacity hover:opacity-70"
              >
                CoreByte Studio <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <h1 className="mt-7 text-[42px] font-semibold leading-none tracking-[-0.055em] text-white sm:text-[50px] xl:whitespace-nowrap xl:text-[58px]">
            Syed Aasim Shah
            <span className="mt-3 block text-[17px] font-medium leading-[1.35] tracking-[-0.02em] text-light-gray-3 sm:text-[19px]">
              Senior Full-Stack Developer &amp; Solution Architect in Pakistan
            </span>
          </h1>

          <p className="mt-8 max-w-[640px] text-[16px] leading-[1.75] text-light-gray-2 sm:text-[17px]">
            I architect and ship dependable digital products—from multi-tenant
            SaaS and cloud infrastructure to fintech, healthtech, and applied
            AI.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="mailto:contact@aasimshah.com"
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span>Let&apos;s work together</span>
              <ArrowUpRight size={15} />
            </a>

            <button
              type="button"
              data-cal-namespace="15min"
              data-cal-link="aasim-shah/15min"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-dark-gray-7 px-6 text-[13px] font-medium text-light-gray-3 transition-colors duration-300 hover:border-medium-gray hover:bg-very-dark-gray"
            >
              <span>Book a call</span>
              <CalendarDays size={15} />
            </button>

            <a
              href="#projects"
              className="inline-flex min-h-12 items-center gap-2 px-2 text-xs font-medium text-light-gray-2 transition-colors hover:text-white sm:ml-2"
            >
              Explore work <ArrowDownRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="grid items-center gap-8 border-b border-border-color py-7 lg:grid-cols-[170px_1fr]">
        <div>
          <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.18em] text-light-gray-1">
            Career at a glance
          </p>
          <a
            href="/Aasim_Shah_Senior_FSE.pdf"
            download="Aasim_Shah_Senior_FSE.pdf"
            className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-dark-gray-6 px-4 text-[10px] font-medium text-light-gray-3 transition-colors duration-300 hover:border-medium-gray hover:bg-very-dark-gray hover:text-white"
          >
            Download résumé
            <Download size={12} />
          </a>
        </div>

        <div className="grid grid-cols-2 items-center gap-y-6 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong className="text-[28px]  font-semibold leading-none tracking-[-0.045em] text-white">
                {metric.value}
              </strong>
              <p className="mt-2 font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.14em] text-light-gray-1">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-5 py-5">
        <p className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.18em] text-medium-gray">
          Core stack
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.13em] text-light-gray-1">
          {coreStack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
