import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const VenuesNearby = () => {
  const venues = [
    {
      name: "The Lair Man",
      rating: "4.8",
      reviews: "(199)",
      location: "Khar West, Khar, Mumbai",
      type: "Barbershop",
      image: "/assets/img/1.avif",
    },
    {
      name: "Ten Beauty Bar",
      rating: "4.8",
      reviews: "(24)",
      location: "Bandra West, Mumbai",
      type: "Nail Salon",
      image: "/assets/img/2.avif",
    },
    {
      name: "Nomad Barber – Mumbai",
      rating: "4.9",
      reviews: "(51)",
      location: "Khar West, Mumbai",
      type: "Barbershop",
      image: "/assets/img/3.avif",
    },
    {
      name: "Love.Hair Studio",
      rating: "5.0",
      reviews: "(83)",
      location: "Bandra West, Mumbai",
      type: "Hair Salon",
      image: "/assets/img/4.avif",
    },
    {
      name: "Love.Hair Studio",
      rating: "5.0",
      reviews: "(83)",
      location: "Bandra West, Mumbai",
      type: "Hair Salon",
      image: "/assets/img/4.avif",
    },
    {
      name: "Love.Hair Studio",
      rating: "5.0",
      reviews: "(83)",
      location: "Bandra West, Mumbai",
      type: "Hair Salon",
      image: "/assets/img/4.avif",
    },
  ];

  return (
    <section
      id="venues-nearby"
      className="tw-container tw-mx-auto tw-py-8 tw-relative"
    >
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h2 className="text-2xl tw-font-bold">Venues Nearby</h2>
        <button className="tw-text-blue-600 hover:tw-underline">
          View All →
        </button>
      </div>

      {/* Custom navigation buttons outside swiper */}
      {/* <div className="tw-absolute tw-top-1/2 tw--translate-y-1/2 tw-z-10 tw-w-full tw-hidden md:tw-block">
        <button className="swiper-button-prev tw-absolute tw-left-0 tw-bg-white tw-p-3 tw-rounded-full tw-shadow-md tw--ml-4" />
        <button className="swiper-button-next tw-absolute tw-right-0 tw-bg-white tw-p-3 tw-rounded-full tw-shadow-md tw--mr-4" />
      </div> */}

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".venues-pagination",
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {venues.map((venue, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="tw-border tw-rounded-xl tw-shadow-md tw-overflow-hidden tw-bg-white tw-h-full"
              whileHover={{ y: -5 }}
            >
              <div className="tw-relative tw-overflow-hidden tw-group">
                <motion.img
                  src={venue.image}
                  alt={venue.name}
                  className="tw-w-full tw-h-48 tw-object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="tw-absolute tw-bottom-2 tw-left-2 tw-bg-black/70 tw-text-white tw-px-2 tw-py-1 tw-rounded tw-text-sm">
                  {venue.type}
                </div>
              </div>

              <div className="tw-p-4">
                <h3 className="text-xl tw-font-semibold tw-mb-1">
                  {venue.name}
                </h3>
                <div className="tw-flex tw-items-center tw-mb-2">
                  <span className="tw-text-yellow-500">★</span>
                  <span className="tw-text-gray-800 tw-ml-1 tw-font-medium">
                    {venue.rating}
                  </span>
                  <span className="tw-text-gray-500 tw-ml-2">
                    {venue.reviews}
                  </span>
                </div>
                <p className="tw-text-gray-600 tw-text-sm">{venue.location}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination container - placed below cards */}
      <div className="venues-pagination tw-flex tw-justify-center tw-gap-1 tw-mt-6 tw-pt-4" />
    </section>
  );
};

export default VenuesNearby;
