"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const featureSets = [
  [
    {
      title: "Appointment Calendar",
      desc: "Effortlessly schedule, manage, and track customer appointments with a smart, user-friendly calendar interface.",
      image: "200.png",
      imageAlt: "Appointment Calendar",
    },
    {
      title: "Point of Sale",
      desc: "Streamline transactions with a modern, intuitive POS system that supports fast billing, inventory sync, and real-time insights.",
      image:
        "https://res.cloudinary.com/dfcbjgt3w/image/upload/v1746258989/brave_screenshot_localhost_3_noxovm.png",
      imageAlt: "POS System",
    },
    {
      title: "Online Booking",
      desc: "Offer your customers the convenience of hassle-free online booking with real-time availability and instant confirmations.",
      image:
        "https://res.cloudinary.com/dfcbjgt3w/image/upload/v1746531061/-09_wjofzz.svg",
      imageAlt: "Online Booking",
    },
    {
      title: "Payments",
      desc: "Enjoy smooth, secure, and instant payments with ZifyPay. Pay, save, and grow effortlessly—all in one place.",
      graphValue: "Up to 50%",
    },
  ],
  [
    {
      title: "Smart Analytics",
      desc: "Gain actionable insights with real-time dashboards that track sales, expenses, and customer trends in one place.",
      image:
        "https://res.cloudinary.com/dfcbjgt3w/image/upload/v1746258989/brave_screenshot_localhost_3_noxovm.png",
      imageAlt: "Analytics Dashboard",
    },
    {
      title: "Security",
      desc: "Protect your business with enterprise-grade security features—role-based access, encrypted data, and real-time monitoring.",
      image:
        "https://imgs.search.brave.com/CFSd1tBGNh2jTt5Jp6YBc1eAc-dSZfquYbeyNEpQjAo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ0/MjQ4NDg2NC9waG90/by9wZW9wbGUtbmV0/d29yay1zZWN1cml0/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bUxoS250WXhi/cl9KYVYybUdjTHJZ/RWZjVFRtenNscFEz/R0xvUVlmMlQxYz0",
      imageAlt: "Security Shield",
    },
    {
      title: "Fuel Pump Integration",
      desc: "Seamlessly connect and control your fuel pumps in real-time with our POS system—track fuel sales and monitor activity effortlessly.",
      image: "/fuel1.jpg",
      imageAlt: "Fuel Pump Integration",
    },
    {
      title: "Financial Support",
      desc: "Empower your business with fast, reliable financial assistance—from working capital to daily cash flow.",
      image:
        "https://imgs.search.brave.com/dkk9y-5oEzHGc0u4LiEqjDBKEBppQOUFJXGLv_Ppxxg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTYv/OTU4LzU0MS9zbWFs/bC9ydXN0aWMtbG9h/bi1zaWduLXdpdGgt/YnVybGFwLXNhY2st/YmFja2dyb3VuZC1w/aG90by5qcGc",
      imageAlt: "Financial Support",
    },
  ],
];

const FinancialWorkflows = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % featureSets.length);
      }, 4000);
      return () => clearInterval(interval);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  const currentSet = featureSets[index];

  return (
    <section
      ref={sectionRef}
      className=" text-white px-4 md:px-20 py-12 md:py-20 mt-24"
    >
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-4xl font-inter mb-4">
          All your financial workflows. One platform.
        </h2>
        <p className="text-gray-300 text-lg">
          Everything you need to control spend before it happens and empower
          teams confidently.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {currentSet.map((feature, i) => (
            <div
              key={i}
              className="bg-[#122049] rounded-2xl p-6 shadow-md flex flex-col justify-between"
              style={{ fontFamily: "'Proxima Nova', sans-serif" }}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{feature.desc}</p>
              </div>

              {feature.image && (
                <div className="relative w-full h-40 mt-auto">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    layout="fill"
                    className={`rounded-2xl ${i === 1 ? "h-full w-full" : "object-contain"}`}
                    loading="lazy"
                  />
                </div>
              )}

              {feature.graphValue && (
                <div className="mt-4 bg-gradient-to-tr from-sky-900 to-blue-400 rounded-lg h-[140px] flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow-md text-black font-bold text-lg">
                    {feature.graphValue}
                    <span className="text-sm font-medium text-gray-600 ml-1">
                      Saved
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default FinancialWorkflows;