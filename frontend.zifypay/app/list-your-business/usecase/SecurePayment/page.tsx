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
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, BadgePercent, Lock, Clock } from "lucide-react";
import Image from "next/image";

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

      {/* Secure Payment Hero Section */}

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
            Trusted Transactions, Every Time.
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            End-to-end encrypted transactions for every payment.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-xl bg-blue-500 px-6 py-3 text-sm md:text-base font-semibold hover:bg-blue-600 transition">
              Book a Demo
            </button>
            <button className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/20 transition">
              Learn More
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 w-96 hidden md:block">
            ZifyPay is a financial technology company, not a bank. Banking
            services are provided by regulated financial institutions.
          </p>
        </motion.div>

        {/* Image */}
        <img src="/secured.png" className="w-1/2 z-10 hidden md:block" />

        {/* Right animation placeholder (optional) */}
        <motion.div
          className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[450px]"
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        />
      </section>

      {/* Payment Security Section */}
      <section className="bg-gradient-to-r from-[#001A39] to-[#001433] min-h-screen flex items-center py-16 px-4 md:px-20 text-white">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Payment Security You Can Trust
          </h2>
          <p className="text-lg text-gray-300 mb-12 text-center">
            We provide industry-leading payment security solutions to ensure
            your transactions are always safe and protected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Advanced Fraud Detection",
                desc: "Real-time monitoring and AI-driven systems to prevent unauthorized transactions.",
              },
              {
                icon: BadgePercent,
                title: "PCI DSS Compliant",
                desc: "All payment processing meets the highest industry standards for data security.",
              },
              {
                icon: Lock,
                title: "End-to-End Encryption",
                desc: "Your sensitive data is encrypted at every stage of the transaction process.",
              },
              {
                icon: Clock,
                title: "24/7 Security Monitoring",
                desc: "Our team ensures your payments are protected around the clock, every day.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 8px 32px 0 rgba(0, 123, 255, 0.25)",
                  }}
                  className="h-full"
                >
                  <Card className="bg-[#0d1a2f] border border-[#22304a] rounded-2xl flex flex-col items-center py-10 px-4 min-h-[260px] shadow-xl h-full">
                    <CardContent className="flex flex-col items-center">
                      <Icon className="w-12 h-12 text-blue-400 mb-4" />
                      <h3 className="font-semibold mb-2 text-lg text-white text-center">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 text-center">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <ContainerScroll
        titleComponent={
          <>
            <h1
              className="text-4xl text-white  "
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Hassle-Free Transactions
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
      {/* ZifyPay Achievements Section */}
      <section className="w-full py-16 bg-gradient-to-r from-[#001A39] to-[#001433] flex justify-center items-center">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-12 w-full max-w-6xl">
          <div className="mb-10">
            <span
              className="uppercase text-xs tracking-widest text-blue-600 font-bold"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Achievement
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#001A39] mt-2"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              We Are Powering Business Success
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <svg
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2 2 4-4" />
                </svg>
              </div>
              <div
                className="text-3xl font-bold text-[#001A39]"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                10,000+
              </div>
              <div
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                Satisfied Businesses
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <svg
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M16 3v4M8 3v4" />
                </svg>
              </div>
              <div
                className="text-3xl font-bold text-[#001A39]"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                2,500+
              </div>
              <div
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                Successful Integrations
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <svg
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                </svg>
              </div>
              <div
                className="text-3xl font-bold text-[#001A39]"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                500+
              </div>
              <div
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                Payment Experts
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <svg
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 3v4M8 3v4" />
                  <path d="M12 12v4" />
                </svg>
              </div>
              <div
                className="text-3xl font-bold text-[#001A39]"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                5,000,000+
              </div>
              <div
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                Transactions Processed
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Bendo /> */}
      <section className="min-h-screen flex flex-col justify-center items-center py-12 px-4 md:px-20 bg-gradient-to-r from-[#001A39] to-[#001433]">
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl gap-12">
          {/* Left: Hexagon Image */}
          <div className="relative flex-1 flex justify-center items-center min-w-[320px] min-h-[320px]">
            {/* Large Hexagon */}
            <div className="w-72 h-72 md:w-96 md:h-96 relative z-10">
              <svg viewBox="0 0 200 200" className="absolute w-full h-full">
                <polygon
                  points="100,10 190,55 190,145 100,190 10,145 10,55"
                  fill="#0d1a2f"
                  stroke="#fff"
                  strokeWidth="4"
                />
              </svg>
              <Image
                src="https://imgs.search.brave.com/CFSd1tBGNh2jTt5Jp6YBc1eAc-dSZfquYbeyNEpQjAo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ0/MjQ4NDg2NC9waG90/by9wZW9wbGUtbmV0/d29yay1zZWN1cml0/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bUxoS250WXhi/cl9KYVYybUdjTHJZ/RWZjVFRtenNscFEz/R0xvUVlmMlQxYz0"
                alt="Secure Payment"
                fill
                className="object-cover rounded-2xl z-20"
                style={{
                  clipPath:
                    "polygon(50% 5%, 95% 27%, 95% 73%, 50% 95%, 5% 73%, 5% 27%)",
                }}
              />
            </div>
          </div>
          {/* Right: Text Content */}
          <div
            className="flex-1 flex flex-col justify-center items-start max-w-xl"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Secure Payment
            </h1>
            <p
              className="text-lg text-gray-300 mb-6"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Experience the next level of payment security with our advanced
              technology, ensuring your transactions are always protected and
              your data remains private.
            </p>
            <div className="w-full mb-6">
              <div
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl flex flex-col md:flex-row gap-8 p-6 md:p-10"
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                <div className="flex-1">
                  <h3
                    className="font-bold text-lg text-white mb-2"
                    style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                  >
                    Our Mission
                  </h3>
                  <p
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                  >
                    To provide seamless, secure, and reliable payment solutions
                    for businesses and customers worldwide.
                  </p>
                </div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-lg text-white mb-2"
                    style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                  >
                    Our Vision
                  </h3>
                  <p
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                  >
                    Empowering a safer digital economy through innovative
                    payment security and trust.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              Know Details
            </button>
          </div>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <CTASection />
      </div>

      <Footer />
    </div>
  );
}
