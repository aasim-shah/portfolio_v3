import React from "react";

export default function Footer() {
  return (
    <footer className="bg-darkest-gray border-t border-border-color flex flex-col items-center gap-2 py-10 w-full">
      {/* Policy links - ensure publicly accessible before payment */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4 text-light-gray-2 text-sm">
        <a href="/terms" className="hover:underline">Terms &amp; Conditions</a>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/refund" className="hover:underline">Refund Policy</a>
      </div>

      {/* Copyright */}
      <div className="text-light-gray-2 text-center font-medium text-lg">
        &copy; {new Date().getFullYear()} Aasim Shah. All rights reserved.
      </div>
    </footer>
  );
}
