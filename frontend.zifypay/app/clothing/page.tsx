"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Navbar from "@/components/landingPage/Navbar"
import Footer from "@/components/Footer"
import SquareSection from "@/components/square-section"

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                Square for Plant
                <br />& Garden
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
                Tech that helps your business bloom
              </p>
              <div className="flex space-x-4 animate-fade-in-up animation-delay-400">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get started
                </Button>
                <Button className="bg-white text-gray-700 border-gray-300 px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-blue-300">
                  Contact sales
                </Button>
              </div>
            </div>
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-lg blur-xl animate-pulse"></div>
              <Image
                src="/clothing/image.png"
                alt="Yellow pansy flower in garden setting"
                width={600}
                height={400}
                className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Give customers best experience */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">
            Give your customers the best experience
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Take payments seamlessly</h3>
              <div className="space-y-4">
                {[
                  "Take payments from the counter on the floor, or anywhere else that makes sense.",
                  "Fast tap, dip, swipe that lets customers pay how they want.",
                  "Quickly check out customers with a POS and that you can customize to fit your workflow.",
                  "Expand your offerings by hosting events, workshops, or pop-ups with Square Appointments.",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Woman using tablet for payments"
                  width={500}
                  height={400}
                  className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Man in business attire working with plants"
                  width={500}
                  height={400}
                  className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay on top of stock</h3>
              <div className="space-y-4">
                {[
                  "Automatically sync inventory across locations and devices.",
                  "Stay stocked and ready with automatic alerts that let you know when it's time to restock.",
                  "Send purchase orders and easily receive stock with bulk inventory intake.",
                  "Use insights on sales trends, profit margins, and top-performing plants and items to make informed decisions.",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep customers coming back */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Keep customers coming back</h3>
              <div className="space-y-4">
                {[
                  "Build profiles for your customers and track their preferences with every purchase.",
                  "Reward customers with loyalty programs and discounts that keep them coming back.",
                  "Share how customers can place or reserve pick-up orders.",
                  "Encourage repeat visits with Square Loyalty and keep customers engaged with Square Marketing.",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Person in cap working in garden center"
                  width={400}
                  height={300}
                  className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Silhouettes of people walking"
                  width={400}
                  height={200}
                  className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lead your team</h3>
              <div className="space-y-4">
                {[
                  "Give your team the tools they need to be successful.",
                  "Track different roles, schedules, hours, and more with one type of employee.",
                  "Motivate staff to upsell and cross-sell with availability.",
                  "Pay your employees based on tracked hours and automatically track overtime.",
                ].map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-0 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
              {/* Left Image */}
              <div className="hidden md:block h-full">
                <Image
                  src="/clothing/testimonial-left.jpg"
                  alt="Testimonial left"
                  width={260}
                  height={260}
                  className="object-cover w-full h-full rounded-l-2xl"
                />
              </div>
              {/* Center Testimonial */}
              <div className="flex flex-col justify-center items-center text-center px-6 py-10 md:py-0 bg-blue-700">
                <h3 className="text-2xl font-bold mb-2">Hank Gregg</h3>
                <h4 className="text-lg font-semibold mb-4">Market at Grelen Somerset, VA</h4>
                <p className="mb-6 text-blue-100 max-w-xl">
                  “Because we're such a large company, having Square organize all the items behind the scenes gives us the freedom to interact with our clients, help the local community, and continue to grow in the ways that we really want to.”
                </p>
                <a
                  href="#"
                  className="text-white font-semibold underline hover:text-blue-200 transition-colors duration-200"
                >
                  See all Stories ↗
                </a>
              </div>
              {/* Right Image */}
              <div className="hidden md:block h-full">
                <Image
                  src="/clothing/testimonial-right.jpg"
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
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-fade-in-up">More ways to grow</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
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
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-0 shadow-lg"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 bg-white rounded-lg"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 hover:text-blue-800 transition-colors duration-300"
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
