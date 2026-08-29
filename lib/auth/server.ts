import "server-only";

export interface AuthenticatedUser {
  email: string;
}

/**
 * Authentication adapter for server components and actions.
 *
 * This repository currently has no auth provider or signed session. It must
 * fail closed instead of trusting a client-supplied email/customer ID or an
 * unsigned request header. Replace this implementation with the project's
 * session SDK (Clerk, Auth.js, Supabase Auth, etc.) when auth is introduced.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  return null;
}

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();
  if (!user?.email) throw new Error("Not authenticated");
  return { email: user.email.trim().toLowerCase() };
}
