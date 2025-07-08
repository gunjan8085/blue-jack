import React from "react";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "./galllery";
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
  buttonColor = "bg-rose-500",
  images,
  onButtonClick,
}) => {
  return (
    <section className="px-12 min-h-screen ">
      <div className=" px-10   grid w-full rounded-3xl  grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 bg-[#ebf8ff]">
        <ContainerStagger>
          <ContainerAnimated className="mb-4  text-xs font-medium   text-black md:text-sm">
            {subtitle}
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl text-black font-semibold md:text-[2.4rem] tracking-tight">
            {title}
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-black md:my-6 md:text-lg">
            {description}
          </ContainerAnimated>
          <ContainerAnimated>
            <Button className="bg-blue-500" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {images.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <img
                className="size-full object-cover object-center"
                width="100%"
                height="100%"
                src={imageUrl}
                alt={title + " image " + (index + 1)}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
};

export default AboutDemoSection;
