import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Syed Aasim Shah collects, uses, and protects your data when you use these web and app development services.",
  alternates: { canonical: "https://aasimshah.com/privacy" },
};

export default function Privacy() {
  return (
    <div className="flex flex-col gap-5 flex-1 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: August 29, 2026</em></p>
      </div>

      <h2>1. Introduction</h2>
      <p>
        Aasim Shah (“we”, “us”, “our”) values your privacy. This policy explains how
        we collect, use, and protect your data when you use our web and app development services,
        including the Development Subscription plans (Starter, Pro, Advanced).
      </p>

      <h2>2. Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>Contact details (name, email, phone, company)</li>
        <li>Project requirements and service details, or subscription support requests</li>
        <li>Payment-related data via SafePay for custom projects, or Paddle for subscription plans (we do not store card numbers)</li>
        <li>Account sign-in information (via Clerk) for subscribers managing their plan</li>
        <li>Usage data (website analytics, IP, device details)</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-5">
        <li>Create quotes, invoices, and deliver services efficiently.</li>
        <li>Process payments securely via SafePay or Paddle, and administer subscription billing.</li>
        <li>Communicate updates and provide support.</li>
        <li>Detect and prevent fraud or unauthorized transactions.</li>
      </ul>

      <h2>4. Third‑Party Sharing</h2>
      <p>
        We share your data only with:
      </p>
      <ul className="list-disc ml-5">
        <li>SafePay for custom project payment processing.</li>
        <li>
          Paddle.com Market Ltd, as Merchant of Record, for subscription payment processing, billing,
          and tax collection. Paddle&apos;s use of your data is governed by{" "}
          <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noreferrer noopener" className="text-blue-600 hover:underline">
            Paddle&apos;s Privacy Policy
          </a>.
        </li>
        <li>Clerk, our authentication provider, to manage subscriber sign-in and account sessions.</li>
        <li>Law enforcement or regulators if required.</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>5. Data Security</h2>
      <p>
        We follow best practices (AES‑256, TLS encryption, strict access control) to secure your data.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your information to meet legal obligations (e.g., SBP, corporate laws) or until you request deletion.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        You can request access, correction, or deletion of data. To do this, contact us at:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">contact@aasimshah.com</a><br/>
        <strong>Phone:</strong> +92‑348‑3360070
      </p>
    </div>
  );
}
