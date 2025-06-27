"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  text: string;
}

interface FeaturesListProps {
  features?: Feature[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  const featuresListRef = useRef<HTMLDivElement>(null);

  const defaultFeatures = [
    { text: "Contactless and chip payments for fast, hygienic transactions" },
    { text: "Works offline with auto-sync when back online" },
    { text: "Instant digital receipts and SMS confirmations" },
    { text: "Integrates with loyalty and promotions" },
  ];

  const featuresList = features || defaultFeatures;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuresListRef.current?.children || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresListRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Features List */}
        <div ref={featuresListRef} className="space-y-6">
          {featuresList.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Features Image */}
        <div className="relative">
          <Image
            src="section.png" // Replace with your actual image path
            alt="Person using mobile payment system"
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
