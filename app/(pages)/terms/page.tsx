import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing the use of Syed Aasim Shah's web and app development services.",
  alternates: { canonical: "https://aasimshah.com/terms" },
};

export default function Terms() {
  return (
    <div className="flex flex-col flex-1 gap-5 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Terms &amp; Conditions</h1>
        <p><em>Last updated: August 29, 2026</em></p>
      </div>

      <h2>1. Merchant Information</h2>
      <p>
        Business: <strong>Aasim Shah</strong><br/>
        Registered Address: Bahria town phase 7, Rawalpindi, Pakistan
      </p>

      <h2>2. Introduction</h2>
      <p>
        These Terms govern your use of our services, offered in two forms: (a) bespoke web and app
        development projects, and (b) the Development Subscription plans (Starter, Pro, Advanced)
        described below. By placing an order or subscribing to a plan, you agree to these Terms.
      </p>

      <h2>3. Custom Project Services</h2>
      <p>
        We provide bespoke website and application development services. Project scope, timelines,
        deliverables, revisions, and pricing are defined in the invoice or proposal.
      </p>

      <h3>3.1 Quotes &amp; Payment</h3>
      <ul className="list-disc ml-5">
        <li>Quotes are valid for 14 days unless stated otherwise.</li>
        <li>Invoices are payable within 7 days of delivery.</li>
        <li>Work may be paused if payment is delayed.</li>
        <li>Payment for project work is processed via SafePay.</li>
      </ul>

      <h3>3.2 Delivery &amp; Revisions</h3>
      <p>
        Each project includes up to two rounds of revisions. Additional revisions are charged separately.
      </p>

      <h3>3.3 Intellectual Property</h3>
      <p>
        Ownership of final deliverables transfers to you upon full payment. We may use non-confidential
        code or design for portfolio or demo purposes.
      </p>

      <h2>4. Development Subscription Plans</h2>
      <p>
        The Starter, Pro, and Advanced plans are recurring subscriptions that give you an ongoing
        queue of development requests (bug fixes, features, integrations, and related engineering
        work), worked one or more at a time depending on your plan, in exchange for a monthly or
        annual subscription fee. Plan capacity, turnaround targets, and inclusions are described on
        our <a href="/pricing" className="text-blue-600 hover:underline">Pricing</a> page.
      </p>

      <h3>4.1 Payment Processor</h3>
      <p>
        All purchases of Development Subscription plans are made through and processed by{" "}
        <strong>Paddle.com Market Ltd</strong> (&quot;Paddle&quot;), our authorized reseller and
        Merchant of Record. Paddle handles payment collection, sales tax/VAT, and related
        billing services for these subscriptions. Paddle&apos;s own{" "}
        <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noreferrer noopener" className="text-blue-600 hover:underline">
          Buyer Terms
        </a>{" "}
        apply to these purchases in addition to these Terms.
      </p>

      <h3>4.2 Free Trial, Billing &amp; Cancellation</h3>
      <ul className="list-disc ml-5">
        <li>New subscriptions include a 7-day free trial; you will not be charged if you cancel before the trial ends.</li>
        <li>After the trial, subscriptions renew automatically each billing period (monthly or annual, as selected) until cancelled.</li>
        <li>You may cancel anytime from the customer portal; cancellation stops future renewals but does not refund the current billing period, per our <a href="/refund" className="text-blue-600 hover:underline">Refund Policy</a>.</li>
        <li>Requests are queued and worked in the order received, up to the number of concurrent requests included in your plan.</li>
      </ul>

      <h2>5. Chargebacks &amp; Disputes</h2>
      <p>
        In the event of a chargeback on a custom project payment, we reserve the right to provide
        proof of service or deliverables to SafePay or banks. Chargebacks on subscription payments
        are handled by Paddle as Merchant of Record. You agree that legitimate work or service
        delivery constitutes full compliance with deliverables, and we will contest disputes
        appropriately.
      </p>

      <h2>6. Confidentiality</h2>
      <p>
        We maintain confidentiality of your data and only share it as required for legal compliance,
        or with SafePay and Paddle for payment processing.
      </p>

      <h2>7. Acceptable Use</h2>
      <p>
        You agree not to use our services for any illegal, fraudulent, harmful, or abusive activity,
        including but not limited to hacking, money laundering, or copyright infringement.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Our liability is limited to the total amount paid under these Terms in the 12 months
        preceding the claim. We are not responsible for indirect, incidental, or consequential damages.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Pakistan. Any disputes will be resolved in
        the courts of Rawalpindi.
      </p>

      <h2>10. Contact Information</h2>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">contact@aasimshah.com</a><br/>
        <strong>Phone:</strong> +92‑348‑3360070
      </p>
    </div>
  );
}
