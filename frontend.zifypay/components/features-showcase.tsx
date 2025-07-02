"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesShowcase() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div
        ref={featuresRef}
        className="grid lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Left Image */}
        <div className="relative h-64 lg:h-auto">
          <Image
            src="/testimonial1.png"
            alt="Person using point of sale system"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="bg-blue-600 text-white p-8 lg:p-12 flex items-center">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Accept payments anywhere on your forecourt or in-store. ZifyPay
              enables your staff to process card, wallet, or UPI payments on any
              mobile device, with instant receipts and real-time sync to your
              POS and inventory.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-64 lg:h-auto">
          <Image
            src="testimonial.png"
            alt="Mobile payment interface on smartphone"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
