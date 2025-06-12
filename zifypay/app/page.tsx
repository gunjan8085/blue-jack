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

// const router = useRouter();
// Mock data for featured businesses
const featuredBusinesses = [
  {
    id: 1,
    name: "Glow & Go Salon",
    rating: 4.7,
    reviewsCount: 132,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Haircut", "Manicure", "Facial"],
    location: "Downtown",
    nextAvailable: "20 mins",
    price: "From $25",
  },
  {
    id: 2,
    name: "Elite Barbershop",
    rating: 4.9,
    reviewsCount: 89,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Haircut", "Beard Trim", "Hot Towel"],
    location: "Midtown",
    nextAvailable: "1 hour",
    price: "From $30",
  },
  {
    id: 3,
    name: "Zen Spa Retreat",
    rating: 4.8,
    reviewsCount: 156,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Massage", "Facial", "Body Treatment"],
    location: "Uptown",
    nextAvailable: "45 mins",
    price: "From $60",
  },
]

// Mock reviews data
const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing service! The staff was professional and the ambiance was perfect.",
    avatar: "/placeholder.svg?height=40&width=40",
    business: "Glow & Go Salon",
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Best haircut I've had in years. Will definitely be coming back!",
    avatar: "/placeholder.svg?height=40&width=40",
    business: "Elite Barbershop",
  },
  {
    name: "Emma Davis",
    rating: 5,
    comment: "The massage was incredibly relaxing. Highly recommend!",
    avatar: "/placeholder.svg?height=40&width=40",
    business: "Zen Spa Retreat",
  },
]

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-150 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Zifypay
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/businesses" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Services
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-purple-600 transition-colors">
              For Business
            </Link>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-purple-50">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 mt-28">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Book local beauty and wellness services
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book appointments with top-rated beauty and wellness professionals in your area
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for services, salons, or spas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-full shadow-lg"
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>


      <Hero />

      {/* Featured Businesses */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Businesses</h2>
            <p className="text-gray-600">Top-rated services in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <Card
                key={business.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                    Next: {business.nextAvailable}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{business.rating}</span>
                      <span className="text-sm text-gray-500">({business.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{business.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {business.services.map((service) => (
                      <Badge key={service} variant="secondary" className="bg-purple-100 text-purple-700">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-purple-600">{business.price}</span>
                    <Link href={`/business/${business.id}`}>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/businesses">
              <Button variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                View All Businesses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">"{review.comment}"</p>
                  <p className="text-sm text-purple-600 font-medium">{review.business}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <Users className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button
              // onClick={() => router.push('/auth/login')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Calendar className="mr-2 h-5 w-5" />
              List Your Business
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">BookBeauty</span>
              </div>
              <p className="text-gray-400">Your trusted platform for beauty and wellness bookings.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Find Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Business</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link 
                  // onClick={()=> router.push('/auth/login')}
                  href="#" className="hover:text-white transition-colors">
                    List Your Business
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BookBeauty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
