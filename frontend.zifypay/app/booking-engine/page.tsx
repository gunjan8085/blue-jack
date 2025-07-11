"use client"

import { useState } from "react"
import HeaderForCustomer from "@/components/customer/HeaderForCustomer"
import Footer from "@/components/Footer"
import CTA from "@/components/CTA"
import Reviews from "@/components/Reviews"
import FeaturedBusinesses from "@/components/FeaturedBusinesses"
import SearchBar from "@/components/SearchBarbooking"

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 to-white">
      {/* Header */}
      <HeaderForCustomer />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 mt-16 sm:mt-20 lg:mt-28 relative">
        <div className="container mx-auto text-center">
          {/* Background Video */}
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-[-1]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="./white.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Hero Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black leading-tight">
              Book local beauty and wellness services
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Discover and book appointments with top-rated beauty and wellness professionals in your area
            </p>

            {/* Search Bar */}
            <div className="mb-8 sm:mb-10">
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-black mb-2">500+</div>
                <div className="text-sm sm:text-base text-gray-600">Verified Businesses</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-black mb-2">10k+</div>
                <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-black mb-2">4.8★</div>
                <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-8 sm:py-12 lg:py-16">
        <FeaturedBusinesses />
      </section>

      {/* Reviews Carousel */}
      <section className="py-8 sm:py-12 lg:py-16">
        <Reviews />
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <CTA />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}