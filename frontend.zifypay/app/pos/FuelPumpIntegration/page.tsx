// import React from 'react'

// function page() {
//   return (
//     <div>**Fuel Pump Integration | ZifyPay**

// ---

// ### Real-Time Control for Smarter Fuel Management

// ZifyPay’s Fuel Pump Integration module empowers fuel station owners with advanced real-time control and monitoring of pump operations. Designed for full compatibility with leading pump brands like **Gilbarco**, **Wayne**, and more, our solution helps you streamline operations, enhance accuracy, and drive revenue—all from a single, unified POS interface.

// ---

// ### 🔧 Key Capabilities

// * **Start/Stop Pumps Directly from POS**
//   Eliminate manual intervention. Instantly activate or stop fuel pumps via the POS terminal.

// * **Brand-Compatible Control**
//   Seamlessly integrates with major fuel dispensers for universal station support.

// * **Real-Time Pump Status**
//   Monitor active fueling, idle status, and completed transactions live.

// * **Automated Transaction Logging**
//   Each pump transaction is auto-logged with price, fuel type, tax, and volume.

// * **Inventory Sync**
//   Deduct fuel volume automatically from real-time tank inventory after every sale.

// * **Multi-Pump Dashboard**
//   Manage multiple pumps simultaneously with a visual and interactive interface.

// ---

// ### ⚙️ Designed for Efficiency, Built for Compliance

// * **PCI-DSS Compliant** for secure, encrypted transactions.
// * **Role-based Controls** to authorize access by staff type.
// * **Sync with Retail POS & Cloud Dashboard** for centralized analytics and reporting.
// * **Works Offline** and syncs automatically once reconnected.

// ---

// ### 💡 Why ZifyPay for Fuel Stations?

// Whether you run a single fuel station or a chain of outlets, ZifyPay ensures:

// * Reduced operational errors
// * Faster turnaround at fueling points
// * Integrated sales + pump performance reports
// * Better stock and loss management

// ---

// ### Ready to Modernize Your Fuel Station?

// Let ZifyPay power your fuel operations with control, speed, and confidence.

// 👉 **[Get Started Now](#)** or call us at **(980) 256-0131**
// </div>
//   )
// }

// export default page


"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Navbar from "@/components/landingPage/Navbar"
import Footer from "@/components/Footer"
import SquareSection from "@/components/square-section"

// --- Section Data ---
const heroSection = {
  title: "Square for Plant\n& Garden",
  subtitle: "Tech that helps your business bloom",
  image: "/clothing/image.png",
  cta: [
    { label: "Get started", variant: "primary" },
    { label: "Contact sales", variant: "secondary" },
  ],
}

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
}

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
}

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
]

export default function page() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative"> {/* Increased py-20 to py-24 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <h1 className="text-6xl font-extrabold text-gray-900 mb-8 animate-fade-in-up"> {/* text-5xl to text-6xl, font-bold to font-extrabold, mb-6 to mb-8 */}
                {heroSection.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <p className="text-2xl text-gray-700 mb-10 animate-fade-in-up animation-delay-200"> {/* text-xl to text-2xl, mb-8 to mb-10, text-gray-600 to text-gray-700 */}
                {heroSection.subtitle}
              </p>
              <div className="flex space-x-6 animate-fade-in-up animation-delay-400"> {/* space-x-4 to space-x-6 */}
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
              className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
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
      <section className="py-24 relative"> {/* py-20 to py-24 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-20 animate-fade-in-up"> {/* text-4xl to text-5xl, font-bold to font-extrabold, mb-16 to mb-20 */}
            {experienceSection.title}
          </h2>
          {experienceSection.features.map((feature, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"> {/* mb-20 to mb-24 */}
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
              <div className={feature.imageLeft ? "animate-slide-in-right" : "animate-slide-in-left"}>
                <h3 className="text-3xl font-bold text-gray-900 mb-8"> {/* text-2xl to text-3xl, mb-6 to mb-8 */}
                  {feature.heading}
                </h3>
                <div className="space-y-6"> {/* space-y-4 to space-y-6 */}
                  {feature.points.map((text, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 animate-fade-in-up" /* space-x-3 to space-x-4 */
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div> {/* w-2 h-2 to w-3 h-3 */}
                      <p className="text-lg text-gray-700"> {/* text-gray-700, text-lg */}
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
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24 relative overflow-hidden"> {/* py-20 to py-24 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {loyaltySection.features.map((feature, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"> {/* mb-20 to mb-24 */}
              {feature.imageLeft && (
                <div className="animate-slide-in-left">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={400}
                      height={300}
                      className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
              <div className={feature.imageLeft ? "animate-slide-in-right" : "animate-slide-in-left"}>
                <h3 className="text-3xl font-bold text-gray-900 mb-8"> {/* text-2xl to text-3xl, mb-6 to mb-8 */}
                  {feature.heading}
                </h3>
                <div className="space-y-6"> {/* space-y-4 to space-y-6 */}
                  {feature.points.map((text, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                      <p className="text-lg text-gray-700">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {!feature.imageLeft && (
                <div className="animate-slide-in-right">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={400}
                      height={300}
                      className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-0 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up mt-16"> {/* mt-12 to mt-16 */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
              {/* Left Image */}
              <div className="hidden md:block h-full">
                <Image
                  src={loyaltySection.testimonial.leftImg}
                  alt="Testimonial left"
                  width={260}
                  height={260}
                  className="object-cover w-full h-full rounded-l-2xl"
                />
              </div>
              {/* Center Testimonial */}
              <div className="flex flex-col justify-center items-center text-center px-8 py-14 md:py-0 bg-blue-700"> {/* px-6 to px-8, py-10 to py-14 */}
                <h3 className="text-3xl font-extrabold mb-2">{loyaltySection.testimonial.name}</h3> {/* text-2xl to text-3xl, font-bold to font-extrabold */}
                <h4 className="text-xl font-semibold mb-4">{loyaltySection.testimonial.location}</h4> {/* text-lg to text-xl */}
                <p className="mb-8 text-blue-100 max-w-2xl text-lg"> {/* mb-6 to mb-8, max-w-xl to max-w-2xl, text-lg */}
                  “{loyaltySection.testimonial.quote}”
                </p>
                <a
                  href={loyaltySection.testimonial.link.href}
                  className="text-white font-semibold underline hover:text-blue-200 transition-colors duration-200 text-lg"
                >
                  {loyaltySection.testimonial.link.label}
                </a>
              </div>
              {/* Right Image */}
              <div className="hidden md:block h-full">
                <Image
                  src={loyaltySection.testimonial.rightImg}
                  alt="Testimonial right"
                  width={260}
                  height={260}
                  className="object-cover w-full h-full rounded-r-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More ways to grow */}
      <section className="py-24 relative"> {/* py-20 to py-24 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-20 animate-fade-in-up"> {/* text-4xl to text-5xl, font-bold to font-extrabold, mb-16 to mb-20 */}
            More ways to grow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"> {/* gap-8 to gap-12 */}
            {moreWaysSection.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-0 shadow-lg"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8"> {/* p-6 to p-8 */}
                  <div className="flex items-start space-x-6"> {/* space-x-4 to space-x-6 */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"> 
                      <div className="w-10 h-10 bg-white rounded-lg"></div> 
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3> {/* text-xl to text-2xl, mb-2 to mb-4 */}
                      <p className="text-lg text-gray-700 mb-6">{item.description}</p> {/* text-gray-700, text-lg, mb-4 to mb-6 */}
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 hover:text-blue-800 transition-colors duration-300 text-lg"
                      >
                        {item.link}
                      </Button>
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
  )
}
