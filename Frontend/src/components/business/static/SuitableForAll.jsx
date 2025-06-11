import React from "react";
import { ProductCard } from "./ProductCard";

const categories = [
  { name: "Waxing Salon", image: "/assets/images/business-landing-page/BudImg1.png" },
  { name: "Medspa", image: "/assets/images/business-landing-page/BudImg2.png" },
  { name: "Eyebrow Bar", image: "/assets/images/business-landing-page/BudImg3.png" },
  { name: "Hair Salon", image: "/assets/images/business-landing-page/BudImg4.png" },
  { name: "Nail Salon", image: "/assets/images/business-landing-page/BudImg5.png" },
  { name: "Barbers", image: "/assets/images/business-landing-page/BudImg6.png" },
  { name: "Therapy Center", image: "/assets/images/business-landing-page/BudImg7.png" },
  { name: "Salon", image: "/assets/images/business-landing-page/BudImg8.png" },
  { name: "Personal Trainer", image: "/assets/images/business-landing-page/BudImg9.png" },
  { name: "Fitness", image: "/assets/images/business-landing-page/BudImg10.png" },
  { name: "Spa", image: "/assets/images/business-landing-page/BudImg11.png" },
  { name: "Massage Salon", image: "/assets/images/business-landing-page/BudImg12.png" },
];

const half = Math.ceil(categories.length / 2);
const firstHalf = categories.slice(0, half);
const secondHalf = categories.slice(half);

const SuitableForAll = () => (
  <section className="tw-bg-white tw-py-16 tw-relative">
    <div className="tw-max-w-6xl tw-mx-auto">
      <h3 className="tw-text-3xl tw-font-extrabold tw-text-left tw-mb-8">
        A platform suitable for all
      </h3>
    </div>
    <div className="tw-w-full tw-space-y-6">
      {/* First row: scroll left */}
      <div className="tw-relative tw-overflow-hidden group">
        <div className="marquee-left tw-flex tw-gap-8 tw-w-max group-hover:tw-animation-paused">
          {[...firstHalf, ...firstHalf].map((cat, idx) => (
            <ProductCard
              key={cat.name + idx}
              title={cat.name}
              image={cat.image}
            />
          ))}
        </div>
      </div>
      {/* Second row: scroll right */}
      <div className="tw-relative tw-overflow-hidden group">
        <div className="marquee-right tw-flex tw-gap-8 tw-w-max group-hover:tw-animation-paused">
          {[...secondHalf, ...secondHalf].map((cat, idx) => (
            <ProductCard
              key={cat.name + idx}
              title={cat.name}
              image={cat.image}
            />
          ))}
        </div>
      </div>
    </div>
    {/* Fade effect left/right */}
    <div className="tw-pointer-events-none tw-absolute tw-left-0 tw-top-0 tw-bottom-0 tw-w-12 tw-bg-gradient-to-r tw-from-white tw-to-transparent tw-z-10" />
    <div className="tw-pointer-events-none tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-w-12 tw-bg-gradient-to-l tw-from-white tw-to-transparent tw-z-10" />
    <style>{`
      .marquee-left {
        animation: marquee-left 24s linear infinite;
        will-change: transform;
      }
      .marquee-right {
        animation: marquee-right 24s linear infinite;
        will-change: transform;
      }
      @keyframes marquee-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .group:hover .marquee-left,
      .group:hover .marquee-right {
        animation-play-state: paused !important;
      }
    `}</style>
  </section>
);

export default SuitableForAll;