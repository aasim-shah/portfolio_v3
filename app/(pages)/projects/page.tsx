import type { Metadata } from "next";
import ProjectsCasebook from "@/components/ProjectsCasebook";

export const metadata: Metadata = {
  title: "Projects - SaaS, Infrastructure, AI & Backend Engineering",
  description:
    "Explore Aasim Shah's production work across VPN and location infrastructure, multi-tenant SaaS, restaurant and pharmacy systems, healthtech, AI chatbots, payments, and marketplaces.",
  alternates: { canonical: "https://aasimshah.com/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col gap-0 h-min overflow-hidden p-0 relative w-full flex-nowrap items-center justify-start">
      <div className="w-full max-w-[1120px] px-5 py-20 sm:px-8 lg:w-[88%] lg:px-0">
        <ProjectsCasebook />
      </div>
    </div>
  );
}
