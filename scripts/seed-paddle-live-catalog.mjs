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
    description:
      "Up to 20 hours of senior engineering per month for maintenance, fixes, and steady product improvements.",
    monthly: {
      usd: "150000",
      gbp: "120000",
      eur: "140000",
      aud: "230000",
    },
    annual: {
      usd: "1620000",
      gbp: "1296000",
      eur: "1512000",
      aud: "2484000",
    },
  },
  {
    name: "Pro",
    description:
      "Up to 50 hours of senior full-stack engineering per month for active product delivery.",
    monthly: {
      usd: "350000",
      gbp: "280000",
      eur: "320000",
      aud: "530000",
    },
    annual: {
      usd: "3780000",
      gbp: "3024000",
      eur: "3456000",
      aud: "5724000",
    },
  },
  {
    name: "Advanced",
    description:
      "Up to 100 hours of embedded senior engineering per month for architecture, scale, and complex delivery.",
    monthly: {
      usd: "650000",
      gbp: "520000",
      eur: "600000",
      aud: "980000",
    },
    annual: {
      usd: "7020000",
      gbp: "5616000",
      eur: "6480000",
      aud: "10584000",
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
  } else {
    product = await paddle.products.update(product.id, {
      name: plan.name,
      description: plan.description,
      customData: { catalogKey: "aasimshah-services-v1" },
      status: "active",
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
    } else {
      price = await paddle.prices.update(price.id, {
        description,
        unitPrice: { amount: amounts.usd, currencyCode: "USD" },
        unitPriceOverrides: overrides(amounts),
        billingCycle: {
          interval: frequency === "monthly" ? "month" : "year",
          frequency: 1,
        },
        trialPeriod,
        customData: { catalogKey: "aasimshah-services-v1" },
        status: "active",
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
