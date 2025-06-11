import React from "react";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
const categories = [
  { name: "Salon", img: "/assets/images/business-landing-page/BuImg1.png" },
  { name: "Barber", img: "/assets/images/business-landing-page/BuImg2.png" },
  { name: "Nails", img: "/assets/images/business-landing-page/BuImg3.png" },
  {
    name: "Spa & Sauna",
    img: "/assets/images/business-landing-page/BuImg4.png",
  },
  { name: "Medspa", img: "/assets/images/business-landing-page/BuImg5.png" },
  { name: "Massage", img: "/assets/images/business-landing-page/BuImg6.png" },
  {
    name: "Fitness & Recovery",
    img: "/assets/images/business-landing-page/BuImg7.png",
  },
  {
    name: "Physical Therapy",
    img: "/assets/images/business-landing-page/BuImg8.png",
  },
  {
    name: "Health Practice",
    img: "/assets/images/business-landing-page/BuImg9.png",
  },
  {
    name: "Tattoo & Piercing",
    img: "/assets/images/business-landing-page/BuImg10.png",
  },
  {
    name: "Pet Grooming",
    img: "/assets/images/business-landing-page/BuImg11.png",
  },
  {
    name: "Tanning Studio",
    img: "/assets/images/business-landing-page/BuImg12.png",
  },
];

const BusinessCategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="tw-bg-white tw-py-20 tw-px-4">
      <div className="tw-max-w-6xl tw-mx-auto tw-text-center">
        <h3 className="tw-text-4xl tw-font-extrabold tw-mb-4">
          One platform, infinite possibilities
        </h3>
        <p className="tw-text-lg tw-text-gray-600 tw-mb-8">
          Everything you need to grow and thrive. Fresha is packed with tools to
          boost sales, manage your calendar, and retain clients, so you can
          focus on what you do best.
        </p>
        <button
          onClick={() => navigate("/business/signin")}
          className="tw-bg-black tw-text-white tw-font-semibold tw-px-8 tw-py-3 tw-rounded-full tw-text-base tw-shadow tw-mb-12"
        >
          Get started now <span className="tw-ml-2">&#8594;</span>
        </button>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-x-8 tw-gap-y-8 tw-mt-8 tw-justify-items-center">
          {categories.map((cat) => (
            <ProductCard key={cat.name} title={cat.name} image={cat.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessCategoriesSection;
