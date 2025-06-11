import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";

const FilterModal = ({ isOpen, onClose }) => {
  const [sortBy, setSortBy] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(40000);
  const [venueType, setVenueType] = useState("everyone");

  const handleApplyFilters = () => {
    console.log("Applying filters:", { sortBy, maxPrice, venueType });
    onClose();
  };

  const handleClearAll = () => {
    setSortBy("recommended");
    setMaxPrice(40000);
    setVenueType("everyone");
    console.log("Filters reset to default");
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Higher = snappier (default: 100)
        damping: 15, // Lower = less oscillation (default: 10-20)
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="tw-bg-white tw-rounded-3xl tw-p-8 tw-w-11/12 tw-max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
              <h2 className="text-2xl tw-font-bold">Filters</h2>
              <button onClick={onClose} className="focus:tw-outline-none">
                <IoIosCloseCircleOutline size={36} />
              </button>
            </div>

            {/* Sort By Section */}
            <div className="tw-mb-6">
              <h3 className="text-lg tw-font-semibold tw-mb-3">Sort by</h3>
              <div className="tw-flex tw-flex-col tw-space-y-2">
                {["recommended", "nearest", "top-rated"].map((option) => (
                  <label
                    key={option}
                    className={`tw-flex tw-items-center tw-p-1 tw-w-40 tw-rounded-lg tw-cursor-pointer ${
                      sortBy === option
                        ? "tw-bg-purple-100 tw-border tw-border-purple-500"
                        : "tw-bg-gray-100 tw-border tw-border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={sortBy === option}
                      onChange={() => setSortBy(option)}
                      className="tw-mr-3"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Maximum Price Section */}
            <div className="tw-mb-6">
              <h3 className="text-lg tw-font-semibold tw-mb-3">
                Maximum price
              </h3>
              <div className="tw-flex tw-items-center">
                <input
                  type="range"
                  min="0"
                  max="40000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="tw-w-full tw-slider focus:tw-outline-none tw-h-1"
                  style={{
                    background: `linear-gradient(to right,rgb(159, 133, 220) ${
                      (maxPrice / 40000) * 100
                    }%, #e5e7eb ${(maxPrice / 40000) * 100}%)`,
                  }}
                />
                <span className="tw-ml-3">₹{maxPrice}</span>
              </div>
            </div>

            {/* Venue Type Section */}
            <div className="tw-mb-6">
              <h3 className="text-lg tw-font-semibold tw-mb-3">Venue type</h3>
              <div className="tw-flex tw-space-x-3">
                {["everyone", "female", "male"].map((type) => (
                  <button
                    key={type}
                    className={`tw-py-2 tw-px-4 tw-rounded-full focus:tw-outline-none ${
                      venueType === type
                        ? "tw-bg-purple-600 tw-text-white"
                        : "tw-bg-gray-200 tw-text-gray-700"
                    }`}
                    onClick={() => setVenueType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="tw-flex tw-justify-between tw-items-center">
              <button
                onClick={handleClearAll}
                className="tw-bg-gray-300 tw-text-black tw-py-3 tw-px-6 tw-rounded-full focus:tw-outline-none"
              >
                Clear all
              </button>
              <button
                onClick={handleApplyFilters}
                className="tw-bg-black tw-text-white tw-py-3 tw-px-6 tw-rounded-full focus:tw-outline-none"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
