import "server-only";

import {
  type Collection,
  type Document,
  type Filter,
  MongoServerError,
  type OptionalUnlessRequiredId,
  type UpdateFilter,
} from "mongodb";
import { getDatabase } from "@/lib/db/mongodb";

export interface CustomerRecord extends Document {
  paddle_environment: string;
  customer_id: string;
  email: string;
  name: string | null;
  status: string;
  event_occurred_at: Date;
  paddle_created_at: Date;
  paddle_updated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionItemRecord {
  price_id: string;
  product_id: string;
  quantity: number;
  status: string;
}

export interface SubscriptionRecord extends Document {
  paddle_environment: string;
  subscription_id: string;
  customer_id: string;
  status: string;
  price_id: string;
  product_id: string;
  items: SubscriptionItemRecord[];
  scheduled_change_action: string | null;
  scheduled_change_at: Date | null;
  event_occurred_at: Date;
  paddle_created_at: Date;
  paddle_updated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionRecord extends Document {
  paddle_environment: string;
  transaction_id: string;
  customer_id: string | null;
  subscription_id: string | null;
  status: string;
  currency_code: string;
  total: string | null;
  event_occurred_at: Date;
  paddle_created_at: Date;
  paddle_updated_at: Date;
  created_at: Date;
  updated_at: Date;
}

let indexesPromise: Promise<void> | undefined;

export async function getPaddleCollections() {
  const database = await getDatabase();
  const customers = database.collection<CustomerRecord>("customers");
  const subscriptions = database.collection<SubscriptionRecord>("subscriptions");
  const transactions = database.collection<TransactionRecord>("transactions");

  indexesPromise ??= Promise.all([
    customers.createIndex({ customer_id: 1 }, { unique: true, name: "customer_id_unique" }),
    customers.createIndex(
      { paddle_environment: 1, email: 1 },
      { name: "customer_environment_email" },
    ),
    subscriptions.createIndex(
      { subscription_id: 1 },
      { unique: true, name: "subscription_id_unique" },
    ),
    subscriptions.createIndex(
      { paddle_environment: 1, customer_id: 1, status: 1 },
      { name: "subscription_environment_customer_status" },
    ),
    transactions.createIndex(
      { transaction_id: 1 },
      { unique: true, name: "transaction_id_unique" },
    ),
    transactions.createIndex(
      { customer_id: 1, created_at: -1 },
      { name: "transaction_customer_created" },
    ),
  ]).then(() => undefined);

  await indexesPromise;
  return { customers, subscriptions, transactions };
}

/**
 * Applies a Paddle snapshot only when it is at least as new as the currently
 * mirrored event. The insert fallback plus unique index makes concurrent and
 * repeated deliveries converge without older events overwriting newer state.
 */
export async function upsertPaddleSnapshot<T extends Document>(
  collection: Collection<T>,
  idField: keyof T & string,
  id: string,
  occurredAt: Date,
  snapshot: Omit<Partial<T>, "created_at">,
): Promise<void> {
  const now = new Date();
  const filter = {
    [idField]: id,
    $or: [
      { event_occurred_at: { $exists: false } },
      { event_occurred_at: { $lte: occurredAt } },
    ],
  } as Filter<T>;

  const update = {
    $set: { ...snapshot, updated_at: now },
  } as unknown as UpdateFilter<T>;
  const result = await collection.updateOne(filter, update);

  if (result.matchedCount > 0) return;

  try {
    await collection.insertOne({
      ...snapshot,
      [idField]: id,
      created_at: now,
      updated_at: now,
    } as unknown as OptionalUnlessRequiredId<T>);
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) return;
    throw error;
  }
}
