import type React from "react";

export default function Terms() {
  return (
    <div className="flex flex-col flex-1 gap-5 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Terms &amp; Conditions</h1>
        <p><em>Last updated: July 12, 2025</em></p>
      </div>

      <h2>1. Merchant Information</h2>
      <p>
        Business: <strong>Aasim Shah</strong><br/>
        Registered Address: Bahria town phase 7, Rawalpindi, Pakistan
      </p>

      <h2>2. Introduction</h2>
      <p>
        These Terms govern your use of our web and app development services. By placing an order,
        you agree to abide by these Terms.
      </p>

      <h2>3. Services</h2>
      <p>
        We provide bespoke website and application development services. Project scope, timelines,
        deliverables, revisions, and pricing are defined in the invoice or proposal.
      </p>

      <h2>4. Quotes &amp; Payment</h2>
      <ul className="list-disc ml-5">
        <li>Quotes are valid for 14 days unless stated otherwise.</li>
        <li>Invoices are payable within 7 days of delivery.</li>
        <li>Work may be paused if payment is delayed.</li>
      </ul>

      <h2>5. Cancellations &amp; Refunds</h2>
      <p>
        Refer to our <a href="/refund" className="text-blue-600 hover:underline">Refund Policy</a>
        for cancellation and refund terms.
      </p>

      <h2>6. Delivery &amp; Revisions</h2>
      <p>
        Each project includes up to two rounds of revisions. Additional revisions are charged separately.
      </p>

      <h2>7. Chargebacks &amp; Disputes</h2>
      <p>
        In the event of a chargeback, we reserve the right to provide proof of service or deliverables
        to SafePay or banks. You agree that legitimate work constitutes full compliance with deliverables,
        and we will contest any disputes appropriately.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        Ownership of final deliverables transfers to you upon full payment. We may use non-confidential
        code or design for portfolio or demo purposes.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        We maintain confidentiality of your data and only share it as required for legal compliance
        or SafePay payment processing.
      </p>

      <h2>10. Acceptable Use</h2>
      <p>
        You agree not to use our services for any illegal, fraudulent, harmful, or abusive activity,
        including but not limited to hacking, money laundering, or copyright infringement.
      </p>

      <h2>11. Limitation of Liability</h2>
      <p>
        Our liability is limited to the total amount paid under these Terms. We are not responsible
        for indirect, incidental, or consequential damages.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Pakistan. Any disputes will be resolved in
        the courts of Rawalpindi.
      </p>

      <h2>13. Contact Information</h2>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">contact@aasimshah.com</a><br/>
        <strong>Phone:</strong> +92‑348‑3360070
      </p>
    </div>
  );
}
