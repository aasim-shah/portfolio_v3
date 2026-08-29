"use server";

import { redirect } from "next/navigation";
import { requireAuthenticatedUser } from "@/lib/auth/server";
import { getPaddleCollections } from "@/lib/db/paddle-store";
import {
  getPaddleEnvironment,
  getPaddleInstance,
} from "@/lib/paddle/server";

export async function openCustomerPortal(): Promise<never> {
  // Authentication is deliberately the first I/O operation.
  const user = await requireAuthenticatedUser();
  const { customers, subscriptions } = await getPaddleCollections();
  const paddleEnvironment = getPaddleEnvironment();

  const customer = await customers.findOne(
    { email: user.email, paddle_environment: paddleEnvironment },
    { projection: { customer_id: 1 } },
  );
  if (!customer?.customer_id) {
    throw new Error("No Paddle customer exists for the signed-in user.");
  }

  const subscriptionRows = await subscriptions
    .find(
      {
        customer_id: customer.customer_id,
        paddle_environment: paddleEnvironment,
        status: { $ne: "canceled" },
      },
      { projection: { subscription_id: 1 } },
    )
    .toArray();
  const subscriptionIds = subscriptionRows.map((row) => row.subscription_id);

  const portalSession = await getPaddleInstance().customerPortalSessions.create(
    customer.customer_id,
    subscriptionIds,
  );

  redirect(portalSession.urls.general.overview);
}
