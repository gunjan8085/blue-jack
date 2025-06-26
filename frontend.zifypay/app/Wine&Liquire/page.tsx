"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import  Navbar  from "@/components/landingPage/Navbar"
import Footer from "@/components/Footer"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Hardware data
  const hardware = [
    {
      name: "Station Duo",
      price: "$0",
      desc: "All-in-one countertop solution with built-in payment processing",
      features: ["Dual screen for staff & customer", "Receipt printer, cash drawer", "Magstripe, chip, contactless, traditional accessories"],
      img: "/placeholder.svg?height=100&width=150",
    },
    {
      name: "Mini POS",
      price: "$0",
      desc: "Compact countertop solution",
      features: ["Full-featured POS for the counter", "Swipe, chip, or tap payments", "Activate data anywhere"],
      img: "/placeholder.svg?height=100&width=150",
    },
    {
      name: "Flex POS",
      price: "$0",
      desc: "Handheld mobile solution",
      features: ["Full-featured POS on the go", "Fast receipts, fast card payments", "Activate data anywhere"],
      img: "/placeholder.svg?height=100&width=150",
    },
    {
      name: "Station POS",
      price: "$0",
      desc: "Full-featured countertop system",
      features: ["Large, yet versatile", "Customer orders done fast", "Speed, power, reliability"],
      img: "/placeholder.svg?height=100&width=150",
    },
  ]

  // Reports/Insights carousel data
  const reports = [
    {
      title: "The Future of Retail Report",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Virtual Workshops and Shipping Solutions Transformed The Juicy Leaf Plant Shop",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "5 Ways Retailers Can Bring More Traffic in Stores",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Customer Experience and Buying Journey Report",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Future Trends in the Plant Industry",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "How to Build Loyalty in Retail",
      img: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Inventory Management Best Practices",
      img: "/placeholder.svg?height=200&width=300",
    },
  ]
  const visibleReports = 3
  const maxIndex = reports.length - visibleReports
  const handlePrev = () => setCarouselIndex(i => Math.max(0, i - 1))
  const handleNext = () => setCarouselIndex(i => Math.min(maxIndex, i + 1))

  // Example FAQ data
  const faqs = [
    {
      question: "How do I switch from my current solution?",
      answer:
        "It's easy and quick to sign up for Square. If you currently use Lightspeed Retail, Shopify POS, or another similar clothing store point-of-sale system, Square makes it easy for you to switch: simply visit the Pricing page, start your sales sign up, and import your inventory. You can easily transfer your existing inventory with bulk import tools. You can count on Square for transparent pricing and no long-term contracts. And if you need help, Square Support is here for you.",
    },
    {
      question: "Can I upgrade my plan?",
      answer:
        "You can upgrade your plan from Free to Plus by subscribing. You'll be able to utilize all existing features and you'll only have to pay the additional premium instantly when you upgrade. After you do, by the end of the Plus plan you'll be given the option to pick your plan. If you don't choose one, you'll automatically be downgraded to the Free plan. To upgrade to the Custom Premium plan, contact our sales team.",
    },
    {
      question: "Can I downgrade my plan?",
      answer:
        "You can always downgrade your subscription from Plus in your dashboard. When you downgrade, you'll see messaging in your Dashboard settings to know which features you'll lose, like some staff rostering, management features, check-in restrictions, and tracked analytics. You can see and compare plan features on our pricing page. You can also pause your subscription at any time from your Dashboard; when you pause a subscription, you will not be billed. You can unpause at any time and your account will be ready for you without losing your past data.",
    },
  ]

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
                src="/placeholder.svg?height=400&width=600"
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

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Fleet Depot</h3>
                <h4 className="text-xl mb-4 text-blue-200">Proven Network, Inc</h4>
                <p className="mb-6 text-blue-100">
                  "We use Square POS at our garden center locations. Since we started using Square, we've been able to
                  streamline our checkout process and track our inventory more effectively. The reporting features help
                  us make better business decisions, and the customer support is always there when we need it."
                </p>
                <Button className="bg-white text-blue-600 border-white hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-full px-6 py-2 shadow-lg">
                  See all stories →
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Business owner testimonial"
                  width={400}
                  height={300}
                  className="rounded-lg relative z-10 hover:scale-105 transition-transform duration-500"
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

      {/* Hardware Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center text-white mb-16 animate-fade-in-up">
            Hardware that's ready for the rush
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {hardware.map((item, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-0 shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-4 animate-bounce">{item.price}</div>
                  <div className="relative group mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={150}
                      height={100}
                      className="mx-auto relative z-10 hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    {item.features.map((f, i) => <p key={i}>• {f}</p>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reports/Insights Carousel Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Hardware that's ready for the rush</h2>
            <div className="flex space-x-2">
              <Button onClick={handlePrev} disabled={carouselIndex === 0} className="bg-gray-200 text-blue-600 p-2 rounded-full disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button onClick={handleNext} disabled={carouselIndex === maxIndex} className="bg-gray-200 text-blue-600 p-2 rounded-full disabled:opacity-50">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${carouselIndex * (100 / visibleReports)}%)` }}
            >
              {reports.slice(carouselIndex, carouselIndex + visibleReports).map((report, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full md:w-1/3 px-2 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                    <Image
                      src={report.img}
                      alt={report.title}
                      width={300}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="text-gray-900 font-medium text-center mb-2">{report.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Try Square Section */}
      <section className="bg-white py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in-up">Try Square</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mb-16 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce">
            Get started
          </Button>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-12 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-4">FAQ</h3>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors duration-300 rounded-lg px-4 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className="flex justify-between items-center cursor-pointer select-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                  <span className={`transition-transform duration-300 ${openIndex === idx ? "rotate-45 text-blue-600" : ""}`}>
                    <Plus className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                  </span>
                </div>
                {openIndex === idx && (
                  <div className="mt-3 text-gray-700 animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
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
