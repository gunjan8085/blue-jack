"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { heroContent } from "../utils/heroContent";
import Category from "../Category";
import Navbar from "../Navbar";
import Footer from "@/components/Footer";
import CTASection from "../CTASection";
import ForWhomSection from "../ForWhomSection";
import React from "react";

export default function CategoryLandingPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params);
  const content = heroContent[category];
  if (!content) return notFound();

  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [scrolledToCTA, setScrolledToCTA] = useState(false);

  // Scroll listener to track CTA section visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      setScrolledToCTA(rect.top <= window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative font-inter bg-gradient-to-r from-[#001A39] to-[#001433]">
      <Navbar />
      <Category {...content} />

      {/* Scroll-triggered background color wrapper */}
      <div ref={ctaRef} className="relative min-h-screen overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          animate={{
            backgroundColor: scrolledToCTA ? "#ebf8ff" : "#ffffff",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Foreground content */}
        <div className="relative z-[1]">
          <ForWhomSection />
          <CTASection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
