"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 py-6">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden rounded-4xl mx-4">
        {/* Video Background */}
        <div className="absolute inset-0 h-full rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover rounded-2xl"
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-wide">
                Powering
                <br />
                Fuel + Retail + Payments
              </h1>
            </div>
          </div>
        </div>

        {/* Right Bottom Corner Text Div */}
        <div className="absolute bottom-0 right-0 max-w-sm">
          <div className="bg-gray-300 p-6 rounded-tl-4xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Built for Petro Convenience
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              ZifyPay streamlines your pumps, POS, and payment systems into one
              powerful, compliant, and cloud-connected platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
