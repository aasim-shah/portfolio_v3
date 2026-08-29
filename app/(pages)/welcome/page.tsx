import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Welcome",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <section className="w-full max-w-xl rounded-2xl border border-dark-gray-3 bg-very-dark-gray p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto text-light-gray-4" size={48} />
        <p className="mt-6 font-IBM_Plex_Mono text-xs font-semibold uppercase tracking-[0.18em] text-light-gray-2">
          Subscription confirmed
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">Welcome aboard.</h1>
        <p className="mt-4 text-base font-medium leading-7 text-light-gray-2">
          Your checkout completed successfully. You’ll receive the subscription
          details by email shortly.
        </p>
        <Link
          href="/"
          className="group mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl border border-dark-gray-4 bg-almost-black px-5 py-3 font-IBM_Plex_Mono text-sm font-semibold uppercase text-white transition-colors hover:bg-dark-gray-4"
        >
          Back to home
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </section>
    </div>
  );
}
