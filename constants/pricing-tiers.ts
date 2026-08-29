export type BillingFrequency = "month" | "year";

export interface Tier {
  name: "Starter" | "Pro" | "Advanced";
  description: string;
  features: string[];
  featured?: boolean;
  priceId: Record<BillingFrequency, string>;
}

export const PRICING_TIERS: Tier[] = [
  {
    name: "Starter",
    description:
      "Reserved engineering time for established products that need dependable maintenance and steady improvements.",
    features: [
      "Up to 20 engineering hours per month",
      "1 active workstream",
      "MERN and Next.js features and bug fixes",
      "API, database, and integration updates",
      "Basic deployment and CI/CD assistance",
      "3–5 business day delivery for typical small tasks",
      "Async updates and a monthly delivery summary",
      "7-day free trial",
    ],
    priceId: {
      month: "pri_01m16y43rqwc767bybc0aqdxtd",
      year: "pri_01m16y445mk38671g904awasb2",
    },
  },
  {
    name: "Pro",
    description:
      "Consistent full-stack delivery for startups and growing products with an active feature roadmap.",
    features: [
      "Up to 50 engineering hours per month",
      "1 primary workstream plus expedited bug fixes",
      "Full-stack features, APIs, and database architecture",
      "Payments, AI, and real-time integrations",
      "CI/CD, staging, and production deployments",
      "2–3 business day delivery for typical small tasks",
      "Weekly progress call and release notes",
      "7-day free trial",
    ],
    featured: true,
    priceId: {
      month: "pri_01m16y44s1p6ysh7f2zr8vxc1q",
      year: "pri_01m16y451zc3a8r1v87t894zzc",
    },
  },
  {
    name: "Advanced",
    description:
      "Embedded senior engineering capacity for teams tackling architecture, scale, and complex product delivery.",
    features: [
      "Up to 100 engineering hours per month",
      "Up to 2 coordinated workstreams",
      "Multi-tenant SaaS and billing architecture",
      "Cloud, Linux, Docker, and infrastructure automation",
      "Monitoring, reliability, and scaling work",
      "Next-business-day response on priority items",
      "Direct Slack access and architecture reviews",
      "7-day free trial",
    ],
    priceId: {
      month: "pri_01m16y45nzxcqkmnj158sp35vj",
      year: "pri_01m16y45z0vrzbq70b7xrr6bsx",
    },
  },
];
