"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import  Navbar  from "@/components/landingPage/Navbar"
import  Footer  from "@/components/Footer"
import { PageNavigation } from "@/components/page-navigations"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  One Platform. All Your Business Needs.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Everything you need to run and grow your business, beautifully unified. Point of Sale, Payments,
                  Inventory, CRM, Analytics, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              POS features designed for organic and natural stores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline operations from wholesalers to customers with inventory management, customer tracking, and
              integrated payment processing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6 animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900">Organize products from wholesalers</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep track of your inventory with advanced categorization, batch tracking, and automated reorder points.
                Perfect for organic and natural product retailers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Batch and expiration tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Supplier management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Automated reordering</span>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Inventory Management"
                width={500}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Customer Management"
                width={500}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6 animate-fade-in-right">
              <h3 className="text-2xl font-bold text-gray-900">Manage customer relationships</h3>
              <p className="text-gray-600 leading-relaxed">
                Build lasting relationships with your customers through integrated CRM, loyalty programs, and
                personalized marketing campaigns.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Customer profiles and history</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Loyalty point system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Email marketing integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce-slow mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-8">
              <span className="text-6xl font-bold text-white">DISCOUNT</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">Special Launch Offer</h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up">
            Get 50% off your first 6 months. Limited time offer for new customers.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Claim Your Discount
          </Button>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why merchants love our commerce platform</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Virtual terminal",
                description: "Process payments anywhere with our secure virtual terminal.",
                icon: "💳",
              },
              {
                title: "Why merchants love our commerce platform",
                description: "Everything you need to sell online and in-person.",
                icon: "🏪",
              },
              {
                title: "Grocery POS features that matter",
                description: "Specialized tools for grocery and retail businesses.",
                icon: "🛒",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to grow your business?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of merchants who trust Pyxis for their business operations.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Start Your Free Trial
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <PageNavigation />
    </div>
  )
}
