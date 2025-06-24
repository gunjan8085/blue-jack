"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - simple fade in only
      gsap.set(containerRef.current, {
        opacity: 0,
        y: 20,
      });

      // Simple scroll-triggered animation
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center"
    >
      {/* Split Background */}
      <div className="absolute inset-0">
        <div className="h-1/2 "></div>
        <div className="h-1/2 bg-white"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="bg-gray-200 rounded-2xl p-6 shadow-xl"
          >
            <div className="aspect-video w-full bg-gray-300 rounded-xl overflow-hidden relative">
              {/* Video Element */}
              <video
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=600&width=1000"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://res.cloudinary.com/dfcbjgt3w/video/upload/v1750748518/landing_page_kttiri.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Simple Play Button - Only shows when video is paused */}
            </div>

            {/* Video Title */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                See ZifyPay in Action
              </h3>
              <p className="text-gray-600 text-lg">
                Watch how our platform simplifies your business operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
