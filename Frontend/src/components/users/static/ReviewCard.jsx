import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { motion } from "framer-motion";

const ReviewCard = ({ title, review, name, location }) => {
  return (
    <motion.div
      className="tw-p-4 tw-rounded-lg tw-shadow-md tw-bg-white tw-w-full tw-max-w-xs"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="tw-flex tw-justify-center tw-text-yellow-500 tw-text-xl">
        ★★★★★
      </div>
      <h3 className="text-2xl tw-font-semibold tw-mb-2 tw-text-center">
        {title}
      </h3>
      <p className="tw-text-sm tw-text-gray-600 tw-mb-4 tw-text-center">
        {review}
      </p>
      <div className="tw-flex tw-items-center tw-justify-center">
        <span className="material-symbols-outlined">verified</span>
        <div className="tw-text-gray-800 tw-font-medium">{name}</div>
      </div>
      <div className="tw-flex tw-items-center tw-justify-center">
        <p className="tw-text-gray-500 tw-text-xs">{location}</p>
      </div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const reviewsData = [
    {
      title: "The best booking system",
      review:
        "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
      name: "Lucy",
      location: "London, UK",
    },
    {
      title: "Easy to use & explore",
      review:
        "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
      name: "Dan",
      location: "New York, USA",
    },
    {
      title: "Great for finding barbers",
      review:
        "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
      name: "Dale",
      location: "Sydney, Australia",
    },
    {
      title: "My go-to for self-care",
      review:
        "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
      name: "Cameron",
      location: "Edinburgh, UK",
    },
  ];

  return (
    <div className="tw-py-12 tw-px-24">
      <h5 className="tw-text-2xl tw-font-bold tw-text-left tw-mb-8">
        Reviews
      </h5>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {reviewsData.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const CombinedSection = () => {
  return (
    <div>
      <ReviewsSection />
    </div>
  );
};

export default CombinedSection;
