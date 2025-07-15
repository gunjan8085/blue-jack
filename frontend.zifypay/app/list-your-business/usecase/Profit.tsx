"use client";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  "Personalized Engagement",
  "Smart Data Analytics",
  "Seamless Integration",
  "24/7 Customer Support",
];

const stats = [
  { value: "200+", label: "Business Partners" },
  { value: "30K+", label: "Satisfied Customers" },
  { value: "10+", label: "Years of Excellence" },
];

export default function Profit() {
  return (
    <div className="px-12 container">
      <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16 px-4 rounded-2xl">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image with floating card */}
          <div className="relative flex justify-center">
            <div className="relative w-[340px] h-[260px] md:w-[400px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg bg-gray-50">
              <Image
                src="/gas.jpg"
                alt="Profit Visual"
                fill
                className="object-cover"
              />
              {/* Floating Card */}
              <div className="absolute top-4 left-4 bg-white/90 rounded-xl shadow-lg p-4 w-[220px] border border-gray-100">
                <div className="font-semibold text-gray-800 text-sm">
                  Sales Performance Overview
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Drive better decisions with our CRM dashboard.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Customer-Driven Solutions with Zifypay
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              At Zifypay, we focus on delivering tailored solutions that meet
              your customers' needs. With advanced technology and AI-powered CRM
              systems, we help businesses build stronger customer relationships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-gray-800 text-base"
                >
                  <CheckCircle size={20} className="text-green-600" />
                  {f}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow p-6 md:p-8">
              {stats.map((s) => (
                <StatItem key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-1"
        style={{ fontFamily: "'Proxima Nova', sans-serif" }}
      >
        {value}
      </div>
      <div className="text-sm text-gray-500 text-center max-w-[120px]">
        {label}
      </div>
    </div>
  );
}
