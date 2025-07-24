"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { FeatureSteps } from "@/components/blocks/feature-section";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Pricing from "@/components/blocks/Pricing";
import AboutDemoSection from "@/components/blocks/AboutDemoSection";
import { useParams } from "next/navigation";
import { categoryContent } from "./categoryContent";
import { videoContent } from "./videocontent";
import { FAQSection } from "./FAQSection";
import FinancialSupportSection from "./FinancialSupportSection";
import Link from "next/link";

export type CategoryProps = {
  title: string;
  description: string;
  image: string;
};


const PricingSection = () => (
  <section
    className="w-full flex flex-col items-center justify-center py-20 px-4 bg-white text-[#001A39]"
    style={{ fontFamily: "'Proxima Nova', sans-serif" }}
  >
    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
      Simple pricing, complete features, major savings
    </h2>
    <p className="text-lg md:text-2xl mb-2 text-center">
      Start for free. No credit card required.
    </p>
    <p className="text-base md:text-lg mb-8 text-center text-gray-600">
      Switching is easy with our free data transfer service.
    </p>
    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition">
      Get Started Free
    </button>
  </section>
);

const Category: React.FC<CategoryProps> = ({ title, description, image }) => {
  const params = useParams();
  // Try to get the category from params (case-insensitive)
  let category = (params?.category as string)?.toLowerCase?.() || "default";
  // fallback for spaces and dashes
  if (!(category in categoryContent)) {
    // Try to match ignoring spaces/dashes
    const found = Object.keys(categoryContent).find(
      (key) =>
        key.replace(/\s|-/g, "").toLowerCase() ===
        category.replace(/\s|-/g, "").toLowerCase()
    );
    if (found) category = found;
    else category = "default";
  }
  const content = categoryContent[category] || categoryContent.default;
  const videoUrl = videoContent[category] || videoContent.default;

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
    <>
      <section
        ref={ref}
        className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-20 py-16 relative overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

        {/* Text Content */}
        <motion.div
          className="max-w-2xl z-10 flex flex-col items-start justify-center text-left h-full"
          style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl leading-tight mb-6">{title}</h1>
          <p className="text-lg text-gray-300 mb-8">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start z-10">
            <Link href="/auth/login">
              <button className="bg-blue-500 text-white text-sm md:text-base font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition">
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Image Card */}
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0 z-10 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="rounded-xl shadow-xl object-cover w-full h-screen"
          />
        </motion.div>
      </section>

      <div className="flex flex-col overflow-hidden bg-gradient-to-r from-[#001A39] to-[#001433] text-white">
        <ContainerScroll
          titleComponent={
            <>
              <h1
                className="text-4xl text-white  "
                style={{ fontFamily: "'Proxima Nova', sans-serif" }}
              >
                {title}
                <br />
                <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none text-white">
                  Discover the Difference
                </span>
              </h1>
            </>
          }
        >
          <video
            src={videoUrl}
            height={500}
            width={1000}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            controls
          ></video>
        </ContainerScroll>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          className="bg-gradient-to-r from-[#001A39] to-[#001433] p-12 "
        >
          <FeatureSteps
            className="bg-[#ebf8ff]  text-[#094183]  rounded-3xl"
            features={content.features}
            title="why you choose Zifypay"
            autoPlayInterval={4000}
            imageHeight="h-[1000px]"
          />
        </motion.div>

        <FAQSection />

        <AboutDemoSection
          subtitle={content.subtitle}
          title={content.title}
          description={content.description}
          buttonText={content.buttonText}
          images={content.images}
        />
        <FinancialSupportSection />
      </div>
    </>
  );
};

export default Category;
