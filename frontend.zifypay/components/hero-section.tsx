"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div ref={heroTextRef} className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Mobile
            <br />
            Payments
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Get started
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Contact sales
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div ref={heroImageRef} className="relative">
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 lg:p-12">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Mobile payment with smartphone and credit card"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
