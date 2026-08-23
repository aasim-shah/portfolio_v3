import { myShowCases } from "@/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type PublicProjectPresentation = {
  screenshot: string;
  eyebrow: string;
  cropLabels: [string, string];
  features: string[];
  evidenceLabel: string;
  evidenceValue?: string;
  evidenceCaption?: string;
  evidenceItems?: string[];
  secondaryLabel?: string;
  secondaryValue?: string;
  secondaryCaption?: string;
};

export const publicProjectPresentation: Record<number, PublicProjectPresentation> = {
  1: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-fyreway/fyreway.png",
    eyebrow: "Infrastructure",
    cropLabels: ["Infrastructure", "Monitoring"],
    features: [
      "Automated server provisioning",
      "Multi-cloud lifecycle management",
      "SDKs and fleet monitoring",
    ],
    evidenceLabel: "Deployment",
    evidenceItems: ["API", "Cloud provisioner", "WireGuard node"],
    secondaryLabel: "Operating scope",
    secondaryValue: "20+",
    secondaryCaption: "global locations",
  },
  2: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-eeagle/eeagle.png",
    eyebrow: "VPN Platform",
    cropLabels: ["Client experience", "Platform"],
    features: [
      "45+ server production fleet",
      "20+ global regions",
      "Fleet-wide observability",
    ],
    evidenceLabel: "Users",
    evidenceValue: "~2M",
    evidenceCaption: "mobile users",
    secondaryLabel: "Fleet",
    secondaryValue: "45+",
    secondaryCaption: "servers · 20+ regions",
  },
  3: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-fyremaps/fyremaps.png",
    eyebrow: "Location Infrastructure",
    cropLabels: ["Search", "Route detail"],
    features: [
      "Search and geocoding",
      "Routing and navigation",
      "Geofencing APIs",
    ],
    evidenceLabel: "One stack",
    evidenceItems: ["Search", "Route", "Navigate", "Geofence"],
  },
  4: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-getrestro/getrestro.png",
    eyebrow: "Restaurant SaaS",
    cropLabels: ["Dashboard", "Order flow"],
    features: [
      "POS and kitchen display",
      "Inventory and staff workflows",
      "Multi-tenant analytics",
    ],
    evidenceLabel: "Order flow",
    evidenceItems: ["01 / Ordered", "02 / Kitchen", "03 / Ready", "04 / Served"],
  },
  5: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-runmypharmacy/runmypharmacy.png",
    eyebrow: "Pharmacy SaaS",
    cropLabels: ["Checkout", "Inventory"],
    features: [
      "Barcode-speed checkout",
      "Batch and expiry tracking",
      "Real-time reporting",
    ],
    evidenceLabel: "Businesses",
    evidenceValue: "30+",
    evidenceCaption: "production operators",
    secondaryLabel: "Control",
    secondaryCaption: "Batch · Expiry · Inventory",
  },
  6: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-feedwink/feedwink.png",
    eyebrow: "AI Healthtech",
    cropLabels: ["Care log", "Insights"],
    features: [
      "Feed and sleep tracking",
      "Shared caregiver access",
      "AI-assisted insights",
    ],
    evidenceLabel: "Daily care",
    evidenceItems: ["Feeds", "Sleep", "Growth", "Milestones"],
  },
  7: {
    screenshot:
      "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/99cba361-b43c-4184-80bb-d4cfbbf19a5c/content-assets/project-screenshot-fyrebot/fyrebot.png",
    eyebrow: "AI SaaS",
    cropLabels: ["Knowledge", "Widget"],
    features: [
      "Private knowledge grounding",
      "Multi-tenant APIs",
      "Embeddable web SDK",
    ],
    evidenceLabel: "RAG pipeline",
    evidenceItems: ["Private data", "Vector context", "Grounded answer"],
  },
};

function VisualLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 bg-black/80 px-2 py-1.5 font-IBM_Plex_Mono text-[7px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
      {children}
    </span>
  );
}

function DiagramTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.16em] text-light-gray-1">
      {children}
    </p>
  );
}

