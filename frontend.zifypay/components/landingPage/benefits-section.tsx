"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CreditCard,
  BarChart3,
  Calendar,
  Cloud,
  Headphones,
} from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, benefitsRef.current], {
        opacity: 0,
        y: 30,
      });

      // Animation timeline
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
      }).to(
        benefitsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Individual benefit cards animation
      const benefitCards =
        benefitsRef.current?.querySelectorAll(".benefit-card");
      if (benefitCards) {
        gsap.fromTo(
          benefitCards,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: CreditCard,
      title: "Zero-Fee Transactions",
      description: "Keep 100% of what you earn",
    },
    {
      icon: BarChart3,
      title: "Real-Time Billing & Reports",
      description: "GST, fuel, and inventory in one place",
    },
    {
      icon: Calendar,
      title: "AI-Smart Scheduling",
      description: "Fill empty slots, reduce no-shows",
    },
    {
      icon: Cloud,
      title: "Cloud Access",
      description: "Control your business from anywhere",
    },
    {
      icon: Headphones,
      title: "24×7 Support",
      description: "We're always a message away",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16"
        >
          Designed for Simplicity. Built for Growth.
        </h2>

        {/* Benefits Grid */}
        <div
          ref={benefitsRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Top Row - 3 items */}
          {benefits.slice(0, 3).map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card  rounded-2xl p-8 text-center hover:bg-slate-750 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}

          {/* Bottom Row - 2 items centered */}
          <div className="md:col-span-3 flex justify-center gap-8">
            {benefits.slice(3).map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index + 3}
                  className="benefit-card rounded-2xl p-8 text-center hover:bg-slate-750 transition-colors duration-300 w-full max-w-sm"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
