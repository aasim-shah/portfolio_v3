import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ExternalLink, LockKeyhole } from "lucide-react";
import { openCustomerPortal } from "@/app/actions/customer-portal";
import { getAuthenticatedUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getAuthenticatedUser();

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-5 py-20">
      <section className="w-full rounded-2xl border border-dark-gray-3 bg-very-dark-gray p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dark-gray-4 bg-almost-black text-light-gray-4">
          {user ? <CreditCard size={22} /> : <LockKeyhole size={22} />}
        </div>
        <p className="mt-6 font-IBM_Plex_Mono text-xs font-semibold uppercase tracking-[0.18em] text-light-gray-2">
          Billing account
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">
          {user ? "Manage your subscription" : "Sign in required"}
        </h1>
        <p className="mt-4 text-base font-medium leading-7 text-light-gray-2">
          {user
            ? "Open Paddle’s secure customer portal to update your payment method, cancel a plan, or download invoices."
            : "Sign in to manage your subscription and billing details."}
        </p>

        {user ? (
          <form action={openCustomerPortal} className="mt-8">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-IBM_Plex_Mono text-sm font-semibold uppercase text-darkest-gray"
            >
              Open customer portal
              <ExternalLink size={16} />
            </button>
          </form>
        ) : (
          <Link
            href="/sign-in"
            className="mt-8 inline-flex rounded-xl border border-dark-gray-4 bg-almost-black px-5 py-3 font-IBM_Plex_Mono text-sm font-semibold uppercase text-white"
          >
            Sign in
          </Link>
        )}
      </section>
    </div>
  );
}
