import type { Environments } from "@paddle/paddle-js";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { PricingClient } from "@/components/Pricing/PricingClient";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getPaddleCollections } from "@/lib/db/paddle-store";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Flexible monthly and annual plans with a seven-day free trial.",
  alternates: { canonical: "https://aasimshah.com/pricing" },
};

export const dynamic = "force-dynamic";

function getPaddleConfig(): {
  clientToken: string;
  environment: Environments;
} {
  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENV;

  if (!clientToken) {
    throw new Error("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is required.");
  }

  if (environment !== "sandbox" && environment !== "production") {
    throw new Error(
      "NEXT_PUBLIC_PADDLE_ENV must be explicitly set to sandbox or production.",
    );
  }

  if (environment === "sandbox" && !clientToken.startsWith("test_")) {
    throw new Error("Sandbox Paddle configuration requires a test_ client token.");
  }

  return { clientToken, environment };
}

function normalizeCountryCode(value: string | null): string | undefined {
  if (!value) return undefined;
  const countryCode = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(countryCode) ? countryCode : undefined;
}

export default async function PricingPage() {
  const { clientToken, environment } = getPaddleConfig();
  const [requestHeaders, user] = await Promise.all([
    headers(),
    getAuthenticatedUser(),
  ]);
  const countryCode = normalizeCountryCode(
    requestHeaders.get("x-vercel-ip-country"),
  );
  let paddleCustomerId: string | undefined;

  if (user?.email) {
    const { customers } = await getPaddleCollections();
    const customer = await customers.findOne(
      {
        email: user.email.trim().toLowerCase(),
        paddle_environment: environment,
      },
      { projection: { customer_id: 1 } },
    );

    if (customer?.customer_id.startsWith("ctm_")) {
      paddleCustomerId = customer.customer_id;
    }
  }

  return (
    <PricingClient
      clientToken={clientToken}
      countryCode={countryCode}
      environment={environment}
      paddleCustomerId={paddleCustomerId}
      userEmail={user?.email}
    />
  );
}
