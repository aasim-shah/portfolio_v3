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
    description: "The essentials for launching a focused product or side project.",
    features: [
      "One production workspace",
      "Core product features",
      "Community support",
      "7-day free trial",
    ],
    priceId: {
      month: "pri_01m16hwhs90dw1n1ftcetpw9fc",
      year: "pri_01m16hwj3cqt7rjm90fz0jwq5w",
    },
  },
  {
    name: "Pro",
    description: "More capacity and support for growing products and teams.",
    features: [
      "Everything in Starter",
      "Unlimited workspaces",
      "Advanced product features",
      "Priority support",
      "7-day free trial",
    ],
    featured: true,
    priceId: {
      month: "pri_01m16hwjnszt8k8scb7vhs19pm",
      year: "pri_01m16hwjymwbtw2k2w4k4b27v7",
    },
  },
  {
    name: "Advanced",
    description: "High-touch delivery for established teams with bigger workloads.",
    features: [
      "Everything in Pro",
      "Advanced controls",
      "Higher usage limits",
      "Dedicated support",
      "7-day free trial",
    ],
    priceId: {
      month: "pri_01m16hwm8035ydfvcycvwxbejb",
      year: "pri_01m16hwmgn9wg4cyhah1w1pmnr",
    },
  },
];
