// app/blog/page.tsx
"use client";

import { Navbar5 } from "@/components/pos/navbar-5";
import Footer from "@/components/pos/Footer";

export default function BlogPage() {
  return (
    <main className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen flex flex-col">
      <Navbar5 />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-white">ZifyPay Blog</h1>
        <p className="text-gray-300 text-lg mb-12">
          Stay updated with product tips, industry insights, and feature announcements from ZifyPay.
        </p>

        {/* Placeholder for blog posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-400">
                We'll soon start sharing resources to help you grow your fuel or retail business.
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
