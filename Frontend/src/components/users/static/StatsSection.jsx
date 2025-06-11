import React from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const StatsSection = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="tw-bg-gray-50 tw-py-16">
      <div className="tw-container tw-mx-auto tw-text-center">
        {/* Title */}
        <motion.h2
          className="text-2xl tw-font-bold tw-mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={0}
        >
          The top-rated destination for beauty and wellness
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="tw-text-gray-600 tw-mb-8"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={1}
        >
          One solution, one software. Trusted by the best in the beauty and
          wellness industry
        </motion.p>

        {/* Highlighted Stat */}
        <motion.div
          className="tw-mb-8"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          custom={2}
        >
          <h1 className="text-3xl tw-font-bold tw-text-[#0015FF]">
            1 Billion +
          </h1>
          <p className="tw-text-gray-700">Appointments booked on Fresha</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8 tw-mt-6">
          {/* Partner Businesses */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={3}
          >
            <div className="tw-text-4xl tw-font-bold tw-text-blue-600">
              <CountUp start={0} end={120000} duration={2} />
            </div>
            <p className="tw-text-gray-700">Partner businesses</p>
          </motion.div>

          {/* Countries */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={4}
          >
            <div className="tw-text-4xl tw-font-bold tw-text-blue-600">
              <CountUp start={0} end={120} duration={2} />
            </div>
            <p className="tw-text-gray-700">Countries using Fresha</p>
          </motion.div>

          {/* Stylists and Professionals */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={5}
          >
            <div className="tw-text-4xl tw-font-bold tw-text-blue-600">
              <CountUp start={0} end={450000} duration={2} />
            </div>
            <p className="tw-text-gray-700">Stylists and professionals</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
