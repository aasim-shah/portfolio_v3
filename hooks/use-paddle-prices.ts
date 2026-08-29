"use client";

import type {
  Paddle,
  PricePreviewParams,
  PricePreviewResponse,
} from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { PRICING_TIERS } from "@/constants/pricing-tiers";

export type PaddlePrices = Record<string, string>;

const previewItems: PricePreviewParams["items"] = PRICING_TIERS.flatMap(
  (tier) =>
    ([tier.priceId.month, tier.priceId.year] as const).map((priceId) => ({
      priceId,
      quantity: 1,
    })),
);

function getFormattedTotals(response: PricePreviewResponse): PaddlePrices {
  return response.data.details.lineItems.reduce<PaddlePrices>((prices, item) => {
    prices[item.price.id] = item.formattedTotals.total;
    return prices;
  }, {});
}

export function usePaddlePrices(
  paddle: Paddle | undefined,
  countryCode?: string,
) {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!paddle) return;

    let active = true;
    const params: PricePreviewParams = {
      items: previewItems,
      ...(countryCode ? { address: { countryCode } } : {}),
    };

    setLoading(true);
    setError(undefined);

    paddle
      .PricePreview(params)
      .then((response) => {
        if (active) setPrices(getFormattedTotals(response));
      })
      .catch(() => {
        if (active) {
          setError("Localized prices are temporarily unavailable. Please try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [countryCode, paddle]);

  return { prices, loading, error };
}
