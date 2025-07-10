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
      className="bg-gradient-to-r from-[#001A39] to-[#001433] py-16 px-4"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <p className="text-sm uppercase text-blue-200 mb-2 tracking-wider">
          Our Solutions
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
          Empower Your Business with{" "}
          <span className="text-[#9b87f5]">Zifypay Features</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-6">
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
                  "group bg-white/10 border border-white/10 backdrop-blur-xl transition-all duration-500 rounded-2xl cursor-pointer overflow-hidden shadow-xl p-6",
                  open ? "w-[360px]" : "w-[240px]"
                )}
                style={{ height: "380px" }}
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
                        <h3 className="text-xl font-semibold text-white mb-2 text-center">
                          {product.title}
                        </h3>
                        <p className="text-sm text-blue-100 mb-4 text-center">
                          {product.description}
                        </p>
                      </div>

                      <div className="relative w-full h-40 overflow-hidden rounded-lg border border-white/10">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-200">
                          Read More
                        </span>
                        <div className="w-8 h-8 bg-white/20 rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-4 h-4 text-[#2563EB]" />
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
                      <div className="relative w-full h-28 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-center text-base font-semibold text-white">
                        {product.title}
                      </h3>
                      <div className="mt-auto pt-6 flex justify-between items-center w-full">
                        <span className="text-sm font-medium text-blue-200">
                          Read More
                        </span>
                        <div className="w-8 h-8 bg-white/20 rounded-full shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-4 h-4 text-[#2563EB]" />
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
    </section>
  );
}

export default ProductCards;
