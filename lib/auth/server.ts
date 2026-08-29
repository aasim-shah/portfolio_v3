import "server-only";

import { currentUser } from "@clerk/nextjs/server";

export interface AuthenticatedUser {
  email: string;
}


/**
 * Authentication adapter for serzzzver components and actions, backed by Clerk.
 * Reads the verified session set by clerkMiddleware — never trust a
 * client-supplied email/customer ID or an unsigned request header instead.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const primaryEmail = user.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  )?.emailAddress;
  if (!primaryEmail) return null;

  return { email: primaryEmail.trim().toLowerCase() };
}

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();
  if (!user?.email) throw new Error("Not authenticated");
  return user;
}
