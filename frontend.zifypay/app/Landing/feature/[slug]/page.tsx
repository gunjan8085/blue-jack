"use client";
import { useParams } from "next/navigation";
import { featureContent } from "../content";
import Navbar from "../../Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TwoSectionCard from "./Cards"
import ProductCards from "./productCards"

export default function FeaturePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const content = featureContent[slug as keyof typeof featureContent];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-500">
        Feature not found.
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section
        className="relative w-full overflow-hidden bg-gradient-to-r from-[#001A39] to-[#001433] pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-20"
        // style={{
        //   background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        // }}
      >
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

        <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="mb-6 inline-block rounded-full border border-[#ebf8ff]/30 px-3 py-1 text-xs text-[#9b87f5]">
              {content.title}
            </span>
            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
              {content.description}
            </p>

            <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {/* <div className="w-full flex h-40 md:h-64 relative overflow-hidden">
              <img
                src="https://blocks.mvp-subha.me/assets/.png"
                alt="Earth"
                className="absolute px-4 top-0 left-1/2 -translate-x-1/2 mx-auto -z-10 opacity-80"
              />
            </div> */}
            <div className="relative mt-12 z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[#ebf8ff]">
              {content.image && (
                <Image
                  src={content.image}
                  alt={content.title}
                  width={900}
                  height={600}
                  className="h-auto w-full rounded-lg border border-white/10"
                  priority
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>
      <TwoSectionCard />
      <ProductCards />
      <Footer />
    </div>
  );
}
