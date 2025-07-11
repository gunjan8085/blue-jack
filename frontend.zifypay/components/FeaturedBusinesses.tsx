"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { API_URL } from "@/lib/const";
import { AnimatePresence, motion } from "framer-motion";

interface Business {
  _id: string;
  brandName: string;
  thumbnail?: string;
  avgReview?: number;
  reviewCount?: number;
  address?: { city?: string };
  serviceCategories?: { title: string; price?: number }[];
  createdAt?: string;
}

interface BusinessCarouselProps {
  title: string;
  businesses: Business[];
}

const pastelColors = [
  "bg-[#F6F3FF]",
  "bg-[#FFF6EC]",
  "bg-[#F6FFF6]",
  "bg-[#FFF6F6]",
  "bg-[#F6FAFF]",
  "bg-[#FFFDF6]",
];

function BusinessCarousel({ title, businesses }: BusinessCarouselProps) {
  const [start, setStart] = useState(0);
  const visibleCount = 3;
  const canPrev = start > 0;
  const canNext = start + visibleCount < businesses.length;

  const [direction, setDirection] = useState(0);
  const handlePrev = () => {
    setDirection(-1);
    setStart((s) => Math.max(0, s - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setStart((s) => Math.min(businesses.length - visibleCount, s + 1));
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-3xl md:text-4xl font-extrabold"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          {title}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrev} disabled={!canPrev}>
            Previous
          </Button>
          <Button variant="outline" onClick={handleNext} disabled={!canNext}>
            Next
          </Button>
        </div>
      </div>

      <div className="relative min-h-[370px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={start}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {businesses
              .slice(start, start + visibleCount)
              .map((business, idx) => (
                <div
                  key={business._id}
                  className={`rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                    pastelColors[(start + idx) % pastelColors.length]
                  }`}
                  style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                >
                  {/* Top: Location and Bookmark */}
                  <div className="flex items-center justify-between px-4 pt-4">
                    <span className="flex items-center gap-1 text-base font-semibold text-gray-700">
                      <MapPinned className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-semibold">
                        {business.address?.city || ""}
                      </span>
                    </span>
                    <Bookmark className="w-4 h-4 text-gray-400" />
                  </div>

                  {/* Center: Square Image with matching bg */}
                  <div
                    className={`w-full aspect-square flex items-center justify-center overflow-hidden p-2 ${
                      pastelColors[(start + idx) % pastelColors.length]
                    }`}
                  >
                    <img
                      src={business.thumbnail || "/placeholder.svg"}
                      alt={business.brandName}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Bottom: Profile, Name, View Button, Price */}
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={business.thumbnail || "/placeholder.svg"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {business.brandName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {business.serviceCategories?.[0]?.price
                          ? `$${business.serviceCategories[0].price}`
                          : ""}
                      </span>
                      <Link href={`/business/${business._id}`}>
                        <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-900 transition">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/business/getAllBusiness`);
        const data = await res.json();
        setBusinesses(data.data || []);
      } catch {
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const recommended = [...businesses]
    .sort(
      (a, b) =>
        (b.avgReview ?? 0) - (a.avgReview ?? 0) ||
        (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
    )
    .slice(0, 10);

  const newest = [...businesses]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? "").getTime() -
        new Date(a.createdAt ?? "").getTime()
    )
    .slice(0, 10);

  return (
    <section className="py-16 px-3 bg-white">
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold mb-12">
          Explore the Business
        </h1>

        <BusinessCarousel title="Recommended" businesses={recommended} />
        <BusinessCarousel title="New to Zifypay" businesses={newest} />
      </div>
    </section>
  );
}

export default FeaturedBusinesses;
