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
  imageHeight = "h-[300px]",
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
    <div className={cn("relative py-6 sm:py-8 md:py-10 lg:py-12", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(9,65,131,0.05),transparent_50%)] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_50%)] -z-10" />

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#094183] via-[#0d4f9a] to-[#1e5bb8] bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Follow these simple steps to transform your business experience
            </p>
          </motion.div>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          {/* Image Section */}
          <div className="order-1 lg:order-2 relative w-full">
            <motion.div
              className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-xl shadow-md shadow-black/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-xl"
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

              <div className="absolute inset-[1px] rounded-xl overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  {features.map(
                    (feature, index) =>
                      index === currentFeature && (
                        <motion.div
                          key={index}
                          className="absolute inset-0 rounded-xl overflow-hidden"
                          initial={{
                            scale: 1.15,
                            opacity: 0,
                            filter: "blur(8px)",
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                          }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.step}
                            className="w-full h-full object-cover"
                            width={800}
                            height={800}
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>

              {/* Floating Step Indicator */}
              <motion.div
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-xs sm:text-sm font-bold">
                  {currentFeature + 1}
                </span>
              </motion.div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-3 sm:mt-4 gap-1.5 sm:gap-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-full transition-all duration-300",
                    index === currentFeature
                      ? "w-6 h-2 sm:w-8 sm:h-2.5 bg-gradient-to-r from-[#094183] to-[#1e5bb8]"
                      : "w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 hover:bg-gray-400"
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
                        duration: 1.2,
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
          <div className="order-2 lg:order-1 space-y-3 sm:space-y-4 md:space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "flex items-start gap-2 sm:gap-3 md:gap-4 cursor-pointer p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-400 relative overflow-hidden",
                    index === currentFeature
                      ? "bg-white shadow-md shadow-blue-100/50 border border-blue-100/50 scale-[1.02]"
                      : "bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-sm border border-white/20 hover:scale-[1.01]"
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
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}

                  {/* Step Number */}
                  <motion.div
                    className={cn(
                      "relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0",
                      index === currentFeature
                        ? "bg-gradient-to-r from-[#094183] to-[#1e5bb8] text-white shadow-sm shadow-blue-500/30"
                        : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-700"
                    )}
                    animate={{
                      scale: index === currentFeature ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      type: "tween",
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold">
                      {index + 1}
                    </span>

                    {/* Pulse Effect for Active Step */}
                    {index === currentFeature && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 1.8,
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
                        "text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-1.5 leading-tight",
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
                        "text-xs sm:text-sm md:text-base leading-relaxed",
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
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#094183] to-[#1e5bb8] rounded-full"
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
        <div className="mt-6 sm:mt-8 lg:hidden">
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md border border-white/20"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-medium text-gray-600">
                Step {currentFeature + 1} of {features.length}
              </span>
              <motion.span
                className="text-xs font-medium text-[#094183]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Auto-advancing...
              </motion.span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 sm:mb-3">
              <motion.div
                className="bg-gradient-to-r from-[#094183] to-[#1e5bb8] h-1.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-center gap-1.5">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                    index === currentFeature
                      ? "bg-gradient-to-r from-[#094183] to-[#1e5bb8] text-white shadow-sm"
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
    title: "Ultra-fast booking",
    content:
      "Clients can book 24/7 in under 30 seconds—no app downloads or passwords.",
    image:
      "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=",
  },
  {
    step: "Step 2",
    title: "Personalized analytics",
    content:
      "Track retention, sales, and new clients with tailored performance insights.",
    image:
      "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "No-show protection",
    content:
      "Secure your time with deposits, cancellation policies, and waitlists.",
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
      imageHeight="h-[350px]"
    />
  );
}
