"use client"

import { useState } from "react"
import { Star, MapPin, Clock, Phone, Globe, Calendar, User, ArrowLeft, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Mock business data
const businessData = {
  id: 1,
  name: "Glow & Go Salon",
  rating: 4.7,
  reviewsCount: 132,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  description:
    "A premium beauty salon offering comprehensive hair, nail, and skincare services in a luxurious and relaxing environment.",
  location: "123 Beauty Street, Downtown",
  phone: "(555) 123-4567",
  website: "www.glowandgo.com",
  workingHours: {
    Monday: "9:00 AM - 7:00 PM",
    Tuesday: "9:00 AM - 7:00 PM",
    Wednesday: "9:00 AM - 7:00 PM",
    Thursday: "9:00 AM - 8:00 PM",
    Friday: "9:00 AM - 8:00 PM",
    Saturday: "8:00 AM - 6:00 PM",
    Sunday: "10:00 AM - 5:00 PM",
  },
  services: [
    { id: 1, name: "Women's Haircut", price: 45, duration: "45 mins", category: "Hair" },
    { id: 2, name: "Men's Haircut", price: 25, duration: "30 mins", category: "Hair" },
    { id: 3, name: "Hair Color", price: 85, duration: "2 hours", category: "Hair" },
    { id: 4, name: "Highlights", price: 120, duration: "3 hours", category: "Hair" },
    { id: 5, name: "Manicure", price: 35, duration: "45 mins", category: "Nails" },
    { id: 6, name: "Pedicure", price: 45, duration: "60 mins", category: "Nails" },
    { id: 7, name: "Facial Treatment", price: 75, duration: "75 mins", category: "Skincare" },
    { id: 8, name: "Deep Cleansing Facial", price: 95, duration: "90 mins", category: "Skincare" },
  ],
  staff: [
    {
      id: 1,
      name: "Ayesha Khan",
      role: "Senior Stylist",
      avatar: "/placeholder.svg?height=80&width=80",
      services: ["Women's Haircut", "Hair Color", "Highlights"],
      rating: 4.9,
      experience: "8 years",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Barber",
      avatar: "/placeholder.svg?height=80&width=80",
      services: ["Men's Haircut"],
      rating: 4.8,
      experience: "5 years",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      role: "Nail Technician",
      avatar: "/placeholder.svg?height=80&width=80",
      services: ["Manicure", "Pedicure"],
      rating: 4.7,
      experience: "6 years",
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Esthetician",
      avatar: "/placeholder.svg?height=80&width=80",
      services: ["Facial Treatment", "Deep Cleansing Facial"],
      rating: 4.9,
      experience: "7 years",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing service! Ayesha did an incredible job with my hair color. The salon is clean, modern, and the staff is very professional.",
      date: "2025-06-10",
      avatar: "/placeholder.svg?height=40&width=40",
      service: "Hair Color",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Best haircut I've had in years. Marcus really knows what he's doing. Will definitely be coming back!",
      date: "2025-06-08",
      avatar: "/placeholder.svg?height=40&width=40",
      service: "Men's Haircut",
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      comment:
        "Great facial treatment with Emma. Very relaxing experience and my skin feels amazing. Highly recommend!",
      date: "2025-06-05",
      avatar: "/placeholder.svg?height=40&width=40",
      service: "Facial Treatment",
    },
    {
      id: 4,
      name: "Jessica Brown",
      rating: 5,
      comment: "Sofia did an amazing job on my nails. The attention to detail is incredible. Love the new nail art!",
      date: "2025-06-03",
      avatar: "/placeholder.svg?height=40&width=40",
      service: "Manicure",
    },
  ],
}

// Mock available time slots
const availableSlots = {
  "2025-06-12": ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
  "2025-06-13": ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:00 PM"],
  "2025-06-14": ["10:00 AM", "11:30 AM", "1:30 PM", "3:00 PM", "4:30 PM"],
  "2025-06-15": ["9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"],
}

export default function BusinessProfilePage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleBookingNext = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1)
    }
  }

  const handleBookingBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
    }
  }

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log("Booking submitted:", {
      service: selectedService,
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    })
    setIsBookingOpen(false)
    // Reset form
    setBookingStep(1)
    setSelectedService("")
    setSelectedStaff("")
    setSelectedDate("")
    setSelectedTime("")
    setCustomerInfo({ name: "", email: "", phone: "", notes: "" })
  }

  const getAvailableStaff = () => {
    if (!selectedService) return businessData.staff
    return businessData.staff.filter((staff) => staff.services.includes(selectedService))
  }

  const getServicePrice = () => {
    const service = businessData.services.find((s) => s.name === selectedService)
    return service ? service.price : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/businesses">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={businessData.images[selectedImage] || "/placeholder.svg"}
                  alt={businessData.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {businessData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? "border-purple-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${businessData.name} ${index + 1}`}
                      className="w-full h-20 object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Business Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{businessData.name}</h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-medium">{businessData.rating}</span>
                      <span className="text-gray-600">({businessData.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{businessData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{businessData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{businessData.website}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{businessData.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4">
                <div className="grid gap-4">
                  {Object.entries(
                    businessData.services.reduce(
                      (acc, service) => {
                        if (!acc[service.category]) acc[service.category] = []
                        acc[service.category].push(service)
                        return acc
                      },
                      {} as Record<string, typeof businessData.services>,
                    ),
                  ).map(([category, services]) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-purple-50 transition-colors"
                            >
                              <div>
                                <h4 className="font-medium text-gray-900">{service.name}</h4>
                                <p className="text-sm text-gray-600">{service.duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-purple-600">${service.price}</div>
                                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-purple-600 to-purple-700"
                                      onClick={() => setSelectedService(service.name)}
                                    >
                                      Book Now
                                    </Button>
                                  </DialogTrigger>
                                </Dialog>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="staff" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessData.staff.map((member) => (
                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-purple-600 font-medium">{member.role}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{member.rating}</span>
                              <span className="text-sm text-gray-500">• {member.experience}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Specializes in:</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.services.map((service) => (
                              <Badge key={service} variant="secondary" className="bg-purple-100 text-purple-700">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-4">
                  {businessData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {review.service}
                                  </Badge>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                        <p className="text-gray-600">{businessData.location}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                        <div className="space-y-2">
                          {Object.entries(businessData.workingHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="font-medium text-gray-700">{day}</span>
                              <span className="text-gray-600">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map would be integrated here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Book Appointment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 mb-4">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book Appointment - Step {bookingStep} of 3</DialogTitle>
                    </DialogHeader>

                    {bookingStep === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="service">Select Service</Label>
                          <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {businessData.services.map((service) => (
                                <SelectItem key={service.id} value={service.name}>
                                  {service.name} - ${service.price} ({service.duration})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="staff">Select Staff (Optional)</Label>
                          <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any available staff" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableStaff().map((staff) => (
                                <SelectItem key={staff.id} value={staff.name}>
                                  {staff.name} - {staff.role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={handleBookingNext}
                          disabled={!selectedService}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700"
                        >
                          Next
                        </Button>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="date">Select Date</Label>
                          <Select value={selectedDate} onValueChange={setSelectedDate}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a date" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(availableSlots).map((date) => (
                                <SelectItem key={date} value={date}>
                                  {new Date(date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedDate && (
                          <div>
                            <Label htmlFor="time">Select Time</Label>
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a time" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableSlots[selectedDate as keyof typeof availableSlots]?.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={handleBookingBack} className="flex-1">
                            Back
                          </Button>
                          <Button
                            onClick={handleBookingNext}
                            disabled={!selectedDate || !selectedTime}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-purple-900 mb-2">Booking Summary</h3>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Service:</span> {selectedService}
                            </p>
                            {selectedStaff && (
                              <p>
                                <span className="font-medium">Staff:</span> {selectedStaff}
                              </p>
                            )}
                            <p>
                              <span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">Time:</span> {selectedTime}
                            </p>
                            <p>
                              <span className="font-medium">Price:</span> ${getServicePrice()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={customerInfo.name}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              placeholder="Enter your email"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                              placeholder="Enter your phone number"
                            />
                          </div>

                          <div>
                            <Label htmlFor="notes">Special Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={customerInfo.notes}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                              placeholder="Any special requests or notes"
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={handleBookingBack} className="flex-1">
                            Back
                          </Button>
                          <Button
                            onClick={handleBookingSubmit}
                            disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700"
                          >
                            Confirm & Pay
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Professional staff</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Highly rated service</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
