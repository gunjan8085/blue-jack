"use client";
import { PointerHighlight } from "../ui/pointer-highlight";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([headingRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          subtitleRef.current,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="flex items-center justify-center h-screen px-6"
    >
      <div className="text-center max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
        >
          One Platform. All Your
          <br />
          Business Needs.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Simplify appointments, digitize retail, manage compliance — with
          <br />
          zero-fee payments, 
         
          
          all under ZifyPay.
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/booking-engine"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Get Started Free
          </Link>
          <Link
            href="/Book-A-Demo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
