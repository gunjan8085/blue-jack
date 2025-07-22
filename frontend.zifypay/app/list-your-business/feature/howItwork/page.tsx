"use client";
import Navbar from "../../Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import TwoSectionCard from "../[slug]/Cards";
import ProductCards from "../[slug]/productCards";
import CTASection from "../../CTASection";
import Testimonial from "../../Testimonial";
import HowItWork from "../[slug]/HowItWork";

// Static content - replace this with your actual content
const staticContent = {
  title: "How It Works",
  description:
    "Discover how our innovative solution transforms your business operations with cutting-edge technology and seamless integration.",
  video:
    "https://res.cloudinary.com/dwyyrm9xw/video/upload/v1753191939/zify_pay_website_22_july_2025_yufxei.mp4 ", // Replace with your actual video path
};

export default function HowItWorksPage() {
  return (
    <div style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-[#001A39] to-[#001433] font-light text-white antialiased px-4 py-16 lg:py-32 flex items-center">
        <div
          className="absolute right-0 top-0 h-1/2 w-1/2"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
          }}
        />
        <div
          className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
          }}
        />

        <div className="container relative z-10 mx-auto max-w-7xl text-center">
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="mb-6 inline-block rounded-full border border-[#ebf8ff]/30 px-3 py-1 text-xs text-[#9b87f5]">
              {staticContent.title}
            </span>
            <h1 className="mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
              {staticContent.title}
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
              {staticContent.description}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="https://pos.zifypay.com"
                className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full flex h-40 md:h-72 relative overflow-hidden">
              <img
                src="/earth.png"
                alt="Earth"
                className="absolute px-4 top-0 left-1/2 -translate-x-1/2 mx-auto -z-10 opacity-80"
              />
            </div>
            <div className="relative z-10 max-w-7xl overflow-hidden rounded-lg shadow-2xl">
              <video
                src={staticContent.video}
                autoPlay
                muted
                loop
                playsInline
                className="h-auto w-full rounded-lg border border-white/10"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATIC COMPONENTS */}
      <HowItWork />
      <TwoSectionCard />
      {/* <ProductCards /> */}
      <Testimonial />
      <CTASection />
      <Footer />
    </div>
  );
}
