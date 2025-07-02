"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HardwareCard } from "./hardware-card";


gsap.registerPlugin(ScrollTrigger);

export function HardwareSection() {
  const hardwareRef = useRef<HTMLDivElement>(null);

  const hardwareData = [
    {
      title: "Station Duo",
      price: "$0",
      image: "4-1.png",
      alt: "Station Duo POS system",
      features: [
        { icon: "", text: "Dual Screen Set-up" },
        { icon: "", text: "Receipt Printer, Cash Drawer" },
        { icon: "", text: "Manage multiple locations remotely" },
        {
          icon: "",
          text: "Contactless, Traditional and Chip Payment Accepted",
        },
      ],
    },
    {
      title: "Mini POS",
      price: "$0",
      image: "4-2.png",
      alt: "Mini POS device",
      features: [
        { icon: "", text: "Full featured tools for small businesses" },
        { icon: "", text: "Simple, tap-to-read card reader" },
        { icon: "", text: "Accept chip payments" },
        { icon: "", text: "WiFi and Bluetooth connectivity" },
      ],
    },
    {
      title: "Flex POS",
      price: "$0",
      image: "4-3.png",
      alt: "Flex POS handheld device",
      features: [
        { icon: "", text: "Full featured tools for small businesses" },
        { icon: "", text: "Get magnetic fast and easy" },
        { icon: "", text: "Accept chip payments" },
        { icon: "", text: "WiFi and Bluetooth connectivity" },
      ],
    },
    {
      title: "Station POS",
      price: "$0",
      image: "4-4.png",
      alt: "Station POS desktop terminal",
      features: [
        { icon: "", text: 'Large 15" versatile touchscreen' },
        { icon: "", text: "Customer Orders online and in-store" },
        { icon: "", text: "Speed, Power, Reliability and Durability" },
        { icon: "", text: "WiFi and Bluetooth connectivity" },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = hardwareRef.current?.querySelector("h2");
      const cards = hardwareRef.current?.querySelectorAll(".grid > div");

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hardwareRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);
  

  return (
    <section ref={hardwareRef} className="bg-blue-600 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Hardware that's ready for the rush
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {hardwareData.map((hardware, index) => (
            <HardwareCard key={index} {...hardware} />
          ))}
        </div>
      </div>
    </section>
  );
}
