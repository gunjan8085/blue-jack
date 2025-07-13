import React from "react";
import { ContainerAnimated, ContainerStagger } from "./galllery";
import { Button } from "@/components/ui/button";

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
  buttonColor = "bg-blue-500",
  images,
  onButtonClick,
}) => {
  return (
    <section className="px-6 md:px-12 min-h-screen">
      <div className="grid w-full rounded-3xl grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 bg-[#ebf8ff]">
        {/* Left Text Content */}
        <ContainerStagger className="px-6 md:px-10">
          <ContainerAnimated className="mb-4 text-xs font-medium text-black md:text-sm">
            {subtitle}
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl text-black font-semibold md:text-[2.4rem] tracking-tight">
            {title}
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-black md:my-6 md:text-lg">
            {description}
          </ContainerAnimated>
          <ContainerAnimated>
            <Button className={buttonColor} onClick={onButtonClick}>
              {buttonText}
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        {/* Right 2x2 Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 px-6 md:px-10">
          {images.slice(0, 4).map((imageUrl, index) => (
            <div
              key={index}
              className="w-full aspect-square overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={imageUrl}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDemoSection;
