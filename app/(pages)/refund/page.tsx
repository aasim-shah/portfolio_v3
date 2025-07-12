import type React from "react";

export default function Refund() {
  return (
    <div className="flex flex-col gap-5 flex-1 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Refund &amp; Cancellation Policy</h1>
        <p><em>Last updated: July 12, 2025</em></p>
      </div>

      <h2>1. Scope</h2>
      <p>This policy applies to our web and app development services.</p>

      <h2>2. Cancellation & Refund Period</h2>
      <p>You can cancel and request a refund as follows:</p>
      <ul className="list-disc ml-5">
        <li><strong>Within 48 hours</strong> of deposit: 100% refund.</li>
        <li><strong>0–25% work completed:</strong> 75% refund.</li>
        <li><strong>26–50% completed:</strong> 50% refund.</li>
        <li><strong>More than 50% completed:</strong> No refund.</li>
      </ul>

      <h2>3. Refund Requests</h2>
      <p>
        To request a refund, email us at{' '}
        <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">
          contact@aasimshah.com
        </a>{' '}
        with your invoice details. We will respond within 5 business days.
      </p>

      <h2>4. Refund Processing</h2>
      <p>
        Approved refunds are issued to the original payment method within 14 business days.
      </p>

      <h2>5. Dispute Resolution</h2>
      <p>
        If we cannot resolve your refund request amicably, disputes will be governed by the courts of Rawalpindi, Pakistan.
      </p>
    </div>
  );
}
