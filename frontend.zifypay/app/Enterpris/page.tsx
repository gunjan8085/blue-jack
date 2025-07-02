"use client"

import link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Navbar from "@/components/landingPage/Navbar"
import Footer from "@/components/Footer"
import SquareSection from "@/components/square-section"

// --- Section Data ---
const heroSection = {
  title: "ZifyPay for Enterprise",
  subtitle:
    "Built to power complex operations, multi-location control, and high-volume transactions  all from a single platform.",
  image: "/clothing/image.png", // Update image path if needed
  cta: [
    { label: "Request a demo", variant: "primary" },
    { label: "Talk to enterprise team", variant: "secondary" },
  ],
};

const experienceSection = {
  title: "Enterprise-grade performance at every customer touchpoint",
  features: [
    {
      heading: "Seamless, Scalable Payment Infrastructure",
      points: [
        "Accept payments at counters, terminals, mobile kiosks, or via custom enterprise APIs.",
        "Support for tap, chip, swipe, QR, and digital wallet transactions across all locations.",
        "Customizable enterprise POS that aligns with operational workflows and branding.",
        "Integrate payment logic into events, loyalty programs, and location-based campaigns.",
      ],
      image: "enter.png",
      imageAlt: "Enterprise payment system in use",
      imageLeft: false,
    },
    {
      heading: "Real-time Inventory Intelligence",
      points: [
        "Sync stock and pricing across warehouses, storefronts, and fulfillment centers.",
        "Set automated stock thresholds and replenishment triggers across product categories.",
        "Bulk upload, manage SKUs, and reconcile across regions and channels with ease.",
        "Drive purchasing decisions using live data on turnover rates, margins, and demand shifts.",
      ],
      image: "enter2.png",
      imageAlt: "Inventory management dashboard",
      imageLeft: true,
    },
  ],
};




const moreWaysSection = [
  {
    title: "ZifyPay Capital",
    description:
      "Flexible working capital solutions designed for multi-location enterprises. Access high-limit credit lines with transparent repayment linked to your business performance.",
    link: "Explore Enterprise Lending →",
  },
  {
    title: "Automated Reconciliation",
    description:
      "Streamline financial operations with automated multi-location reconciliation, smart ledger matching, and integration with your ERP and accounting systems.",
    link: "Simplify Reconciliation →",
  },
  {
    title: "Custom Integrations & APIs",
    description:
      "Connect ZifyPay directly to your internal systems. Use our open APIs and SDKs to extend functionality and tailor workflows to your enterprise architecture.",
    link: "Explore Developer Solutions →",
  },
  {
    title: "Real-time Business Intelligence",
    description:
      "Unlock enterprise-wide visibility with dashboards built for regional managers, finance leads, and executives. Turn real-time payment, staff, and sales data into decisions.",
    link: "See Insights in Action →",
  },
];


export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          {" "}
          {/* Increased py-20 to py-24 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <h1 className="text-6xl font-extrabold text-gray-900 mb-8 animate-fade-in-up">
                {" "}
                {/* text-5xl to text-6xl, font-bold to font-extrabold, mb-6 to mb-8 */}
                {heroSection.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <p className="text-2xl text-gray-700 mb-10 animate-fade-in-up animation-delay-200">
                {" "}
                {/* text-xl to text-2xl, mb-8 to mb-10, text-gray-600 to text-gray-700 */}
                {heroSection.subtitle}
              </p>
              <a href="/Book-A-Demo">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow hover:shadow-lg">
                  Book a Demo
                </button>
              </a>
            </div>
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-lg blur-xl animate-pulse"></div>
              <Image
                src={heroSection.image}
                alt="Hero image"
                width={600}
                height={400}
                className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Give customers best experience */}
      <section className="py-24 relative">
        {" "}
        {/* py-20 to py-24 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-20 animate-fade-in-up">
            {" "}
            {/* text-4xl to text-5xl, font-bold to font-extrabold, mb-16 to mb-20 */}
            {experienceSection.title}
          </h2>
          {experienceSection.features.map((feature, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
            >
              {" "}
              {/* mb-20 to mb-24 */}
              {feature.imageLeft && (
                <div className="animate-slide-in-left">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={500}
                      height={400}
                      className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
              <div
                className={
                  feature.imageLeft
                    ? "animate-slide-in-right"
                    : "animate-slide-in-left"
                }
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  {" "}
                  {/* text-2xl to text-3xl, mb-6 to mb-8 */}
                  {feature.heading}
                </h3>
                <div className="space-y-6">
                  {" "}
                  {/* space-y-4 to space-y-6 */}
                  {feature.points.map((text, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 animate-fade-in-up" /* space-x-3 to space-x-4 */
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>{" "}
                      {/* w-2 h-2 to w-3 h-3 */}
                      <p className="text-lg text-gray-700">
                        {" "}
                        {/* text-gray-700, text-lg */}
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {!feature.imageLeft && (
                <div className="animate-slide-in-right">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={500}
                      height={400}
                      className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Keep customers coming back */}

      {/* More ways to grow */}
      <section className="py-24 relative">
        {" "}
        {/* py-20 to py-24 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-20 animate-fade-in-up">
            {" "}
            {/* text-4xl to text-5xl, font-bold to font-extrabold, mb-16 to mb-20 */}
            More ways to grow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {" "}
            {/* gap-8 to gap-12 */}
            {moreWaysSection.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-0 shadow-lg"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  {" "}
                  {/* p-6 to p-8 */}
                  <div className="flex items-start space-x-6">
                    {" "}
                    {/* space-x-4 to space-x-6 */}
                    <div className="w-24 h-8 rounded-2xl flex items-center justify-center  bg-blue-600"></div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>{" "}
                      {/* text-xl to text-2xl, mb-2 to mb-4 */}
                      <p className="text-lg text-gray-700 mb-6">
                        {item.description}
                      </p>{" "}
                      {/* text-gray-700, text-lg, mb-4 to mb-6 */}
                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Square Section Component - Hardware, Carousel, Try Square, and FAQ */}
      <SquareSection />

      <Footer />
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
