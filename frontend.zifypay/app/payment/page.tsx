"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";
import SquareSection from "@/components/square-section";
import { ContentMarquee } from "@/components/content-marquee";
import { FeaturesShowcase } from "@/components/features-showcase";

// --- Section Data ---
const heroSection = {
  title: "Payments & Compliance | ZifyPay.",
  subtitle:
    "At ZifyPay, we ensure your fuel and retail operations run smoothly—not just at the counter, but across every transaction, regulation, and security checkpoint. Our systems are designed for seamless operations, full accountability, and peace of mind.",
  image: "/pay1.png",
  cta: [
    { label: "Get started", variant: "primary" },
    { label: "Contact sales", variant: "secondary" },
  ],
};

const experienceSection = {
  title: "Give your customers the best experience",
  features: [
    {
      heading: "Take payments seamlessly",
      points: [
        "Take payments from the counter on the floor, or anywhere else that makes sense.",
        "Fast tap, dip, swipe that lets customers pay how they want.",
        "Quickly check out customers with a POS and that you can customize to fit your workflow.",
        "Expand your offerings by hosting events, workshops, or pop-ups with Square Appointments.",
      ],
      image: "/placeholder.svg?height=400&width=500",
      imageAlt: "Woman using tablet for payments",
      imageLeft: false,
    },
    {
      heading: "Stay on top of stock",
      points: [
        "Automatically sync inventory across locations and devices.",
        "Stay stocked and ready with automatic alerts that let you know when it's time to restock.",
        "Send purchase orders and easily receive stock with bulk inventory intake.",
        "Use insights on sales trends, profit margins, and top-performing plants and items to make informed decisions.",
      ],
      image: "/placeholder.svg?height=400&width=500",
      imageAlt: "Man in business attire working with plants",
      imageLeft: true,
    },
  ],
};

const loyaltySection = {
  features: [
    {
      heading: "Keep customers coming back",
      points: [
        "Build profiles for your customers and track their preferences with every purchase.",
        "Reward customers with loyalty programs and discounts that keep them coming back.",
        "Share how customers can place or reserve pick-up orders.",
        "Encourage repeat visits with Square Loyalty and keep customers engaged with Square Marketing.",
      ],
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: "Person in cap working in garden center",
      imageLeft: false,
    },
    {
      heading: "Lead your team",
      points: [
        "Give your team the tools they need to be successful.",
        "Track different roles, schedules, hours, and more with one type of employee.",
        "Motivate staff to upsell and cross-sell with availability.",
        "Pay your employees based on tracked hours and automatically track overtime.",
      ],
      image: "/placeholder.svg?height=200&width=400",
      imageAlt: "Silhouettes of people walking",
      imageLeft: true,
    },
  ],
  testimonial: {
    leftImg: "/clothing/testimonial-left.jpg",
    rightImg: "/clothing/testimonial-right.jpg",
    name: "Hank Gregg",
    location: "Market at Grelen Somerset, VA",
    quote:
      "Because we're such a large company, having Square organize all the items behind the scenes gives us the freedom to interact with our clients, help the local community, and continue to grow in the ways that we really want to.",
    link: { href: "#", label: "See all Stories ↗" },
  },
};

const moreWaysSection = [
  {
    title: "Square Loans*",
    description:
      "Get funding to make your next move with Square Capital. Repay as a percentage of your daily sales, so payments based on your daily sales.",
    link: "Explore Square Loans →",
  },
  {
    title: "Square Checking",
    description:
      "Your Square sales are automatically (and instantly) deposited into your checking account. Spend with the Square debit card, digitally, or in person.",
    link: "Explore Square Checking →",
  },
  {
    title: "Square Savings*",
    description:
      "Set aside a percentage of your sales to plan for slower seasons, big purchases, or anything else you need with Square Savings.",
    link: "Explore Square Savings →",
  },
  {
    title: "Square Online",
    description:
      "Reach customers where they shop by getting online with Square Online or by integrating your existing website. Sync your in-store and online inventory data and sync in real time, and you can offer in-store pickup.",
    link: "Explore Square Online →",
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
              <div className="flex space-x-6 animate-fade-in-up animation-delay-400">
                {" "}
                {/* space-x-4 to space-x-6 */}
                {heroSection.cta.map((btn, i) => (
                  <Button
                    key={btn.label}
                    className={
                      btn.variant === "primary"
                        ? "bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" // px-8 py-3 to px-10 py-4, text-lg
                        : "bg-white text-gray-700 border-gray-300 px-10 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-blue-300"
                    }
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
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
      {/* <ContentMarquee /> */}

      <section className="bg-gradient-to-b from-white to-blue-50 py-12 px-4 lg:px-24">
        <h2 className="text-3xl font-semibold text-center mb-16 text-gray-800">
          Key Features
        </h2>

        {/* Feature 1: Sales Analytics */}
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Sales Analytics
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Track daily, weekly, and monthly sales across locations</li>
              <li>Visualize trends, compare time periods</li>
              <li>Make data-backed decisions instantly</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/pay2.png"
              alt="Team analyzing sales data on screen"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Feature 2: Inventory Intelligence */}
        <div className="flex flex-col lg:flex-row-reverse items-center mb-16 gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Inventory Intelligence
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Monitor stock levels and identify fast/slow-moving items</li>
              <li>Get early alerts and automate reorder triggers</li>
              <li>Reduce shrinkage and overstock</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/pay3.png"
              alt="Tablet showing inventory dashboard"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Feature 3: Role-Based User Access */}
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Role-Based User Access
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Assign role-based access to admins, supervisors, managers, and
                staff
              </li>
              <li>Ensure team members access only relevant data</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/pay5.png"
              alt="Digital identity and access control"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Feature 4: Remote Access & Control */}
        <div className="flex flex-col lg:flex-row-reverse items-center mb-16 gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Remote Access & Control
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Manage from anywhere with secure cloud access</li>
              <li>Useful for hybrid work teams, franchises, remote admins</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="pay6.png"
              alt="Woman using tablet remotely"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Feature 5: Compliance & Reporting */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Compliance & Reporting
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Auto-generate audit-ready reports</li>
              <li>Meet tax, safety, and HR standards</li>
              <li>Ensure smooth record-keeping with secure data storage</li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <img
              src="desh.png"
              alt="Man analyzing report graphs"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <FeaturesShowcase />

      <section className="w-full bg-white px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-gray-800 text-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why It Matters
            </h2>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✔</span>
              <span>Reduce operational overhead</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✔</span>
              <span>Gain visibility across locations</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✔</span>
              <span>Eliminate manual reporting</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✔</span>
              <span>Make faster, smarter decisions</span>
            </div>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src="/pinklips.png" // Replace with the correct image path
              alt="Confused person with laptop"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* <HardwareSection /> */}
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
