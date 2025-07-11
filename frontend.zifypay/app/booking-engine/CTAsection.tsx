import React from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

export default function CTAsection() {
  return (
    <section
      className="w-full flex justify-center items-center py-16 px-4"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      <div className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#4B5CF0] to-[#1B2CC1] p-10 md:p-16 flex flex-col items-center">
        {/* Concentric Circles Background */}
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none z-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle
              cx="1050"
              cy="250"
              r="220"
              fill="#4B5CF0"
              fillOpacity="0.12"
            />
            <circle
              cx="1050"
              cy="250"
              r="170"
              fill="#4B5CF0"
              fillOpacity="0.22"
            />
            <circle
              cx="1050"
              cy="250"
              r="120"
              fill="#4B5CF0"
              fillOpacity="0.32"
            />
            <circle
              cx="1050"
              cy="250"
              r="70"
              fill="#4B5CF0"
              fillOpacity="0.45"
            />
            <circle
              cx="1050"
              cy="250"
              r="35"
              fill="#4B5CF0"
              fillOpacity="0.65"
            />
          </svg>
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">
            Let’s Get In Touch.
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">
            Your business should have the tools to grow, not the other way
            around. We’re happy to help you.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link href="/businesses">
              <ShimmerButton className="shadow-2xl w-[230px] h-[60px] flex items-center justify-center">
                <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  View Business
                </span>
              </ShimmerButton>
            </Link>
            <Link href="/for-bussiness">
              <ShimmerButton className="shadow-2xl w-[230px] h-[60px] flex items-center justify-center">
                <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  List the business
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
