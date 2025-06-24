"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const testimonialListRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll animation for modules
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, modulesRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(modulesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: modulesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP vertical marquee for testimonials
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!testimonialListRef.current) return;

      gsap.to(testimonialListRef.current, {
        yPercent: -100,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, testimonialListRef);

    return () => ctx.revert();
  }, []);

  const modules = [
    {
      title: "ZifyPay Booking",
      description: "Online appointments, customer profiles, calendar",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1750751934/phone4_vtaf6k.png",
      alignLeft: true,
    },
    {
      title: "POS for Fuel & Retail",
      description: "Manage pumps, inventory, billing, compliance",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1750751934/phone3_mrt4zz.png",
      alignLeft: false,
    },
    {
      title: "ZifyPay Payments",
      description: "Accept UPI, cards, wallets — zero processing fees",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1750751934/phon1_v5ycg0.png",
      alignLeft: true,
    },
    {
      title: "Zify Dashboard",
      description: "View reports, manage staff, automate taxes",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1750751934/phone_otrqbl.png",
      alignLeft: false,
    },
  ];

  const testimonials = [
    {
      quote:
        "We've seen 20% more bookings and zero payment issues after switching to ZifyPay.",
      highlight: "ZifyPay helps run my station like a pro.",
      author: "Mohammad Ali, Fuel Mart Owner",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450381/samples/smile.jpg",
    },
    {
      quote: "Inventory tracking and compliance is 10x easier now.",
      highlight: "ZifyPay POS is game-changing.",
      author: "Suman T., Retail Shop Owner",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450373/samples/people/smiling-man.jpg",
    },
    {
      quote: "Customers love UPI and card options — and we save money!",
      highlight: "Zero processing fee is a win-win.",
      author: "Rakesh Yadav, Pump Manager",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450373/samples/people/kitchen-bar.jpg",
    },
    {
      quote:
        "We've seen 20% more bookings and zero payment issues after switching to ZifyPay.",
      highlight: "ZifyPay helps run my station like a pro.",
      author: "Mohammad Ali, Fuel Mart Owner",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450381/samples/smile.jpg",
    },
    {
      quote: "Inventory tracking and compliance is 10x easier now.",
      highlight: "ZifyPay POS is game-changing.",
      author: "Suman T., Retail Shop Owner",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450373/samples/people/smiling-man.jpg",
    },
    {
      quote: "Customers love UPI and card options — and we save money!",
      highlight: "Zero processing fee is a win-win.",
      author: "Rakesh Yadav, Pump Manager",
      image:
        "https://res.cloudinary.com/dhehfjptn/image/upload/v1749450373/samples/people/kitchen-bar.jpg",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16"
        >
          Everything You Need in One Platform
        </h2>

        {/* Modules */}
        <div ref={modulesRef} className="space-y-20 mb-20">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                module.alignLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-16`}
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {module.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {module.description}
                </p>
                <button className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300 group">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={module.image}
                    alt={module.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Marquee */}
        <div className="overflow-hidden h-[320px] relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900   shadow-2xl ">
          <div
            ref={testimonialListRef}
            className="flex flex-col space-y-8 py-8 px-6"
          >
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-xl shadow-md w-full h-[280px] px-6 py-4 md:px-10 md:py-6"
              >
                {/* Left: Text */}
                <div className="flex-1 pr-6 space-y-3">
                  <blockquote className="text-md md:text-lg text-gray-800 font-medium leading-relaxed">
                    “{item.quote}”
                  </blockquote>
                  <p className="text-blue-600 font-semibold">
                    {item.highlight}
                  </p>
                  <cite className="block text-sm text-gray-500 not-italic mt-1">
                    — {item.author}
                  </cite>
                </div>

                {/* Right: Image */}
                <div className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.author}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
