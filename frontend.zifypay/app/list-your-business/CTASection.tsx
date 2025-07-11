import Image from "next/image";
import React from "react";

const HeroCardSection = () => {
  return (
    <section className="relative h-full  overflow-hidden mt-44"> 
      {/* Grid layout with 30% text + 70% image */}
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] h-full w-full ">
        {/* Text Area: Center Vertically */}
        <div
          className="flex items-center justify-start h-[80vh] ml-5"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          <div>
            <h1 className="text-5xl  mb-8 leading-tight">
              <span className="text-green-600 block">Join the movement.</span>
              <span className="text-[#0f172a] block mt-3">
                Streamline your Business <br />
                in 10 mins or less.
              </span>
            </h1>
            <a
              href="#"
              className="mt-4 inline-block bg-[#1e40af] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#1e3a8a] transition font-medium text-lg"
            >
              See a demo
            </a>
          </div>
        </div>

        {/* Image Area: Align Bottom */}
        <div className="flex items-end justify-end relative h-full">
          <div className="relative w-full h-full">
            <Image
              src="/200.png"
              alt="Business Card"
              layout="fill"
              objectFit="contain"
              className="pointer-events-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCardSection;
