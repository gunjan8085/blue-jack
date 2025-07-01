"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/footer";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Effortless Outlet Management",
    description:
      "Manage sales across multiple outlets, sync inventory, and track performance from a single dashboard — no manual hassle.",
    image: "https://lodgezify.com/assets/pos/features1/1.svg",
  },
  {
    title: "Seamless Guest Ordering",
    description:
      "Let guests place orders from their own devices for a fully contactless and convenient experience — boosting satisfaction and speed.",
    image: "https://lodgezify.com/assets/pos/features1/2.svg",
  },
  {
    title: "Smart Upselling",
    description:
      "Automatically suggest add-ons, combos, or upgrades to increase guest spend with minimal staff interaction.",
    image: "https://lodgezify.com/assets/pos/features1/3.svg",
  },
  {
    title: "Instant Order Alerts",
    description:
      "Be notified the moment an order is placed — enabling faster service, smoother operations, and happy customers.",
    image: "https://lodgezify.com/assets/pos/features1/4.svg",
  },
  {
    title: "Mobile-Friendly Operations",
    description:
      "Speed up food, beverage, and product sales with a responsive interface built for tablets and mobile devices.",
    image: "https://lodgezify.com/assets/pos/features1/5.svg",
  },
  {
    title: "Flexible Payment Options",
    description:
      "Offer customers their preferred way to pay — UPI, cards, or wallets — with secure, contactless processing.",
    image: "https://lodgezify.com/assets/pos/features1/6.svg",
  },
];

export default function POSFeatureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".feature-card", { opacity: 0, y: 30 });
      gsap.to(".feature-card", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-br-4xl">
    <Navbar/>
    <section
      ref={sectionRef}
      className="py-10 px-6 lg:px-12 text-center"
    >
      <h2 className="text-4xl font-bold text-white mb-4">
        One POS. All the Power.
      </h2>
      <p className="text-white max-w-3xl mx-auto mb-12">
        Simplify order taking, payment processing, and operations — across all
        outlets — with Lodgezify POS. Designed for restaurants, c-stores, and
        retail counters alike, it’s everything your team needs to serve faster,
        smarter, and better.
      </p>
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={feature.image}
                alt={feature.title}
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              {feature.title}
            </h3>
            <p className="text-black text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      </section>
      <Footer/>
    </div>
  );
}
