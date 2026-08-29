"use client";

import {
  initializePaddle,
  type Environments,
  type Paddle,
} from "@paddle/paddle-js";
import { ArrowRight, Check, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type BillingFrequency,
  PRICING_TIERS,
  type Tier,
} from "@/constants/pricing-tiers";
import { usePaddlePrices } from "@/hooks/use-paddle-prices";

interface PricingClientProps {
  clientToken: string;
  countryCode?: string;
  environment: Environments;
  paddleCustomerId?: string;
  userEmail?: string;
}

export function PricingClient({
  clientToken,
  countryCode,
  environment,
  paddleCustomerId,
  userEmail,
}: PricingClientProps) {
  const [frequency, setFrequency] = useState<BillingFrequency>("month");
  const [paddle, setPaddle] = useState<Paddle>();
  const [checkoutError, setCheckoutError] = useState<string>();
  const { prices, loading, error: priceError } = usePaddlePrices(
    paddle,
    countryCode,
  );

  useEffect(() => {
    let active = true;

    initializePaddle({
      token: clientToken,
      environment,
      ...(paddleCustomerId
        ? { pwCustomer: { id: paddleCustomerId } }
        : {}),
      eventCallback: (event) => {
        if (
          event.name === "checkout.error" ||
          event.name === "checkout.payment.error" ||
          event.name === "checkout.payment.failed"
        ) {
          setCheckoutError("Checkout could not continue. Please try again.");
        }
      },
    })
      .then((instance) => {
        if (active && instance) setPaddle(instance);
      })
      .catch(() => {
        if (active) setCheckoutError("Checkout is temporarily unavailable.");
      });

    return () => {
      active = false;
    };
  }, [clientToken, environment, paddleCustomerId]);

  function openCheckout(tier: Tier) {
    if (!paddle) return;

    setCheckoutError(undefined);
    try {
      paddle.Checkout.open({
        items: [{ priceId: tier.priceId[frequency], quantity: 1 }],
        ...(userEmail ? { customer: { email: userEmail } } : {}),
        settings: {
          displayMode: "overlay",
          variant: "one-page",
          successUrl: `${window.location.origin}/welcome`,
        },
      });
    } catch {
      setCheckoutError("Checkout is temporarily unavailable. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 py-20 lg:px-8 lg:py-28">
      <section className="mx-auto max-w-[720px] text-center">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-dark-gray-4 bg-very-dark-gray px-4 py-2 font-IBM_Plex_Mono text-xs uppercase tracking-[0.16em] text-light-gray-3">
          <Sparkles size={14} aria-hidden="true" />
          Development, on subscription
        </div>
        <h1 className="text-balance text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
          Senior engineering capacity, reserved for your product.
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-lg font-medium leading-8 text-light-gray-2">
          Choose a clear monthly capacity for product development,
          integrations, architecture, and infrastructure. Start with a
          seven-day free trial — Paddle shows the correct local price and
          handles secure billing.
        </p>
      </section>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div
          className="inline-flex rounded-xl border border-dark-gray-4 bg-very-dark-gray p-1"
          role="group"
          aria-label="Billing frequency"
        >
          {(["month", "year"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={frequency === value}
              onClick={() => setFrequency(value)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                frequency === value
                  ? "bg-white text-darkest-gray"
                  : "text-light-gray-2 hover:text-white"
              }`}
            >
              {value === "month" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-2 text-sm text-light-gray-2">
          <Globe2 size={15} aria-hidden="true" />
          {countryCode
            ? `Localized for ${countryCode}`
            : "Location detected securely by Paddle"}
        </p>
      </div>

      {(priceError || checkoutError) && (
        <div
          className="mx-auto mt-6 max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
          role="alert"
        >
          {priceError ?? checkoutError}
        </div>
      )}

      <section className="mt-12 grid gap-5 lg:grid-cols-3" aria-label="Pricing plans">
        {PRICING_TIERS.map((tier) => {
          const priceId = tier.priceId[frequency];
          const formattedTotal = prices[priceId];

          return (
            <article
              key={tier.name}
              className={`relative flex min-h-[520px] flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                tier.featured
                  ? "border-light-gray-1 bg-dark-gray-1 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                  : "border-dark-gray-3 bg-very-dark-gray"
              }`}
            >
              {tier.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 font-IBM_Plex_Mono text-[10px] font-bold uppercase tracking-[0.12em] text-darkest-gray">
                  Most popular
                </div>
              )}
              <p className="font-IBM_Plex_Mono text-xs font-semibold uppercase tracking-[0.18em] text-light-gray-2">
                {tier.name}
              </p>
              <div className="mt-5 flex min-h-14 items-end gap-2">
                {loading || !formattedTotal ? (
                  <div
                    className="h-12 w-36 animate-pulse rounded-lg bg-dark-gray-4"
                    aria-label="Loading price"
                  />
                ) : (
                  <>
                    <span className="text-5xl font-bold leading-none text-white">
                      {formattedTotal}
                    </span>
                    <span className="pb-1 text-sm text-light-gray-2">
                      /{frequency === "month" ? "month" : "year"}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-5 min-h-20 text-[15px] font-medium leading-6 text-light-gray-2">
                {tier.description}
              </p>
              <button
                type="button"
                onClick={() => openCheckout(tier)}
                disabled={!paddle || loading || !formattedTotal}
                className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-IBM_Plex_Mono text-sm font-semibold uppercase transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  tier.featured
                    ? "border-white bg-white text-darkest-gray hover:bg-light-gray-4"
                    : "border-dark-gray-4 bg-almost-black text-white hover:bg-dark-gray-4"
                }`}
              >
                Subscribe
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <div className="my-7 h-px bg-dark-gray-4" />
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm font-medium text-light-gray-3"
                  >
                    <span className="mt-0.5 rounded-full border border-dark-gray-6 p-0.5 text-light-gray-4">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-light-gray-2">
        <ShieldCheck size={16} aria-hidden="true" />
        Secure checkout and subscription management powered by Paddle.
      </p>
    </div>
  );
}
