"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, Clock, Phone, Globe, Calendar, User, ArrowLeft, Heart, Share2, AlertCircle } from "lucide-react"
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
import { useParams } from "next/navigation"
import { API_URL } from "@/lib/const"

interface BusinessTiming {
  days: number[]
  time: {
    open: { hour: number; minute: number }
    close: { hour: number; minute: number }
  }[]
}

interface BusinessAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  pincode: string
}

interface Employee {
  _id: string
  name: string
  email: string
}

interface Business {
  _id: string
  brandName: string
  website: string
  thumbnail: string
  about: string
  serviceCategories: string[]
  teamSize: {
    min: number
    max: number
  }
  address: BusinessAddress
  isOnlineOnly: boolean
  existingSoftware: string
  foundUsAt: string
  employees: Employee[]
  media: {
    _id: string
    url: string
    type: "photo" | "video"
  }[]
  timings: BusinessTiming[]
  avgReview: number
  reviewCount: number
  reviews: any[]
}

interface ApiResponse {
  success: boolean
  data: Business
  message: string
}

export default function BusinessProfilePage() {
  const params = useParams()
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
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/business/${params.id}`)
        const result: ApiResponse = await response.json()
        if (result.success) {
          setBusiness(result.data)
        } else {
          throw new Error(result.message || 'Failed to fetch business details')
        }
      } catch (err) {
        setError('Failed to load business details')
        console.error('Error fetching business:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusiness()
  }, [params.id])

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

  const getDayName = (dayNumber: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayNumber]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Business</h3>
          <p className="text-gray-600">{error || 'Business not found'}</p>
          <Link href="/businesses">
            <Button className="mt-4">Back to Businesses</Button>
          </Link>
        </div>
      </div>
    )
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
                  src={business.media[selectedImage]?.url || business.thumbnail || "/placeholder.svg"}
                  alt={business.brandName}
                  className="w-full h-96 object-cover"
                />
              </div>
              {business.media.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {business.media.map((media, index) => (
                    <button
                      key={media._id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? "border-purple-500" : "border-transparent"
                      }`}
                    >
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt={`${business.brandName} ${index + 1}`}
                        className="w-full h-20 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Business Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.brandName}</h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-medium">{business.avgReview.toFixed(1)}</span>
                      <span className="text-gray-600">({business.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{business.address.city}, {business.address.state}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {business.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{business.about}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Details</h3>
                        <div className="space-y-2">
                          <p><span className="font-medium">Team Size:</span> {business.teamSize.min} - {business.teamSize.max || '∞'} employees</p>
                          <p><span className="font-medium">Business Type:</span> {business.isOnlineOnly ? 'Online Only' : 'Physical Location'}</p>
                          <p><span className="font-medium">Existing Software:</span> {business.existingSoftware}</p>
                          <p><span className="font-medium">Found Us At:</span> {business.foundUsAt}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {business.serviceCategories.map((category, index) => (
                            <div key={index} className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-600 font-semibold">{category.charAt(0)}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{category}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {business.employees.map((employee) => (
                    <Card key={employee._id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            <p className="text-purple-600">{employee.email}</p>
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
                        <p className="text-gray-600">
                          {business.address.addressLine1}
                          {business.address.addressLine2 && <br />}
                          {business.address.addressLine2}
                          <br />
                          {business.address.city}, {business.address.state}
                          <br />
                          {business.address.country} - {business.address.pincode}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                        <div className="space-y-2">
                          {business.timings.map((timing, index) => (
                            <div key={index}>
                              <p className="font-medium text-gray-700">
                                {timing.days.map(day => getDayName(day)).join(", ")}
                              </p>
                              {timing.time.map((t, i) => (
                                <p key={i} className="text-gray-600">
                                  {t.open.hour.toString().padStart(2, '0')}:{t.open.minute.toString().padStart(2, '0')} - 
                                  {t.close.hour.toString().padStart(2, '0')}:{t.close.minute.toString().padStart(2, '0')}
                                </p>
                              ))}
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
                  <span>Contact Business</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    Contact Owner
                  </Button>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Business Hours: {business.timings[0]?.time[0]?.open.hour.toString().padStart(2, '0')}:{business.timings[0]?.time[0]?.open.minute.toString().padStart(2, '0')} - {business.timings[0]?.time[0]?.close.hour.toString().padStart(2, '0')}:{business.timings[0]?.time[0]?.close.minute.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Team Size: {business.teamSize.min} - {business.teamSize.max || '∞'} employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Rating: {business.avgReview.toFixed(1)} ({business.reviewCount} reviews)</span>
                    </div>
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
