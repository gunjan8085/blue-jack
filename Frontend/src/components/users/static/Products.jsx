import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";

const data = {
  recommended: [
    {
      title: "Antibes Salon Seef",
      rating: "4.9",
      reviews: "209",
      location: "Seef, Manama",
      category: "Barbershop",
      image: "/assets/img/img1.png", // Replace with actual image URLs
    },
    {
      title: "Elegant | المنزل",
      rating: "4.9",
      reviews: "194",
      location: "Home Service, Riyadh",
      category: "Spa",
      image: "/assets/img/img2.png",
    },
    // Add more objects for the "Recommended" section
  ],
  newToFresha: [
    {
      title: "Arealyou Premium Salon",
      rating: "4.6",
      reviews: "31",
      location: "Udaipur",
      category: "Hair Salon",
      image: "/assets/img/img3.png",
    },
    // Add more objects for "New to Fresha"
  ],
  trending: [
    {
      title: "Hair Castle - Dombivli",
      rating: "5.0",
      reviews: "20",
      location: "Dombivli East, Dombivli",
      category: "Hair Salon",
      image: "/assets/img/img1.png",
    },
    // Add more objects for "Trending"
  ],
};

const Section = ({ title, data }) => {
  return (
    <motion.div
      className="tw-mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: false }}
    >
      <h5 className="tw-text-xl tw-font-bold tw-mb-4">{title}</h5>
      <div className="tw-w-full tw-justify-center tw-items-center tw-flex">
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-12 tw-p-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1, // Cards will appear one by one
              }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-b tw-from-purple-100 tw-to-purple-200 tw-py-10 tw-px-6">
      <div className="tw-max-w-7xl tw-mx-auto">
        <Section title="Recommended" data={data.recommended} />
        <Section title="New to Fresha" data={data.newToFresha} />
        <Section title="Trending" data={data.trending} />
      </div>
    </div>
  );
};

export default Products;
