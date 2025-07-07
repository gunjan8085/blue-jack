"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { FeatureSteps } from "@/components/blocks/feature-section";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export type CategoryProps = {
  title: string;
  description: string;
  image: string;
};

const demoFeatures = [
  {
    step: "Step 1",
    title: "Learn the Basics",
    content: "Start your Web3 journey by learning the basics of blockchain.",
    image:
      "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Deep Dive",
    content:
      "Dive deep into blockchain fundamentals and smart contract development.",
    image:
      "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Build Projects",
    content:
      "Graduate with hands-on Web3 experience through building decentralized applications.",
    image:
      "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop",
  },
];

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
        className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-[900px] flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-20 py-16 relative overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

        {/* Text Content */}
        <motion.div
          className="max-w-2xl z-10 text-center md:text-left"
          style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl leading-tight mb-6">{title}</h1>
          <p className="text-lg text-gray-300 mb-8">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start z-10">
            <button className="bg-white text-black text-sm md:text-base font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition">
              Explore Services
            </button>
            <button className="bg-blue-500 text-white text-sm md:text-base font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition">
              Get Started
            </button>
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
            width={400}
            height={400}
            className="rounded-xl shadow-xl object-cover"
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
          <Image
            src={image}
            alt={title}
            height={500}
            width={1000}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
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
            className="bg-[#ebf8ff]  text-black h-screen rounded-3xl"
            features={demoFeatures}
            title="Your Journey Starts Here"
            autoPlayInterval={4000}
            imageHeight="h-[1000px]"
          />
        </motion.div>
        <PricingSection />
      </div>
    </>
  );
};

export default Category;
