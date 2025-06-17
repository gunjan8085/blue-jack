import React from 'react'

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


function FeaturedBusinesses({featuredBusinesses} : any) {4
  const router = useRouter() 
  return (
   <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Businesses</h2>
            <p className="text-gray-600">Top-rated services in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business : any) => (
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
                    {business.services.map((service : any) => (
                      <Badge key={service} variant="secondary" className="bg-blue-100 text-blue-700">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">{business.price}</span>
                    <Link href={`/business/${business.id}`}>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
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
            {/* <Link href="/businesses"> */}
              <Button onClick={()=>{
                let route = "/businesses"
                localStorage.getItem("isLoggedIn") === "true" ? route = "/customer/home" : route = "/businesses";
                router.push(route)
              }} variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                View All Businesses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </section>
  )
}

export default FeaturedBusinesses