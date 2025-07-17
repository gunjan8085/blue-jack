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
import FinancialSupportSection from "../../FinancialSupportSection";

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
          className="max-w-xl md:max-w-2xl z-10"
          style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-6xl leading-tight">
            Fuel Pump Integration. Reimagined.
          </h1>
          <p className="mt-6 text-lg text-gray-300 hidden md:block">
            Real-time inventory, smart billing, and seamless fuel payments.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-xl bg-blue-500 px-6 py-3 text-sm md:text-base font-semibold hover:bg-blue-600 transition">
              Book a Demo
            </button>
            <button className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/20 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <img
          src="/Pump.png"
          alt="Fuel Pump"
          className="w-1/2 z-10 hidden md:block"
        />

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
          src="/pay.mp4"
          controls
          className="w-full max-w-5xl h-full aspect-video mx-auto rounded-2xl object-contain"
          draggable={false}
        >
          Your browser does not support the video tag.
        </video>
      </ContainerScroll>
      {/* <Bendo /> */}
      <Profit />
      <CoreFeatures /> 
      <FinancialSupportSection />
      <Testimonial />

      <div className="bg-white min-h-screen">
        <CTASection />
      </div>

      <Footer />
    </div>
  );
}
