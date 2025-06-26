// app/changelog/page.tsx
"use client";

import { Navbar5 } from "@/components/pos/navbar-5";
import Footer from "@/components/pos/Footer";

export default function ChangelogPage() {
  return (
    <main className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen flex flex-col">
      <Navbar5 />

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-white">ZifyPay Changelog</h1>
        <p className="text-gray-300 text-lg mb-12">
          Track every update, improvement, and bug fix we roll out.
        </p>

        {/* Placeholder updates */}
        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              🚀 May 2025 Update
            </h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Launched Semi-Integrated Payment Support for Ingenico Terminals</li>
              <li>Introduced role-based access control for C-Store staff</li>
              <li>Added offline mode for inventory sync</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              🛠️ April 2025 Update
            </h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Improved dashboard UI and loading performance</li>
              <li>Enabled item-level inventory tracking across stations</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
