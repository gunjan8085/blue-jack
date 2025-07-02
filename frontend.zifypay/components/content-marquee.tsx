"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeItem {
  title: string;
  image: string;
  alt: string;
}

interface ContentMarqueeProps {
  title?: string;
  items?: MarqueeItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ContentMarquee({
  title = "Insights for Enterprise Growth",
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ContentMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultItems: MarqueeItem[] = [
    {
      title: "The Future of Retail Tech",
      image: "/mar.png",
      alt: "Retail tech",
    },
    {
      title: "Scaling Omnichannel Operations",
      image: "/mar2.png",
      alt: "Omnichannel",
    },
    {
      title: "12 Checkout Optimization Strategies",
      image: "/mar3.png",
      alt: "Checkout tips",
    },
    {
      title: "Enterprise Analytics Blueprint",
      image: "/mar44.png",
      alt: "Data dashboard",
    },
    {
      title: "Workforce Automation at Scale",
      image: "/mar5.png",
      alt: "Automation",
    },
    {
      title: "Secure Payments at Enterprise Speed",
      image: "/mar6.png",
      alt: "Secure payments",
    },
  ];

  const marqueeItems = items || defaultItems;
  const slidesPerView = 3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % marqueeItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + marqueeItems.length) % marqueeItems.length
    );
  };

  const visibleSlides = marqueeItems
    .slice(currentSlide, currentSlide + slidesPerView)
    .concat(
      currentSlide + slidesPerView > marqueeItems.length
        ? marqueeItems.slice(
            0,
            (currentSlide + slidesPerView) % marqueeItems.length
          )
        : []
    );

  return (
    <section ref={marqueeRef} className="container mx-auto px-4 py-20">
      <div className="relative">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-gray-900 text-center flex-1">
            {title}
          </h2>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {visibleSlides.map((item, index) => (
            <div
              key={index}
              className="transform hover:scale-[1.02] transition duration-300"
            >
              <div className="bg-white rounded-xl shadow-lg ">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={300}
                  height={700}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
