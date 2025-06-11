import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import SalonCard from "./SalonCard";
import { useNavigate } from "react-router-dom";

const Services = React.forwardRef((props, ref) => {
  // Sample categories (will come from backend later)
  const categories = [
    "Featured",
    "Barbering",
    "Academy Courses",
    "Haircut",
    "Hair Styling",
    "Hair Color (Basic)",
    "Hair Color (Creative)",
    "Treatments & Rituals",
    "Texture Treatment",
  ];

  // Sample services data grouped by category
  const allServices = {
    Featured: [
      { name: "Signature Haircut", price: "₹3,000" },
      { name: "Premium Coloring", price: "₹4,500" },
    ],
    Barbering: [
      { name: "Classic Beard Trim", price: "₹1,200" },
      { name: "Royal Shave", price: "₹1,800" },
    ],
    Haircut: [
      { name: "Haircut with Nikita (FOR NAPE AND LONGER)", price: "₹2,500" },
      { name: "Haircut with Dwyesh (FOR PIXIE/BUZZER)", price: "₹2,000" },
    ],
    // ...add other categories
  };

  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef(null);

  // Handle horizontal scroll with buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "next" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };
  const navigate = useNavigate();
  const goToServices = () => {
    navigate("/services");
  };
  return (
    <section
      id="services"
      ref={ref}
      className="tw-container tw-mx-auto tw-py-8"
    >
      {/* Categories Navbar */}

      {/* Services Display */}
      <div className="tw-flex tw-gap-12 tw-mx-12">
        <div className="tw-w-3/5">
          <div className="tw-relative tw-mb-8">
            <div className="tw-flex tw-items-center tw-space-x-4">
              <button
                onClick={() => scroll("prev")}
                className="tw-p-2 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200"
              >
                ‹
              </button>

              <div
                ref={scrollRef}
                className="tw-flex tw-space-x-2 tw-overflow-x-auto tw-no-scrollbar tw-py-2"
              >
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`tw-px-4 tw-py-2 tw-rounded-full tw-whitespace-nowrap text-sm ${
                      selectedCategory === category
                        ? "tw-bg-black tw-text-white"
                        : "tw-bg-gray-200 hover:tw-bg-gray-200"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => scroll("next")}
                className="tw-p-2 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200"
              >
                ›
              </button>
            </div>
          </div>
          <h2 className="text-2xl tw-font-bold tw-mb-6">{selectedCategory}</h2>

          {allServices[selectedCategory]
            ?.slice(0, showAll ? undefined : 3)
            ?.map((service, index) => (
              <div
                key={index}
                className="tw-border tw-shadow-md text-sm tw-p-4 tw-max-w-3xl hover:tw-bg-gray-50 tw-bg-white tw-my-4 tw-rounded-2xl tw-flex tw-items-center tw-justify-between"
              >
                <div>
                  {" "}
                  <p className="tw-font-medium">{service.name}</p>
                  <p className="tw-text-gray-400">50 mins</p>
                  <p className="tw-text-gray-600">{service.price}</p>
                </div>
                <button
                  className="tw-bg-gray-200 tw-p-2 tw-rounded-lg tw-text-center"
                  onClick={goToServices}
                >
                  Book
                </button>
              </div>
            ))}

          <button
            onClick={goToServices}
            className="tw-mt-4 tw-text-blue-600 hover:tw-underline tw-cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="">
          <SalonCard />
        </div>
      </div>
    </section>
  );
});

export default Services;
