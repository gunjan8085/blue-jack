"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[500px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  return (
    <div className={cn("relative py-8 sm:py-12 md:py-16 lg:py-20", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(9,65,131,0.05),transparent_50%)] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_50%)] -z-10" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#094183] via-[#0d4f9a] to-[#1e5bb8] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Follow these simple steps to transform your business experience
            </p>
          </motion.div>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Image Section - Mobile First */}
          <div className="order-1 lg:order-2 relative w-full">
            <motion.div
              className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl shadow-black/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl"
                animate={{
                  background: [
                    "linear-gradient(0deg, #094183, #1e5bb8, #094183)",
                    "linear-gradient(90deg, #094183, #1e5bb8, #094183)",
                    "linear-gradient(180deg, #094183, #1e5bb8, #094183)",
                    "linear-gradient(270deg, #094183, #1e5bb8, #094183)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-[2px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  {features.map(
                    (feature, index) =>
                      index === currentFeature && (
                        <motion.div
                          key={index}
                          className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden"
                          initial={{
                            scale: 1.2,
                            opacity: 0,
                            filter: "blur(10px)",
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            scale: 0.8,
                            opacity: 0,
                            filter: "blur(10px)",
                          }}
                          transition={{
                            duration: 0.7,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.step}
                            className="w-full h-full object-cover"
                            width={1000}
                            height={1000}
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>

              {/* Floating Step Indicator */}
              <motion.div
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-sm sm:text-lg md:text-xl font-bold">
                  {currentFeature + 1}
                </span>
              </motion.div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-full transition-all duration-300",
                    index === currentFeature
                      ? "w-8 h-3 sm:w-10 sm:h-3 md:w-12 md:h-4 bg-gradient-to-r from-[#094183] to-[#1e5bb8]"
                      : "w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => {
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentFeature && (
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Steps Section */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 md:space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "flex items-start gap-3 sm:gap-4 md:gap-6 cursor-pointer p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 relative overflow-hidden",
                    index === currentFeature
                      ? "bg-white shadow-lg sm:shadow-xl shadow-blue-100/50 border border-blue-100/50 scale-[1.02] sm:scale-105"
                      : "bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-md shadow-sm border border-white/20 hover:scale-[1.01]"
                  )}
                  onClick={() => {
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Step Background Glow */}
                  {index === currentFeature && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Step Number */}
                  <motion.div
                    className={cn(
                      "relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center flex-shrink-0",
                      index === currentFeature
                        ? "bg-gradient-to-r from-[#094183] to-[#1e5bb8] text-white shadow-md sm:shadow-lg shadow-blue-500/30"
                        : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-700"
                    )}
                    animate={{
                      scale: index === currentFeature ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      type: "tween",
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold">
                      {index + 1}
                    </span>

                    {/* Pulse Effect for Active Step */}
                    {index === currentFeature && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <motion.h3
                      className={cn(
                        "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 leading-tight",
                        index === currentFeature
                          ? "text-[#094183]"
                          : "text-gray-700 group-hover:text-[#094183]"
                      )}
                      animate={{
                        scale: index === currentFeature ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.title || feature.step}
                    </motion.h3>
                    <motion.p
                      className={cn(
                        "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed",
                        index === currentFeature
                          ? "text-gray-700"
                          : "text-gray-600 group-hover:text-gray-700"
                      )}
                      animate={{
                        opacity: index === currentFeature ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.content}
                    </motion.p>
                  </div>

                  {/* Progress Indicator */}
                  {index === currentFeature && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#094183] to-[#1e5bb8] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Progress Panel */}
        <div className="mt-8 sm:mt-10 lg:hidden">
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                Step {currentFeature + 1} of {features.length}
              </span>
              <motion.span
                className="text-xs sm:text-sm font-medium text-[#094183]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Auto-advancing...
              </motion.span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3 sm:mb-4">
              <motion.div
                className="bg-gradient-to-r from-[#094183] to-[#1e5bb8] h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                    index === currentFeature
                      ? "bg-gradient-to-r from-[#094183] to-[#1e5bb8] text-white shadow-md"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  )}
                  onClick={() => {
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    step: "Step 1",
    title: "Ultra-fast booking that clients love",
    content:
      "Clients can book with your team 24/7 in under 30 seconds- no app downloads or forgotten passwords.",
    image:
      "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=",
  },
  {
    step: "Step 2",
    title: "Get personalized analytics for your barber business",
    content:
      "Track client retention rate, average sales value per client, and monthly new barber clients count. Receive personalized insights on how to improve performance.",
    image:
      "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Total peace of mind from no-shows",
    content:
      "Protect your time and money with deposits, custom cancellation policies, card-on-file booking rules, and client waitlists.",
    image:
      "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop",
  },
];

export function FeatureStepsDemo() {
  return (
    <FeatureSteps
      features={features}
      title="Your Journey Starts Here"
      autoPlayInterval={4000}
      imageHeight="full"
    />
  );
}
