import type React from "react";

export default function Privacy() {
  return (
    <div className="flex flex-col gap-5 flex-1 h-min overflow-hidden relative w-full p-10 justify-start">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-gray-800">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: July 12, 2025</em></p>
      </div>

      <h2>1. Introduction</h2>
      <p>
        Aasim Shah (“we”, “us”, “our”) values your privacy. This policy explains how
        we collect, use, and protect your data when you use our web and app development services.
      </p>

      <h2>2. Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>Contact details (name, email, phone, company)</li>
        <li>Project requirements and service details</li>
        <li>Payment-related data via SafePay (we do not store card numbers)</li>
        <li>Usage data (website analytics, IP, device details)</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-5">
        <li>Create quotes, invoices, and deliver services efficiently.</li>
        <li>Process payments securely via SafePay.</li>
        <li>Communicate updates and provide support.</li>
        <li>Detect and prevent fraud or unauthorized transactions.</li>
      </ul>

      <h2>4. Third‑Party Sharing</h2>
      <p>
        We share your data only with:
      </p>
      <ul className="list-disc ml-5">
        <li>SafePay for payment processing.</li>
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
