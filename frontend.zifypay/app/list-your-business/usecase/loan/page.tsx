"use client";

import { useRef, useEffect } from "react";
import Navbar from "../../Navbar";
import Footer from "@/components/Footer";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  CheckCircle2,
  Wallet,
  ReceiptText,
  TrendingUp,
  RefreshCcw,
  Store,
} from "lucide-react";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white/5 p-6 rounded-xl shadow-lg transition-all hover:scale-[1.02] duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
};

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Quick Approvals",
      description:
        "Say goodbye to endless paperwork and weeks of waiting. Our digital process ensures approvals within 24–48 hours.",
    },
    {
      title: "Flexible Funding Options",
      description:
        "From short-term working capital to longer-term growth financing — choose what fits your business goals.",
    },
    {
      title: "No Hidden Fees",
      description:
        "What you see is what you get. Transparent terms with no hidden charges or surprise penalties.",
    },
    {
      title: "Space Planning",
      description:
        "Effective space planning ensures optimal use of available area, improving both functionality and flow within a room.",
    },
    {
      title: "Seamless Repayment",
      description:
        "Flexible repayment plans aligned with your business cycles — auto-deducted with ease through your ZifyPay terminal or dashboard.",
    },
    {
      title: "Smart Eligibility, Not Just Credit Scores",
      description:
        "We assess your real business performance, not just credit history. Your potential matters more than your past.",
    },
  ];

  // Duplicate the features for seamless marquee
  const marqueeFeatures = [...features, ...features];

  return (
    <section
      className="py-16 px-4 bg-[#f7f8fa]  min-h-screen "
      style={{ fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-extrabold mb-24"
          style={{
            color: "#001A39",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Why Choose ZifyPay for Business Funding?
        </h2>
        {/* Marquee effect with pause on hover */}
        <div className="overflow-x-hidden relative">
          <div
            className="marquee-track flex gap-8 w-max"
            style={{ willChange: "transform" }}
          >
            {marqueeFeatures.map((feature, idx) => {
              // For the first card in each set, use dark style
              const isActive = idx % features.length === 0;
              return (
                <div
                  key={idx}
                  className={`relative min-w-[340px] max-w-xs rounded-3xl p-8 transition-all duration-300 cursor-pointer group h-[370px] flex flex-col justify-between ${
                    isActive
                      ? "bg-[#0A1734] text-white hover:bg-white hover:text-[#0A1734]"
                      : "bg-white text-[#0A1734] hover:bg-[#0A1734] hover:text-white"
                  } shadow-md`}
                  style={{
                    fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                  }}
                >
                  <span
                    className={`absolute top-7 right-8 text-4xl font-bold opacity-80 ${
                      isActive
                        ? "text-white group-hover:text-[#0A1734]"
                        : "text-[#0A1734] group-hover:text-white"
                    }`}
                  >{`0${(idx % features.length) + 1}`}</span>
                  <div className="mt-12">
                    <h3 className="text-3xl font-semibold mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-base opacity-80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <style>{`
            .marquee-track {
              animation: marquee 32s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

const HeroSection = () => {
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
    <section
      ref={ref}
      className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-[900px] flex items-center justify-between px-10 md:px-20 py-16 relative overflow-hidden"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      {/* Glow Background */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

      {/* Text Content */}
      <motion.div
        className="max-w-2xl z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl leading-tight">
          Empowering Small Businesses Financially
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

      {/* Image */}
      <img src="/img2.png" alt="Hero" className="w-1/2" />
    </section>
  );
};

export default function Loan() {
  return (
    <div style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
      <Navbar />
      <HeroSection />
      {/* Testimonial Section (as in image) */}
      <section className="py-16 px-4 min-h-screen bg-gradient-to-r from-[#001A39] to-[#001433]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-5xl md:text-6xl text-white font-extrabold mb-12"
                style={{
                  fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                What our <br /> customers <br /> say
              </h2>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-[180px]"
                    style={{
                      fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                    }}
                  >
                    <p className="text-gray-700 text-base mb-6">
                      They make it super easy and safe to find a room for rent,
                      prioritizing both convenience and safety. The customer
                      support team is exceptionally responsive and genuinely
                      helpful, ensuring a smooth experience. I wholeheartedly
                      endorse this platform.
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-[#001A39] text-lg">
                        Ashley Cooper
                      </span>
                      <span className="flex items-center ml-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-[#FFA726]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSectionWithHoverEffects />

      {/* CTA Section (as in image) */}
      <div className="px-16">
        <section
          className="w-full min-h-screen bg-[#0A1734] rounded-[40px] mt-16 mb-8 px-6 py-12 md:py-20 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12"
          style={{ fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
        >
          {/* Left Content: Heading + Paragraph + Button */}
          <div className="flex-1 w-full">
            <h2 className="text-white text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Start Your <br />
              Business Now!
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-xl border-t border-white/20 pt-8 mt-4">
              Made for your convenience for a more beautiful future for you and
              your family
            </p>
            <div className="mt-10">
              <a
                href="/Zifypay-loan.pdf"
                download
                className="group px-24 bg-gradient-to-br from-[#FFA726] to-[#fb8c00] hover:from-[#fb8c00] hover:to-[#FFA726] text-white text-xl font-bold rounded-2xl md:rounded-[32px] py-10 md:py-16 text-center shadow-2xl transition-all duration-200 min-w-[200px] min-h-[120px] flex items-center justify-center gap-4 focus:outline-none focus:ring-4 focus:ring-[#FFA726]/40"
              >
                <svg
                  className="w-7 h-7 mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m0 0l-6-6m6 6l6-6"
                  />
                </svg>
                Download Zifypay Loan PDF
              </a>
            </div>
          </div>

          {/* Right Content: Image */}
          <div className="flex-1 w-full flex justify-center">
            <img
              src="logo.png"
              alt="Dashboard Preview"
              className="max-w-full h-auto rounded-3xl"
            />
          </div>
        </section>
      </div>
      

      <Footer />
    </div>
  );
}
