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
  title = "Hardware that's ready for the rush",
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ContentMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultItems = [
    {
      title: "The Future of Retail Report",
      image: "/placeholder.svg?height=200&width=300",
      alt: "Person with digital interface",
    },
    {
      title: "How Technology Can Increase Revenue for Grocery Stores",
      image: "/placeholder.svg?height=200&width=300",
      alt: "Hands using tablet device",
    },
    {
      title: "12 Tips for Optimizing the Checkout Experience",
      image: "/placeholder.svg?height=200&width=300",
      alt: "Person in retail environment",
    },
  ];

  const marqueeItems = items || defaultItems;

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
        setCurrentSlide((prev) => (prev + 1) % marqueeItems.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, marqueeItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % marqueeItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + marqueeItems.length) % marqueeItems.length
    );
  };

  return (
    <section ref={marqueeRef} className="container mx-auto px-4 py-16">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
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

        <div className="grid md:grid-cols-3 gap-6">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100 scale-105"
                  : "opacity-70 scale-100"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
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
