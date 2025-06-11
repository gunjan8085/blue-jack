import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@components/users/static/Header";
import { IoOptions } from "react-icons/io5";
import FilterModal from "@components/users/static/FilterModal";
import SearchResultCard from "@components/users/static/SearchResultCard";

const Search = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className="">
      <Header />
      <div className="tw-container tw-mx-auto tw-py-8 tw-max-w-7xl" >
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4 ">
          <h1 className="text-xl tw-font-bold">37 venues nearby</h1>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="tw-bg-gray-100 tw-hover:bg-gray-200 tw-text-gray-700 tw-py-2 tw-px-4 tw-gap-1 tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none"
          >
            <IoOptions />
            Filters
          </button>
        </div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
          {businessData.map((business, index) => (
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
              <SearchResultCard key={index} business={business} />
            </motion.div>
          ))}
        </div>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Search;
const businessData = [
  {
    id: "1",
    name: "You Do You Hair Studio",
    rating: 4.9,
    reviewCount: 566,
    location: "Santacruz West, Mumbai",
    images: ["/assets/img/1.avif", "/assets/img/2.avif"],
    services: [
      { name: "Haircut with Nikita (FOR NAPE AND LONGER)", price: "2,500" },
      { name: "Haircut with Dwyesh (FOR PIXIE / BUZZER CUTS)", price: "2,000" },
      { name: "Haircut with Dwyesh (FOR NAPE AND LONGER)", price: "2,500" },
      { name: "Balayage", price: "6,500" }, // Added more services to test "See more"
      { name: "Highlights", price: "5,000" },
    ],
  },
  {
    id: "2",
    name: "Another Salon",
    rating: 4.5,
    reviewCount: 320,
    location: "Andheri, Mumbai",
    images: ["/assets/img/3.avif"],
    services: [
      { name: "Facial", price: "1,500" },
      { name: "Manicure", price: "800" },
      { name: "Pedicure", price: "1,000" },
    ],
  },
  {
    id: "3",
    name: "Spa & Wellness Center",
    rating: 4.7,
    reviewCount: 480,
    location: "Bandra, Mumbai",
    images: ["/assets/img/4.avif"],
    services: [
      { name: "Massage Therapy", price: "3,000" },
      { name: "Yoga Session", price: "1,200" },
      { name: "Aromatherapy", price: "2,500" },
    ],
  },
  {
    id: "4",
    name: "Nail Studio",
    rating: 4.6,
    reviewCount: 250,
    location: "Juhu, Mumbai",
    images: ["/assets/img/5.avif"],
    services: [
      { name: "Gel Polish", price: "900" },
      { name: "Acrylic Nails", price: "1,500" },
      { name: "Nail Art", price: "1,200" },
    ],
  },
  {
    id: "5",
    name: "Barber Shop",
    rating: 4.8,
    reviewCount: 600,
    location: "Powai, Mumbai",
    images: [
      "/assets/img/service1.png",
      "/assets/img/service2.png",
      "/assets/img/service3.png",
    ],
    services: [
      { name: "Haircut", price: "700" },
      { name: "Beard Trim", price: "500" },
      { name: "Shaving", price: "600" },
    ],
  },
];