function ProjectDiagram({
  projectId,
  project,
}: {
  projectId: number;
  project: PublicProjectPresentation;
}) {
  const shell =
    "relative min-h-[174px] overflow-hidden border border-dark-gray-4 bg-very-dark-gray p-4";

  if (projectId === 1) {
    return (
      <div className={shell}>
        <DiagramTitle>Provisioning sequence</DiagramTitle>
        <div className="mt-6 flex items-center gap-2 font-IBM_Plex_Mono text-[7px] text-light-gray-3">
          {['API', 'CLOUD', 'NODE'].map((step, index) => (
            <div key={step} className="contents">
              <span className="border border-dark-gray-7 px-2 py-2">{step}</span>
              {index < 2 && <span className="h-px min-w-2 flex-1 bg-dark-gray-7" />}
            </div>
          ))}
        </div>
        <strong className="mt-6 block text-[26px] font-semibold tracking-[-0.05em] text-white">
          20+
        </strong>
        <p className="mt-1 font-IBM_Plex_Mono text-[7px] uppercase tracking-widest text-light-gray-1">
          Global locations
        </p>
      </div>
    );
  }

  if (projectId === 2) {
    return (
      <div className={shell}>
        <DiagramTitle>Fleet topology</DiagramTitle>
        <div className="relative mt-3 h-16">
          <span className="absolute left-[12%] top-8 h-px w-[34%] -rotate-12 bg-dark-gray-7" />
          <span className="absolute left-[43%] top-7 h-px w-[35%] rotate-[18deg] bg-dark-gray-7" />
          <span className="absolute left-[34%] top-10 h-px w-[31%] rotate-[150deg] bg-dark-gray-7" />
          {[
            "left-[8%] top-7",
            "left-[43%] top-2",
            "right-[12%] top-10",
            "left-[36%] bottom-1",
          ].map((position) => (
            <i
              key={position}
              className={`absolute h-2 w-2 rounded-full border border-light-gray-1 bg-very-dark-gray ${position}`}
            />
          ))}
        </div>
        <div className="flex gap-8">
          <div><strong className="text-xl text-white">45+</strong><p className="font-IBM_Plex_Mono text-[7px] uppercase tracking-widest text-light-gray-1">Servers</p></div>
          <div><strong className="text-xl text-white">20+</strong><p className="font-IBM_Plex_Mono text-[7px] uppercase tracking-widest text-light-gray-1">Regions</p></div>
        </div>
      </div>
    );
  }

  if (projectId === 3) {
    return (
      <div className={shell}>
        <DiagramTitle>Route / geofence geometry</DiagramTitle>
        <div
          className="relative mt-4 h-[82px] border border-dark-gray-6"
          style={{
            backgroundImage:
              "linear-gradient(#1d1d20 1px, transparent 1px), linear-gradient(90deg, #1d1d20 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <span className="absolute left-4 top-[58px] h-px w-[125px] origin-left -rotate-[18deg] bg-light-gray-1" />
          <i className="absolute left-3 top-[54px] h-2 w-2 rounded-full border border-light-gray-3 bg-very-dark-gray" />
          <i className="absolute right-5 top-3 h-2 w-2 rounded-full border border-light-gray-3 bg-very-dark-gray" />
        </div>
        <p className="mt-3 font-IBM_Plex_Mono text-[7px] uppercase tracking-widest text-light-gray-1">
          Search → Route → Navigate
        </p>
      </div>
    );
  }

  if (projectId === 4) {
    return (
      <div className={shell}>
        <DiagramTitle>Order lifecycle</DiagramTitle>
        <div className="mt-4 divide-y divide-dark-gray-6">
          {project.evidenceItems?.map((item) => (
            <p key={item} className="py-2 font-IBM_Plex_Mono text-[8px] text-light-gray-3">
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (projectId === 5) {
    return (
      <div className={shell}>
        <DiagramTitle>Inventory control</DiagramTitle>
        <div className="mt-5 flex h-16 items-end gap-2">
          {[32, 58, 84, 66, 96].map((height) => (
            <i
              key={height}
              className="flex-1 border border-dark-gray-7 bg-dark-gray-3"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-IBM_Plex_Mono text-[7px] uppercase tracking-widest text-light-gray-1">
          <span>Stock</span><span>Batch</span><span>Expiry</span>
        </div>
        <p className="mt-4 text-sm font-semibold text-white">30+ <span className="text-[9px] font-normal text-light-gray-2">businesses</span></p>
      </div>
    );
  }

  if (projectId === 6) {
    return (
      <div className={shell}>
        <DiagramTitle>Shared care timeline</DiagramTitle>
        <div className="mt-5 border-l border-dark-gray-7 pl-4">
          {["07:30 / Feeding", "10:10 / Sleep", "13:45 / Caregiver", "18:20 / Insight"].map((event) => (
            <p key={event} className="relative mb-3 font-IBM_Plex_Mono text-[7px] text-light-gray-3 before:absolute before:-left-[20px] before:top-0.5 before:h-2 before:w-2 before:rounded-full before:border before:border-light-gray-1 before:bg-very-dark-gray">
              {event}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <DiagramTitle>Grounded answer pipeline</DiagramTitle>
      <div className="mt-4 space-y-1.5 text-center font-IBM_Plex_Mono text-[7px] text-light-gray-3">
        {project.evidenceItems?.map((item, index) => (
          <div key={item}>
            <p className="border border-dark-gray-7 px-3 py-2 uppercase tracking-widest">{item}</p>
            {index < (project.evidenceItems?.length ?? 0) - 1 && <span className="text-dark-gray-9">↓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectGraphic({
  title,
  href,
  projectId,
  presentation,
}: {
  title: string;
  href: string;
  projectId: number;
  presentation: PublicProjectPresentation;
}) {
  const proofValue =
    presentation.evidenceValue ?? presentation.secondaryValue ?? "Live";
  const proofLabel =
    presentation.evidenceCaption ??
    presentation.secondaryCaption ??
    presentation.evidenceLabel;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative block h-[300px] self-stretch overflow-hidden rounded-2xl bg-transparent sm:aspect-[16/9] sm:h-auto xl:aspect-auto xl:h-full"
    >
      <div className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={presentation.screenshot}
          alt={`${title} production interface`}
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,.94) 0%, rgba(5,5,5,.88) 30%, rgba(5,5,5,.68) 48%, rgba(5,5,5,.2) 76%, rgba(5,5,5,.05) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <div>
          <p className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.18em] text-light-gray-2">
            {String(projectId).padStart(2, "0")} / {presentation.eyebrow}
          </p>
        </div>

        <div className="max-w-[66%] sm:max-w-[58%]">
          <p className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.16em] text-light-gray-1">
            Selected system
          </p>
          <h3 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.045em] text-white sm:text-[38px]">
            {title}
          </h3>
          <p className="mt-4 max-w-[310px] text-[11px] leading-5 text-light-gray-3 sm:text-xs">
            {presentation.features[0]}
          </p>

          <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3 border-t border-white/15 pt-4">
            <div>
              <strong className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
                {proofValue}
              </strong>
              <p className="mt-1 font-IBM_Plex_Mono text-[7px] uppercase tracking-[0.14em] text-light-gray-1">
                {proofLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 text-[10px] font-medium text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:bottom-7 sm:right-7">
        Explore system <ArrowUpRight size={12} />
      </span>
    </Link>
  );
}

export default function ProjectsCasebook() {
  const publicProjects = myShowCases.slice(0, 7);
  const privateProjects = myShowCases.slice(7);

  return (
    <section className="w-full">
      <header className="pb-12">
        <p className="font-IBM_Plex_Mono text-[10px] uppercase tracking-[0.2em] text-light-gray-1">
          Selected engineering work / 2021—Present
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-[1fr_0.56fr] md:items-end">
          <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-[54px]">
            Systems I designed,
            <br />
            built, and shipped.
          </h1>
          <p className="max-w-md text-[15px] leading-7 text-light-gray-2">
            A concise record of production interfaces, technical decisions,
            and operating scale.
          </p>
        </div>
      </header>

      <div className="border-t border-dashed border-dark-gray-6" />

      <section className="grid gap-7 py-10 md:grid-cols-[0.34fr_1fr_0.56fr] md:items-start">
        <div>
          <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.18em] text-light-gray-1">
            Leadership / Studio
          </p>
          <p className="mt-3 text-xs text-light-gray-2">Founder &amp; CTO</p>
        </div>
        <div>
          <h2 className="text-[28px] font-semibold tracking-[-0.035em] text-white">
            CoreByte Studio
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-light-gray-2">
            I lead architecture, engineering direction, delivery, and
            production operations for a software studio building reliable web,
            mobile, backend, cloud, and AI products.
          </p>
          <Link
            href="https://corebytestudio.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white transition-opacity hover:opacity-70"
          >
            Visit the studio <ArrowUpRight size={14} />
          </Link>
        </div>
        <ul className="space-y-3 border-t border-dark-gray-4 pt-4 text-[11px] leading-5 text-light-gray-2 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <li>• Product and system architecture</li>
          <li>• Engineering and delivery direction</li>
          <li>• Cloud, DevOps, and managed operations</li>
        </ul>
      </section>

      <div className="border-t border-dark-gray-4" />

      {publicProjects.map((item, index) => {
        const presentation = publicProjectPresentation[item.id];

        return (
          <article
            key={item.id}
            className="grid gap-8 border-b border-dark-gray-4 py-9 xl:grid-cols-[minmax(0,1.42fr)_minmax(300px,0.58fr)] xl:items-stretch"
          >
            <ProjectGraphic
              title={item.title}
              href={item.link}
              projectId={item.id}
              presentation={presentation}
            />

            <div className="flex min-w-0 flex-col border-t border-dark-gray-4 pt-6 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.16em] text-light-gray-1">
                    {String(index + 1).padStart(2, "0")} / {presentation.eyebrow}
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <h2 className="mt-5 text-[30px] font-semibold tracking-[-0.035em] text-white">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-md text-[13px] leading-6 text-light-gray-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-6">
                <p className="font-IBM_Plex_Mono text-[9px] uppercase leading-5 tracking-widest text-light-gray-1">
                  {item.technologies}
                </p>
                <ul className="mt-5 space-y-2 border-y border-dark-gray-4 py-4 text-[11px] leading-5 text-light-gray-2">
                  {presentation.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white transition-opacity hover:opacity-70"
                >
                  View live <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        );
      })}

      <section className="py-14">
        <div className="grid gap-8 md:grid-cols-[0.48fr_1.52fr]">
          <div>
            <p className="font-IBM_Plex_Mono text-[10px] uppercase tracking-widest text-light-gray-1">
              Private work
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Selected systems
            </h2>
            <p className="mt-4 text-sm leading-6 text-light-gray-2">
              Scope and outcomes only. No fabricated product imagery.
            </p>
          </div>
          <div className="divide-y divide-dark-gray-4 border-y border-dark-gray-4">
            {privateProjects.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 py-5 sm:grid-cols-[0.34fr_1fr_auto] sm:items-center"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-light-gray-2">
                  {item.description}
                </p>
                <span className="font-IBM_Plex_Mono text-[9px] uppercase text-light-gray-1">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
