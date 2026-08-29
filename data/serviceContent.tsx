export type ServiceContent = {
  tagline: string;
  overview: string[];
  whatsIncluded: string[];
  stack: string[];
  stats: { value: string; label: string }[];
  /** Slugs into myShowCases — real, matching case studies for this service. */
  relatedProjectSlugs: string[];
};

/**
 * Expanded, per-service detail content for /services/[slug]. Facts here are
 * paraphrases of what's already established in data/index.tsx (myServicesPlans,
 * experience, project data) — nothing invented.
 */
export const serviceContent: Record<string, ServiceContent> = {
  "mern-stack-development": {
    tagline: "Full-Stack Development",
    overview: [
      "I design and build production web applications end to end using the MERN stack — MongoDB, Express, React, and Node.js — along with Next.js and TypeScript for the application layer. This covers everything from the initial data model and API design through the user-facing interface and deployment.",
      "5+ years of this work has gone into real production systems: multi-tenant SaaS platforms, admin dashboards, customer-facing apps, and the backend APIs that power them, not isolated demos or templates.",
    ],
    whatsIncluded: [
      "Frontend builds with React and Next.js (App Router, server components)",
      "Backend APIs with Node.js and Express",
      "Database design with MongoDB, MySQL, and PostgreSQL",
      "TypeScript across the stack for type-safe, maintainable code",
      "Deployment and handover, or ongoing managed operations",
    ],
    stack: ["React", "Next.js", "Node.js", "Express.js", "TypeScript", "MongoDB", "MySQL"],
    stats: [
      { value: "5+ years", label: "MERN stack production experience" },
      { value: "8+", label: "Products taken from architecture through launch" },
    ],
    relatedProjectSlugs: ["getrestro", "runmypharmacy", "feedwink"],
  },
  "api-development-integration": {
    tagline: "Backend & Integrations",
    overview: [
      "I design and build secure REST APIs and the database architecture behind them, along with real-time systems and third-party integrations. This includes payment gateways (Stripe, MAIB), AI/LLM APIs (OpenAI), and real-time communication (Socket.io).",
      "The focus is on API design that stays decoupled from any one provider, so swapping or adding a payment processor or integration later doesn't mean rewriting the domain logic — an approach documented in the payment-gateway abstraction work covering Stripe and MAIB.",
    ],
    whatsIncluded: [
      "REST API design and database architecture",
      "Payment gateway integration (Stripe, MAIB, and regional providers)",
      "AI/LLM API integration and RAG pipelines",
      "Real-time systems with Socket.io and WebSockets",
      "Authentication, authorization, and API security",
    ],
    stack: ["Node.js", "Express.js", "Socket.io", "Stripe", "OpenAI API", "MongoDB", "PostgreSQL"],
    stats: [
      { value: "5+ years", label: "API and backend architecture experience" },
      { value: "Multiple", label: "Payment gateways integrated in production (Stripe, MAIB)" },
    ],
    relatedProjectSlugs: ["fyrebot", "feedwink", "getrestro"],
  },
  "cloud-infrastructure-devops": {
    tagline: "Cloud & DevOps",
    overview: [
      "I automate Linux server infrastructure, CI/CD pipelines, and observability — currently operating 45+ production servers across 20+ regions for a consumer VPN product serving approximately 2M users. This is hands-on infrastructure work: provisioning, WireGuard configuration, monitoring, and incident response, not just writing deployment scripts.",
      "The same automation approach — turning a manual, error-prone setup into a repeatable, monitored process — applies whether the infrastructure is a handful of servers or a multi-region fleet.",
    ],
    whatsIncluded: [
      "Server provisioning and lifecycle automation across AWS, DigitalOcean, Contabo, and Gthost",
      "WireGuard VPN infrastructure and network automation",
      "CI/CD pipeline setup and deployment automation",
      "Observability with Grafana and Prometheus",
      "Managed operations: incident response, scaling, and ongoing maintenance",
    ],
    stack: ["Linux", "WireGuard", "Docker", "Grafana", "Prometheus", "AWS", "Bash"],
    stats: [
      { value: "45+", label: "Production servers under active management" },
      { value: "20+", label: "Global regions" },
      { value: "~2M", label: "End users served by this infrastructure" },
    ],
    relatedProjectSlugs: ["fyreway", "eeagle-vpn"],
  },
  "saas-product-development": {
    tagline: "SaaS Product Development",
    overview: [
      "I take multi-tenant SaaS products from architecture through launch and, where needed, ongoing managed operations. This covers the full scope: isolated tenant data models, admin dashboards, billing, and the mobile or web backends that support them.",
      "8+ products have gone through this process, spanning restaurant and pharmacy management systems, location and mapping infrastructure, and AI-powered chatbots — each with its own tenancy, data-isolation, and scaling requirements.",
    ],
    whatsIncluded: [
      "Multi-tenant architecture and data-isolation design",
      "Admin dashboards and role-based access control",
      "Billing and subscription workflows",
      "Mobile app backends and Chrome extension integrations",
      "AI/RAG features where the product calls for them",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "TypeScript", "Stripe", "Docker"],
    stats: [
      { value: "8+", label: "SaaS and infrastructure products launched" },
      { value: "Architecture → launch", label: "Full-scope engagement model" },
    ],
    relatedProjectSlugs: ["getrestro", "runmypharmacy", "fyremaps"],
  },
};
