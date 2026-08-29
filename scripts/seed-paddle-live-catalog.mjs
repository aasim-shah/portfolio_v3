import fs from "node:fs";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

function readEnvValue(name) {
  const contents = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const match = contents.match(new RegExp(`^${name}=(.*)$`, "m"));
  if (!match) throw new Error(`${name} is missing from .env.local`);

  const value = match[1].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

const paddle = new Paddle(readEnvValue("PADDLE_LIVE_API_KEY"), {
  environment: Environment.production,
});

const trialPeriod = {
  interval: "day",
  frequency: 7,
  requiresPaymentMethod: true,
};

const plans = [
  {
    name: "Starter",
    description: "Starter subscription plan",
    monthly: {
      usd: "1000",
      gbp: "700",
      eur: "800",
      aud: "1400",
    },
    annual: {
      usd: "10000",
      gbp: "7000",
      eur: "8000",
      aud: "14000",
    },
  },
  {
    name: "Pro",
    description: "Pro subscription plan",
    monthly: {
      usd: "4000",
      gbp: "2800",
      eur: "3200",
      aud: "5600",
    },
    annual: {
      usd: "40000",
      gbp: "28000",
      eur: "32000",
      aud: "56000",
    },
  },
  {
    name: "Advanced",
    description: "Advanced subscription plan",
    monthly: {
      usd: "12000",
      gbp: "8400",
      eur: "9600",
      aud: "16800",
    },
    annual: {
      usd: "120000",
      gbp: "84000",
      eur: "96000",
      aud: "168000",
    },
  },
];

function overrides(amounts) {
  return [
    {
      countryCodes: ["GB"],
      unitPrice: { amount: amounts.gbp, currencyCode: "GBP" },
    },
    {
      countryCodes: ["IE"],
      unitPrice: { amount: amounts.eur, currencyCode: "EUR" },
    },
    {
      countryCodes: ["AU"],
      unitPrice: { amount: amounts.aud, currencyCode: "AUD" },
    },
  ];
}

async function listAll(collection) {
  const records = [];
  for await (const record of collection) records.push(record);
  return records;
}

const existingProducts = await listAll(
  paddle.products.list({ status: ["active", "archived"] }),
);
const existingPrices = await listAll(
  paddle.prices.list({ status: ["active", "archived"] }),
);

const result = [];

for (const plan of plans) {
  let product = existingProducts.find(
    (candidate) =>
      candidate.name === plan.name &&
      candidate.customData?.catalogKey === "aasimshah-services-v1",
  );

  if (!product) {
    product = await paddle.products.create({
      name: plan.name,
      description: plan.description,
      taxCategory: "saas",
      customData: { catalogKey: "aasimshah-services-v1" },
    });
  }

  const createdPrices = {};
  for (const [frequency, amounts] of [
    ["monthly", plan.monthly],
    ["annual", plan.annual],
  ]) {
    const description = `${plan.name} ${frequency}`;
    let price = existingPrices.find(
      (candidate) =>
        candidate.productId === product.id &&
        candidate.description === description &&
        candidate.customData?.catalogKey === "aasimshah-services-v1",
    );

    if (!price) {
      price = await paddle.prices.create({
        productId: product.id,
        description,
        unitPrice: { amount: amounts.usd, currencyCode: "USD" },
        unitPriceOverrides: overrides(amounts),
        billingCycle: {
          interval: frequency === "monthly" ? "month" : "year",
          frequency: 1,
        },
        trialPeriod,
        customData: { catalogKey: "aasimshah-services-v1" },
      });
    }

    createdPrices[frequency] = {
      id: price.id,
      unitPrice: price.unitPrice,
      unitPriceOverrides: price.unitPriceOverrides,
      billingCycle: price.billingCycle,
      trialPeriod: price.trialPeriod,
      status: price.status,
    };
  }

  result.push({
    product: {
      id: product.id,
      name: product.name,
      taxCategory: product.taxCategory,
      status: product.status,
    },
    prices: createdPrices,
  });
}

console.log(JSON.stringify(result, null, 2));
