import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
const SearchResultCard = ({ business }) => {
  const [showAllServices, setShowAllServices] = useState(false);
  const displayedServices = showAllServices
    ? business.services
    : business?.services?.slice(0, 3);

  return (
    <motion.div
      className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden hover:tw-scale-105 tw-cursor-pointer tw-transition-transform tw-duration-300"
      layoutId={`business-card-${business.id}`}
    >
      <Link to={`/business/${business.id}`} className="tw-block">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={true}
        >
          {business.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={business.name}
                className="tw-w-full tw-h-48 tw-object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="tw-p-4">
          <div className="tw-flex tw-items-center tw-mb-2">
            <span className="tw-text-yellow-500 tw-mr-1">★★★★★</span>
            <span className="tw-text-gray-700 tw-font-semibold">
              {business.rating}
            </span>
            <span className="tw-text-gray-500 tw-ml-1">
              ({business.reviewCount})
            </span>
          </div>
          <h2 className="text-xl tw-font-bold tw-mb-1">{business.name}</h2>
          <p className="tw-text-gray-600 tw-text-sm tw-mb-4">
            {business.location}
          </p>
          <ul>
            {displayedServices.map((service, index) => (
              <li
                key={index}
                className="tw-flex tw-justify-between tw-items-center tw-py-1 tw-border-b tw-border-gray-200 last:tw-border-none hover:tw-bg-gray-100 tw-px-1 tw-rounded-md"
              >
                <span className="tw-text-gray-700 text-sm">{service.name}</span>
                <span className="tw-text-gray-900 text-sm">
                  ₹{service.price}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="tw-mt-4 text-sm tw-text-blue-500 tw-font-semibold focus:tw-outline-none hover:tw-scale-110"
          >
            {showAllServices ? "See less" : "See more"}
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default SearchResultCard;
