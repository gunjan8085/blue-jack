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
function Reviews({reviews} : any) {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review : any, index : any) => (
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
                  <p className="text-sm text-blue-600 font-medium">{review.business}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Reviews