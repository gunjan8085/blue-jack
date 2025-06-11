import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import CountUp from "./CountUp";
import Searchbar from "./Searchbar";

const Hero = () => {
  const navigate = useNavigate();

  const gradientControls = useAnimation();

  useEffect(() => {
    const animateGradient = async () => {
      // console.log("Starting gradient animation"); // Debug log
      while (true) {
        await gradientControls.start({
          x: ["-50%", "50%", "-50%"],
          //   y: ["-50%", "50%", "-50%"],
          transition: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        });
      }
    };
    animateGradient().catch(console.error); // Catch any animation errors
  }, [gradientControls]);

  return (
    <section className="tw-relative tw-min-h-screen tw-flex tw-flex-col">
      {/* Dynamic Gradient Ellipse */}
      <motion.div
        className="tw-absolute tw-w-[300%] tw-h-[300%] tw-bg-gradient-to-r tw-from-[#0015FF] tw-via-[#D7D4FF] tw-to-[#D7D4FF] tw-rounded-full tw-opacity-30"
        animate={gradientControls}
        style={{ filter: "blur(200px)", zIndex: -1 }}
      ></motion.div>

      {/* Header */}
      <Header />

      {/* Hero Content */}
      <motion.div
        className="tw-flex-grow tw-text-center tw-flex tw-flex-col tw-justify-center tw-px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="tw-text-4xl tw-font-extrabold tw-text-left tw-mb-4 tw-max-w-4xl tw-mx-auto tw-leading-[68px]"
          initial={{ x: "-20vh", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Book local beauty and wellness services
        </motion.h1>

        {/* Search Bar */}

        <Searchbar />
        <motion.p
          className="tw-text-lg tw-mb-6 tw-mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <CountUp start={0} end={217} duration={2} className="tw-font-bold" />{" "}
          appointments booked today
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
