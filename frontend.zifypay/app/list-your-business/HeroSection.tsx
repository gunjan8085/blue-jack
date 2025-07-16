"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const controls = useAnimation();
  const [email, setEmail] = React.useState("");
  const router = useRouter();

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
      className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-[100vh] flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-20 py-12 md:py-16 relative overflow-hidden w-full"
    >
      {/* Text Glow Background */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

      {/* Text Content */}
      <motion.div
        className="w-full md:max-w-2xl z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left"
        style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
        initial={{ opacity: 0, y: 60 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl leading-tight">
          Smooth Bookings. Seamless Payments. Total Self-Care
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
          Apply in 10 minutes and transform how you operate.
        </p>

        <div className="mt-6 w-full max-w-md relative z-10">
          <div className="relative rounded-xl bg-white/40 backdrop-blur-md border border-white/20 shadow-inner shadow-blue-300 flex items-center px-4 py-2">
            <input
              type="email"
              placeholder="What's your work email?"
              className="bg-transparent flex-1 text-white placeholder-white/70 text-sm md:text-base outline-none px-2 py-2"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                localStorage.setItem("signupEmail", e.target.value);
              }}
            />
            <button
              className="ml-2 bg-white text-black text-sm md:text-base font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition"
              onClick={() => {
                if (email) {
                  router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
                }
              }}
            >
              Get started
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3 w-full md:w-96">
          ZifyPay is a financial technology company, not a bank. Banking
          services are provided by regulated financial institutions.
        </p>
      </motion.div>

      {/* Image - hidden on small screens */}
      <img
        src="img2.png"
        alt="Hero visual"
        className="hidden md:block w-full md:w-1/2 mt-8 md:mt-0"
      />

      {/* Decorative motion element (only on md and up) */}
      <motion.div
        className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[450px]"
        initial={{ opacity: 0, x: 80 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
      />
    </section>
  );
};

export default HeroSection;
