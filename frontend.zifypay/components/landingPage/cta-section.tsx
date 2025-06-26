"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, cardsRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Start accepting online bookings",
      icon: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750750581/footer-1_xh2t9b.svg",
    },
    {
      title: "Streamline billing & retail",
      icon: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750750581/footer-2_wgkyrz.svg",
    },
    {
      title: "Boost revenue with real-time insights",
      icon: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750750581/footer-3_rxpore.svg",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
        >
          Join 100+ Smart Businesses Across The Globe
        </h2>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="w-full h-48 relative mb-6">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg min-w-[200px]"
          >
            Get Started Now
          </Link>
          <Link
            href="#"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg min-w-[200px]"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
