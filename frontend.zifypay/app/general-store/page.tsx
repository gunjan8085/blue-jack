"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Users, TrendingUp, Shield } from "lucide-react"
import Navbar, {  } from "@/components/landingPage/Navbar"
import  Footer  from "@/components/Footer"
import { PageNavigation } from "@/components/page-navigations"

export default function GeneralStorePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  General store point of sale
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The complete POS solution for general stores. Manage
                  inventory, process payments, and grow your business with our
                  all-in-one platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="Book-A-Demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                  >
                    Schedule Demo
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/tool.png"
                  alt="POS Terminal"
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

      {/* How It Helps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6 animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900">
                How IT Retail helps your business grow
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive retail solution streamlines your operations,
                reduces costs, and helps you make data-driven decisions to grow
                your business.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Increase Sales
                    </h4>
                    <p className="text-gray-600">
                      Advanced analytics and customer insights to boost revenue
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Better Customer Service
                    </h4>
                    <p className="text-gray-600">
                      Faster checkouts and personalized customer experiences
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Secure Transactions
                    </h4>
                    <p className="text-gray-600">
                      End-to-end encryption and PCI compliance
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <Image
                src="/gt.png"
                alt="Business Growth"
                width={500}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blue CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in-left">
              <h2 className="text-3xl font-bold mb-4">
                Ready to take a chance on your business?
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Join thousands of successful retailers who have transformed
                their business with our platform.
              </p>
              <a href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Get Started Today
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <div className="animate-fade-in-right">
              <Image
                src="gt1.png"
                alt="Success Story"
                width={400}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="animate-fade-in-left">
              <Image
                src="/bgt.png"
                alt="Inventory Management"
                width={500}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6 animate-fade-in-right">
              <h3 className="text-2xl font-bold text-gray-900">
                Inventory made easy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Keep track of your stock levels, set up automatic reorder
                points, and never run out of your best-selling items again.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Real-time stock tracking
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Low stock alerts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Supplier management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <h3 className="text-2xl font-bold text-gray-900">
                All-in-one business management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From sales and inventory to customer management and reporting,
                everything you need is in one integrated platform.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Integrated payment processing
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Customer relationship management
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Advanced reporting and analytics
                  </span>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <Image
                src="/bgty.png"
                alt="Business Management"
                width={500}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blue Infrastructure Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Take it anywhere
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Our cloud-based infrastructure ensures your business runs smoothly
              whether you're in-store, at a market, or managing remotely.
            </p>
            <div className="relative">
              <Image
                src="big.png"
                alt="Cloud Infrastructure"
                width={800}
                height={300}
                className="rounded-lg shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Easy omnichannel experiences
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Seamlessly connect your online and offline sales channels for a
              unified customer experience.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-gray-600 ml-2">
                  Trusted by 10,000+ businesses
                </span>
              </div>
            </div>
            <a href="Book-A-Demo"></a>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Start Your Journey Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* <PageNavigation /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
