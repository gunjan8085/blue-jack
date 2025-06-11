import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BusinessDetails = () => {
  const { id } = useParams();
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Featured"); // Start with "Featured"
  const serviceCategoriesRef = useRef({});

  // Fetch business data based on ID (replace with your actual API call)
  const business = {
    id: "1",
    name: "You Do You Hair Studio",
    rating: 4.9,
    reviewCount: 566,
    location: "Santacruz West, Mumbai",
    images: [
      "https://pplx-res.cloudinary.com/image/upload/v1742979724/user_uploads/lcRHTiZAHAcZZPD/image.jpg",
      "https://via.placeholder.com/600x400/F0F0F0/000000?text=Image+2",
      "https://via.placeholder.com/600x400/E0E0E0/000000?text=Image+3",
    ],
    services: [
      {
        id: "1",
        name: "Haircut with Nikita (FOR NAPE AND LONGER)",
        price: 2500,
        category: "Featured",
        description:
          "This service includes hair wash and hair cut with basic styling (Blow dry or scrunching).",
        duration: "1 hr",
      },
      {
        id: "2",
        name: "Haircut with Dwyesh (FOR PIXIE / BUZZER CUTS)",
        price: 2000,
        category: "Featured",
        description: "Hair wash, cut and styling",
        duration: "1 hr",
      },
      {
        id: "3",
        name: "Haircut with Dwyesh (FOR NAPE AND LONGER)",
        price: 2500,
        category: "Featured",
        description:
          "This service includes hair wash and hair cut with basic styling (Blow dry or scrunching).",
        duration: "1 hr",
      },
      {
        id: "4",
        name: "Ultimate Repair Damage therapy",
        price: 1800,
        category: "Hair Treatment",
        description:
          "This 45 mins service helps reduce your hair breakage by 99% and leaves your hair ...",
        duration: "1 hr",
      },
      {
        id: "5",
        name: "Olaplex",
        price: 3800,
        category: "Hair Treatment",
        description:
          "This stand alone olaplex treatment repairs the damaged due to excess ch...",
        duration: "1 hr",
      },
      {
        id: "6",
        name: "Olaplex Chelating Treatment",
        price: 2500,
        category: "Hair Treatment",
        description:
          "Olaplex Broad Spectrum Chelating Treatment is a professional - strength, high- p...",
        duration: "1 hr",
      },
      {
        id: "7",
        name: "K18 Treatment - Add on with colour service/ cuts and styling",
        price: 1500,
        category: "Hair Treatment",
        description:
          "K18 is built to strengthen the inner most layers of hair, it’s bio active peptide (amin...",
        duration: "15 mins",
      },
      // Add more services in different categories
      { id: "8", name: "Balayage", price: 6500, category: "Hair colour" },
      { id: "9", name: "Highlights", price: 5000, category: "Hair colour" },
      { id: "10", name: "Manicure", price: 800, category: "Nails" },
      { id: "11", name: "Pedicure", price: 1000, category: "Nails" },
      { id: "12", name: "Acrylic Nails", price: 1500, category: "Nails" },
      { id: "13", name: "Haircut", price: 700, category: "Cuts & Styling" },
      { id: "14", name: "Beard Trim", price: 500, category: "Cuts & Styling" },
      { id: "15", name: "Shaving", price: 600, category: "Cuts & Styling" },
      { id: "16", name: "Hair Spa", price: 1200, category: "Hair Treatment" },
    ],
  };

  const categories = [
    "Featured",
    "Cuts & Styling",
    "Hair colour",
    "Hair Treatment",
    "Nails",
    "Management",
  ]; // Make sure "Featured" is first

  const handleServiceToggle = (service) => {
    setSelectedServices((prevSelected) => {
      const alreadySelected = prevSelected.some((s) => s.id === service.id);
      if (alreadySelected) {
        return prevSelected.filter((s) => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  const getTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const category = entry.target.dataset.category;
            setActiveCategory(category);
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%", // Adjust rootMargin to trigger earlier
      }
    );

    Object.values(serviceCategoriesRef.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      Object.values(serviceCategoriesRef.current).forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [business.services]);

  return (
    <div className="tw-bg-gray-50 tw-min-h-screen tw-py-8">
      <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
        {/* Service Selection Section */}
        <div className="lg:tw-col-span-2">
          {/* Top Navigation - Fixed */}
          <div className="tw-bg-white tw-py-3 tw-px-4 tw-border-b tw-border-gray-200 tw-sticky tw-top-0 tw-z-10">
            <span className="tw-text-gray-500">Services</span>
            <span className="tw-mx-1"> {">"} </span>
            <span className="tw-text-gray-500">Professional</span>
            <span className="tw-mx-1"> {">"}</span>
            <span className="tw-text-gray-500">Time</span>
            <span className="tw-mx-1"> {">"}</span>
            <span className="tw-text-gray-700 tw-font-semibold">Confirm</span>
            {/* Active Category Display */}
          </div>
          <div className="tw-bg-white tw-py-3 tw-px-4 tw-border-b tw-border-gray-200 tw-sticky tw-top-[50px] tw-z-10">
            <div className="tw-flex tw-space-x-4 tw-overflow-x-auto tw-scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tw-py-2 tw-px-4 tw-rounded-full focus:tw-outline-none tw-whitespace-nowrap ${
                    activeCategory === category
                      ? "tw-bg-black tw-text-white"
                      : "tw-bg-gray-200 tw-text-gray-700"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    // Scroll to the category
                    const element = serviceCategoriesRef.current[category];
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  {category}
                </button>
              ))}
              <button>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Service List - Scrollable */}
          <div className="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-y-auto tw-max-h-[calc(100vh-200px)]">
            {" "}
            {/* Adjust max-h as needed */}
            {categories.map((category) => (
              <div
                key={category}
                ref={(el) => (serviceCategoriesRef.current[category] = el)}
                data-category={category}
              >
                <h2 className="text-xl tw-font-semibold tw-mb-4">{category}</h2>
                {business.services
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <motion.div
                      key={service.id}
                      className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-4 tw-flex tw-justify-between tw-items-center"
                      whileHover={{ backgroundColor: "#E2E8F0" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <h3 className="text-lg tw-font-medium">
                          {service.name}
                        </h3>
                        <div className="tw-flex tw-items-center tw-text-gray-600 tw-text-sm">
                          <span>{service.duration}</span>
                        </div>
                        <p className="tw-text-gray-500 tw-text-sm">
                          {service.description}
                        </p>
                        <p className="tw-mt-2 tw-font-semibold">
                          ₹{service.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleServiceToggle(service)}
                        className={`tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center focus:tw-outline-none ${
                          selectedServices.some((s) => s.id === service.id)
                            ? "tw-bg-purple-600 tw-text-white"
                            : "tw-bg-gray-200 tw-text-gray-700"
                        }`}
                      >
                        +
                      </button>
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Services Section - Fixed */}
        <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden tw-sticky tw-top-0">
          <div className="tw-p-4 tw-border-b tw-border-gray-200">
            <div className="tw-flex tw-items-center tw-mb-2">
              <span className="tw-text-yellow-500 tw-mr-1">★★★★★</span>
              <span className="tw-text-gray-700 tw-font-semibold">
                {business.rating}
              </span>
              <span className="tw-text-gray-500 tw-ml-1">
                ({business.reviewCount})
              </span>
            </div>
            <h2 className="text-2xl tw-font-semibold tw-mb-2">
              {business.name}
            </h2>
            <p className="tw-text-gray-600 tw-text-sm">{business.location}</p>
          </div>
          <div className="tw-p-4">
            {selectedServices.length === 0 ? (
              <p className="tw-text-gray-500">No services selected</p>
            ) : (
              <ul>
                {selectedServices.map((service) => (
                  <li
                    key={service.id}
                    className="tw-flex text-sm tw-justify-between tw-items-center tw-py-2 tw-border-b tw-border-gray-200 last:tw-border-none"
                  >
                    <span className="tw-text-gray-700">{service.name}</span>
                    <span className="tw-text-gray-900">₹{service.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="tw-p-4 tw-border-t tw-border-gray-200 tw-mt-4">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
              <span className="tw-text-gray-700 tw-font-semibold">Total</span>
              <span className="tw-text-gray-900">₹{getTotalPrice()}</span>
            </div>
            <button className="tw-bg-black tw-text-white tw-py-3 tw-mt-4 tw-px-6 tw-text-center tw-rounded-full tw-w-full focus:tw-outline-none">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
