import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Cancellation windows and refund terms for Syed Aasim Shah's web and app development services.",
  alternates: { canonical: "https://aasimshah.com/refund" },
};

export default function Refund() {
  return (
    <div className="flex flex-col gap-5 flex-1 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Refund &amp; Cancellation Policy</h1>
        <p><em>Last updated: August 29, 2026</em></p>
      </div>

      <h2>1. Scope</h2>
      <p>
        This policy has two parts: refunds for custom web and app development projects (Section 2),
        and refunds for the Development Subscription plans — Starter, Pro, and Advanced (Section 3).
      </p>

      <h2>2. Custom Projects — Cancellation &amp; Refund Period</h2>
      <p>You can cancel and request a refund as follows:</p>
      <ul className="list-disc ml-5">
        <li><strong>Within 48 hours</strong> of deposit: 100% refund.</li>
        <li><strong>0–25% work completed:</strong> 75% refund.</li>
        <li><strong>26–50% completed:</strong> 50% refund.</li>
        <li><strong>More than 50% completed:</strong> No refund.</li>
      </ul>
      <p>
        To request a refund for a custom project, email{' '}
        <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">
          contact@aasimshah.com
        </a>{' '}
        with your invoice details. We will respond within 5 business days, and approved refunds are
        issued to the original payment method within 14 business days.
      </p>

      <h2>3. Development Subscription Plans — Cancellation &amp; Refunds</h2>
      <ul className="list-disc ml-5">
        <li>Every new subscription includes a <strong>7-day free trial</strong>. Cancel anytime during the trial and you will not be charged.</li>
        <li>Once a paid billing period has started, that period is <strong>non-refundable</strong>.</li>
        <li>You can cancel anytime from your account&apos;s customer portal; this stops future renewals but does not refund the current period. You keep access until the end of the period you already paid for.</li>
        <li>
          Subscription payments are processed by Paddle.com Market Ltd as Merchant of Record.
          Refund requests for subscription charges are handled in line with{" "}
          <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noreferrer noopener" className="text-blue-600 hover:underline">
            Paddle&apos;s Buyer Terms
          </a>. You can also reach us directly at{" "}
          <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">contact@aasimshah.com</a>{" "}
          for any billing question.
        </li>
      </ul>

      <h2>4. Dispute Resolution</h2>
      <p>
        If we cannot resolve your refund request amicably, disputes will be governed by the courts of Rawalpindi, Pakistan.
      </p>
    </div>
  );
}
