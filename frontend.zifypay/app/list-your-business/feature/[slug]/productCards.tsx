"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "next/navigation";
import { featureContent } from "../content";
import { motion, AnimatePresence } from "framer-motion";

export interface ProductCardItem {
  title: string;
  description: string;
  image: string;
}

interface ProductCardsProps {
  products?: ProductCardItem[];
}

export function ProductCards({ products }: ProductCardsProps) {
  const params = useParams();
  const slug = params?.slug as string;
  const dynamicProducts =
    products ||
    featureContent[slug as keyof typeof featureContent]?.products ||
    [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-gradient-to-r from-[#001A39] to-[#001433] py-8 px-4 sm:py-12 md:py-16"
      style={{ fontFamily: "Proxima Nova, sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">
          Empower Your Business with{" "}
          <span className="text-[#9b87f5]">Zifypay Features</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-10">
          Explore powerful tools to grow, manage, and streamline your business
          operations.
        </p>
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
          {dynamicProducts.map((product, i) => {
            const open = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "group bg-[#ebf8ff] border border-white/10 backdrop-blur-xl transition-all duration-500 rounded-2xl cursor-pointer overflow-hidden shadow-xl p-4 sm:p-6",
                  open ? "w-[90vw] sm:w-[360px]" : "w-[80vw] sm:w-[240px]"
                )}
                style={{
                  height: "auto",
                  minHeight: "300px",
                  fontFamily: "Proxima Nova, sans-serif",
                }}
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="expanded"
                      className="flex flex-col h-full justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#001A39] mb-2 text-center">
                          {product.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
                          {product.description}
                        </p>
                      </div>

                      <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-lg border border-white/10">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, 360px"
                        />
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          Read More
                        </span>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563EB]" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      className="flex flex-col items-center justify-between h-full"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 80vw, 240px"
                        />
                      </div>
                      <h3 className="px-2 text-center text-xl sm:text-3xl md:text-5xl text-[#001A39] font-semibold leading-tight">
                        {product.title}
                      </h3>
                      <div className="mt-auto pt-4 sm:pt-6 flex justify-between items-center w-full">
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          Read More
                        </span>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/60 rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563EB]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .group {
            width: 90vw !important;
            margin: 0 auto;
          }
          .group:hover {
            width: 95vw !important;
          }
        }
      `}</style>
    </section>
  );
}

export default ProductCards;