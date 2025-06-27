"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import Link from "next/link";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([cardsRef.current, trustRef.current], {
        opacity: 0,
        y: 30,
      });

      // Cards animation
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Trust section animation
      gsap.to(trustRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Marquee animation
      const marqueeContent =
        marqueeRef.current?.querySelector(".marquee-content");
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const serviceFeatures = [
    "Online Appointment Booking",
    "Auto SMS & Email Reminders",
    "Google Calendar Sync",
    "Secure, Zero-Fee Payments",
  ];

  const retailFeatures = [
    "Fuel Pump Control & Billing",
    "Inventory & Tax Compliance",
    "Dual-Screen POS Interface",
    "Cloud Reporting Dashboard",
  ];

  const companyLogos = [
    {
      name: "Zepto",
      logo: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750754871/SmartSpa_d33zwg.png",
    },
    {
      name: "SmartSpa",
      logo: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750754870/Mega_majien.png",
    },
    {
      name: "Speed",
      logo: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750754870/speed_sg5fn0.png",
    },
    {
      name: "Mego Salon",
      logo: "https://res.cloudinary.com/dhehfjptn/image/upload/v1750754870/jumbo_mbxpsi.png",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Service Businesses Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Service Businesses
            </h3>
            <p className="text-gray-600 mb-6">
              Industries: Salons, Barbers, Spas, Clinics
            </p>

            <div className="space-y-4 mb-8">
              {serviceFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
              <Link href="/booking-engine">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Explore Booking Solutions
            </button>
              </Link>
          </div>

          {/* C-Stores & Fuel Stations Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              C-Stores & Fuel Stations
            </h3>
            <p className="text-gray-600 mb-6">
              Industries: Fuel Pumps, Mini-Marts, C-Stores
            </p>

            <div className="space-y-4 mb-8">
              {retailFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
              <Link href={"/pos"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Explore Retail & Fuel Features
            </button>
              </Link>
          </div>
        </div>

        {/* Trust Section */}
        <div ref={trustRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Trusted by 100+ Businesses Across world
          </h2>

          {/* Marquee Logos */}
          <div ref={marqueeRef} className="overflow-hidden w-full">
            <div
              className="marquee-content flex items-center gap-16 whitespace-nowrap will-change-transform"
              style={{ width: "200%" }}
            >
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center shadow-md">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
