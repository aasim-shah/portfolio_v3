import type { SubscriptionRecord } from "@/lib/db/paddle-store";

export type AccessSubscription = Pick<SubscriptionRecord, "status"> &
  Partial<
    Pick<
      SubscriptionRecord,
      "scheduled_change_action" | "scheduled_change_at"
    >
  >;

/**
 * Scheduled cancellation or pause does not revoke access while Paddle still
 * reports the subscription as active. Past-due and paused subscriptions do not
 * grant access under the current product rule.
 */
export function subscriptionGrantsPaidAccess(
  subscription: AccessSubscription | null | undefined,
): boolean {
  return (
    subscription?.status === "active" || subscription?.status === "trialing"
  );
}
