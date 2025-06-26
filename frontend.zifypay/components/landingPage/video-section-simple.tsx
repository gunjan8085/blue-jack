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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;

      // Initial fade in
      gsap.set(container, { opacity: 0, y: 20, scale: 1 });

      gsap.to(container, {
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

      // Scroll-based scale effect
     gsap.to(container, {
  scale: 1.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",     // starts early
    end: "center center", // max scale by mid-scroll
    scrub: true,
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
        <div className="h-1/2"></div>
        <div className="h-1/2 bg-white"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="bg-gray-200 rounded-2xl p-6 shadow-xl will-change-transform"
          >
            <div className="aspect-video w-full bg-gray-300 rounded-xl overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                preload="auto"
                poster="/placeholder.svg?height=600&width=1000"
              >
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
