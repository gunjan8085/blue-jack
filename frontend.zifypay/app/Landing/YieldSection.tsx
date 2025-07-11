"use client";
import React from "react";
import { MorphingText } from "@/components/ui/liquid-text";

const morphingTexts = [
  "Cloud Access",
  "24×7 Support",
  "100% Liquidity",
  "Real-Time Billing & Reports",
  "No Fees",
  "Maximize Cash Flow",
  "Hassle-Free",
];

const YieldSection = () => (
  <div className="p-12 ">
    <section className="rounded-3xl bg-blue-100 py-20 text-white/80 flex flex-col items-center justify-center min-h-screen  ">
      <div className="w-full flex justify-center mb-10">
        <MorphingText
          texts={morphingTexts}
          className="text-[#094183] font-inter"
        />
      </div>
    </section>
  </div>
);

export default YieldSection;
