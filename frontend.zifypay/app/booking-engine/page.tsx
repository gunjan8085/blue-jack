"use client"

import { useState } from "react"
import { Search, Star, MapPin, Users, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Hero from "@/components/Hero"
import { useRouter } from "next/navigation"
import HeaderForCustomer from "@/components/customer/HeaderForCustomer"
import Footer from "@/components/Footer"
import CTA from "@/components/CTA"
import Reviews from "@/components/Reviews"
import FeaturedBusinesses from "@/components/FeaturedBusinesses"




export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 to-white">
      {/* Header */}
     
     <HeaderForCustomer />

      {/* Hero Section */}
      <section className="py-20 px-4 mt-28">
        <div className="container mx-auto text-center">
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
          <h1 
          className="text-5xl md:text-6xl font-bold mb-6 text-black bg-clip-text ">
            Book local beauty and wellness services
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book appointments with top-rated beauty and wellness professionals in your area
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 " />
              <Input
                placeholder="Search for services, salons, or spas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-blue-200 focus:border-blue-400 rounded-full shadow-lg"
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                size="sm"
              >BookBeauty

                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>


      {/* <Hero /> */}

      {/* Featured Businesses */}
     <FeaturedBusinesses />

      {/* Reviews Carousel */}
      <Reviews  />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}