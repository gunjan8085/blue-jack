"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 60 });
    }
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-[900px] flex items-center justify-between px-10 md:px-20 py-16 relative overflow-hidden"
    >
      {/* Text Glow Background */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

      {/* Text Content */}
      <motion.div
        className="max-w-2xl z-10"
        style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
        initial={{ opacity: 0, y: 60 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl  leading-tight">
          Smooth Bookings. Seamless Payments. Total Self-Care
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Apply in 10 minutes and transform how you operate.
        </p>

        <div className="mt-6 w-full max-w-md relative z-10">
          <div className="relative rounded-xl bg-white/40 backdrop-blur-md border border-white/20 shadow-inner shadow-blue-300 flex items-center px-4 py-2">
            <input
              type="email"
              placeholder="What's your work email?"
              className="bg-transparent flex-1 text-white placeholder-white/70 text-sm md:text-base outline-none px-2 py-2"
            />
            <button className="ml-2 bg-white text-black text-sm md:text-base font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition">
              Get started
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3 w-96">
          ZifyPay is a financial technology company, not a bank. Banking
          services are provided by regulated financial institutions.
        </p>
      </motion.div>

      {/* Image Card */}

      <img src="img2.png" alt="" className="w-1/2 " />

      <motion.div
        className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[450px]"
        initial={{ opacity: 0, x: 80 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
      ></motion.div>
    </section>
  );
};

export default HeroSection;
