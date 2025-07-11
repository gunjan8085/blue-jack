"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import YieldSection from "./YieldSection";
import Testimonial from "./Testimonial";
import ForWhomSection from "./ForWhomSection";
import CTASection from "./CTASection";
import Footer from "@/components/Footer";
import useSmoothScroll from "./useSmoothScroll";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [scrolledToCTA, setScrolledToCTA] = useState(false);

  useSmoothScroll();

  // Hero section fade-in with GSAP on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Track if CTA section is in view
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
    <div className="font-inter bg-gradient-to-r from-[#001A39] to-[#001433] relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10" />

      {/* Main sections */}
      <Navbar />
      <HeroSection  />
      <FeaturesSection />
      <YieldSection />
      <Testimonial />

      {/* Scroll-sensitive background color section */}
      <div ref={ctaRef} className="relative min-h-screen overflow-hidden">
        {/* Animated Background Color */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          animate={{
            backgroundColor: scrolledToCTA ? "#ebf8ff" : "#ffffff",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Content above animated background */}
        <div className="relative z-[1]">
          <ForWhomSection />
          <CTASection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
