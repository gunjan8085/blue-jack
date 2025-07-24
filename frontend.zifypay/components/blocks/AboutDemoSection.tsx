import React from "react";
import { ContainerAnimated, ContainerStagger } from "./galllery";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link"

export type AboutDemoSectionProps = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor?: string;
  images: string[];
  onButtonClick?: () => void;
};

export const AboutDemoSection: React.FC<AboutDemoSectionProps> = ({
  subtitle,
  title,
  description,
  buttonText,
  buttonColor = "bg-blue-600 hover:bg-blue-700",
  images,
  onButtonClick,
}) => {
  return (
    <div className="md:px-14 ">
      <section className="px-4  rounded-2xl sm:px-6 md:px-12 lg:px-16 min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 md:py-16">
            {/* Left Text Content */}
            <ContainerStagger className="space-y-6 px-4 sm:px-6 md:px-8">
              <ContainerAnimated>
                <span className="inline-block text-sm md:text-base font-medium text-gray-600 uppercase tracking-wider">
                  {subtitle}
                </span>
              </ContainerAnimated>
              <ContainerAnimated>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {title}
                </h2>
              </ContainerAnimated>
              <ContainerAnimated>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg">
                  {description}
                </p>
              </ContainerAnimated>
              <ContainerAnimated>
                <Link href="/Book-A-Demo">
                  <Button
                    className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${buttonColor}`}
                    onClick={onButtonClick}
                    aria-label={buttonText}
                  >
                    {buttonText}
                  </Button>
                </Link>
              </ContainerAnimated>
            </ContainerStagger>

            {/* Right Image Grid with Hover Animation */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8">
              {images.slice(0, 4).map((imageUrl, index) => (
                <motion.div
                  key={index}
                  className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={imageUrl}
                    alt={`${title} image ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDemoSection;
