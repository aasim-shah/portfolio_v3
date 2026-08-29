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
      "One development request in progress at a time. For solo founders and small products that need steady, ongoing help.",
    features: [
      "1 active request at a time",
      "Unlimited requests, queued one by one",
      "~3–5 business day average turnaround",
      "MERN stack, APIs, and integrations",
      "Async updates via email or Slack",
      "Pause or cancel anytime",
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
      "Two requests moving in parallel with priority turnaround. For growing products that need consistent development throughput.",
    features: [
      "Everything in Starter",
      "2 active requests in parallel",
      "~2–3 business day average turnaround",
      "Priority queue placement",
      "Weekly progress call",
      "Cloud infrastructure & DevOps support",
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
      "Dedicated capacity and direct access. For teams that need a senior engineer embedded in their roadmap.",
    features: [
      "Everything in Pro",
      "3+ active requests / dedicated hours",
      "Next-business-day turnaround on priority items",
      "Direct Slack channel with faster response SLA",
      "Architecture & technical leadership input",
      "SaaS product development support",
      "7-day free trial",
    ],
    priceId: {
      month: "pri_01m16y45nzxcqkmnj158sp35vj",
      year: "pri_01m16y45z0vrzbq70b7xrr6bsx",
    },
  },
];
