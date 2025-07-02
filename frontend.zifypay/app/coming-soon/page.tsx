"use client";

import React from "react";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20">
        <Image
          src="/logo.png" // Make sure this file exists in public directory
          alt="Coming Soon"
          width={250}
          height={250}
          className="mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Page Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          We’re working hard behind the scenes to bring this feature to life.
          Stay tuned — exciting updates are on the way!
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
