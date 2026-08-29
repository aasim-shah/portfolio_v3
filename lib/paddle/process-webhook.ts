import "server-only";

import {
  EventName,
  type CustomerCreatedEvent,
  type CustomerUpdatedEvent,
  type EventEntity,
  type SubscriptionCanceledEvent,
  type SubscriptionCreatedEvent,
  type SubscriptionUpdatedEvent,
  type TransactionCompletedEvent,
} from "@paddle/paddle-node-sdk";
import {
  getPaddleCollections,
  upsertPaddleSnapshot,
} from "@/lib/db/paddle-store";
import { getPaddleEnvironment } from "@/lib/paddle/server";

type CustomerEvent = CustomerCreatedEvent | CustomerUpdatedEvent;
type SubscriptionEvent =
  | SubscriptionCreatedEvent
  | SubscriptionUpdatedEvent
  | SubscriptionCanceledEvent;

function asDate(value: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) throw new Error("Invalid Paddle timestamp.");
  return date;
}

async function upsertCustomer(event: CustomerEvent): Promise<void> {
  const { customers } = await getPaddleCollections();
  const customer = event.data;
  const occurredAt = asDate(event.occurredAt);

  await upsertPaddleSnapshot(
    customers,
    "customer_id",
    customer.id,
    occurredAt,
    {
      paddle_environment: getPaddleEnvironment(),
      customer_id: customer.id,
      email: customer.email.trim().toLowerCase(),
      name: customer.name,
      status: customer.status,
      event_occurred_at: occurredAt,
      paddle_created_at: asDate(customer.createdAt),
      paddle_updated_at: asDate(customer.updatedAt),
    },
  );
}

async function upsertSubscription(event: SubscriptionEvent): Promise<void> {
  const { subscriptions } = await getPaddleCollections();
  const subscription = event.data;
  const occurredAt = asDate(event.occurredAt);
  const items = subscription.items.map((item) => {
    if (!item.price?.id || !item.price.productId) {
      throw new Error(`Subscription ${subscription.id} has an incomplete price item.`);
    }

    return {
      price_id: item.price.id,
      product_id: item.price.productId,
      quantity: item.quantity,
      status: item.status,
    };
  });
  const primaryItem = items[0];
  if (!primaryItem) {
    throw new Error(`Subscription ${subscription.id} has no price items.`);
  }

  await upsertPaddleSnapshot(
    subscriptions,
    "subscription_id",
    subscription.id,
    occurredAt,
    {
      paddle_environment: getPaddleEnvironment(),
      subscription_id: subscription.id,
      customer_id: subscription.customerId,
      status: subscription.status,
      price_id: primaryItem.price_id,
      product_id: primaryItem.product_id,
      items,
      scheduled_change_action: subscription.scheduledChange?.action ?? null,
      scheduled_change_at: subscription.scheduledChange
        ? asDate(subscription.scheduledChange.effectiveAt)
        : null,
      event_occurred_at: occurredAt,
      paddle_created_at: asDate(subscription.createdAt),
      paddle_updated_at: asDate(subscription.updatedAt),
    },
  );
}

async function upsertTransaction(event: TransactionCompletedEvent): Promise<void> {
  const { transactions } = await getPaddleCollections();
  const transaction = event.data;
  const occurredAt = asDate(event.occurredAt);

  await upsertPaddleSnapshot(
    transactions,
    "transaction_id",
    transaction.id,
    occurredAt,
    {
      paddle_environment: getPaddleEnvironment(),
      transaction_id: transaction.id,
      customer_id: transaction.customerId,
      subscription_id: transaction.subscriptionId,
      status: transaction.status,
      currency_code: transaction.currencyCode,
      total: transaction.details?.totals?.total ?? null,
      event_occurred_at: occurredAt,
      paddle_created_at: asDate(transaction.createdAt),
      paddle_updated_at: asDate(transaction.updatedAt),
    },
  );
}

export async function processPaddleWebhook(event: EventEntity): Promise<void> {
  switch (event.eventType) {
    case EventName.CustomerCreated:
    case EventName.CustomerUpdated:
      return upsertCustomer(event);
    case EventName.SubscriptionCreated:
    case EventName.SubscriptionUpdated:
    case EventName.SubscriptionCanceled:
      return upsertSubscription(event);
    case EventName.TransactionCompleted:
      return upsertTransaction(event);
    default:
      return;
  }
}
