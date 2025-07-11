"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Navbar from "../../Navbar";
import Footer from "@/components/Footer";
import CoreFeatures from "../CoreFeatures";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Profit from "../Profit";
import Bendo from "../Bendo";
import CTASection from "../../CTASection";
import Testimonial from "../Testimonial";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import RetailPOSFeatures from "../RetailPOSFeatures"
import TestimonialSection from "../RetailStoreTestimonial"

const retailFeatures = [
  "Boosted Sales & Upselling",
  "Real-Time Inventory Tracking",
  "Faster Checkout Experience",
  "Actionable Sales Analytics",
];

const retailStats = [
  { value: "150+", label: "Retail Partners" },
  { value: "25K+", label: "Happy Shoppers" },
  { value: "$5m+", label: "Extra Revenue Generated" },
];

export default function FuelPumps() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 60 });
    }
  }, [inView, controls]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#001A39] to-[#001433] text-white">
      <Navbar />
      <section
        ref={ref}
        className="min-h-[900px] flex items-center justify-between px-10 md:px-20 py-16 relative overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

        {/* Text Content */}
        <motion.div
          className="max-w-2xl z-10"
          style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl leading-tight">
            Transform Your Retail Operations with Smart POS.
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Real-time inventory, smart billing, and seamless payments.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-xl bg-blue-500 px-6 py-3 text-sm md:text-base font-semibold hover:bg-blue-600 transition">
              Book a Demo
            </button>
            <button className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/20 transition">
              Learn More
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 w-96">
            ZifyPay is a financial technology company, not a bank. Banking
            services are provided by regulated financial institutions.
          </p>
        </motion.div>

        {/* Image */}
        <img src="/img2.png" alt="Fuel Pump" className="w-1/2 z-10" />

        {/* Right animation placeholder (optional) */}
        <motion.div
          className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[450px]"
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        />
      </section>
      <ContainerScroll
        titleComponent={
          <>
            <h1
              className="text-4xl text-white  "
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Fuel Intrigation
              <br />
              <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none text-white">
                Discover the Difference
              </span>
            </h1>
          </>
        }
      >
        <video
          src="https://youtu.be/0M-tu0hFIOc?si=A3GtdVPJPz7QVsNk"
          height={500}
          width={1000}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          controls
        ></video>
      </ContainerScroll>
      {/* <Bendo /> */}
      <div className="px-16">
        <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16 px-4 rounded-2xl">
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Image with floating card */}
            <div className="relative flex justify-center">
              <div className="relative w-[340px] h-[260px] md:w-[400px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=600&q=80"
                  alt="Retail POS Profit"
                  fill
                  className="object-cover"
                />
                {/* Floating Card */}
                <div className="absolute top-4 left-4 bg-white/90 rounded-xl shadow-lg p-4 w-[220px] border border-gray-100">
                  <div className="font-semibold text-gray-800 text-sm">
                    Retail Performance
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Maximize every transaction with Zifypay POS.
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
                Unlock Retail Profit with Zifypay POS
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Zifypay's Retail POS empowers stores to increase profit margins
                by streamlining operations, enabling upselling, and providing
                real-time insights. Experience faster checkouts, smarter
                inventory, and happier customers—all leading to higher profits.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {retailFeatures.map((f) => (
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
                {retailStats.map((s) => (
                  <StatItem key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <RetailPOSFeatures />

      <TestimonialSection />

      <div className="bg-white min-h-screen">
        <CTASection />
      </div>

      <Footer />
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
