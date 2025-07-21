"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, Clock, Phone, Globe, Calendar, User, ArrowLeft, Heart, Share2, AlertCircle, BookOpen, CheckCircle } from "lucide-react"
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
import { getUserData } from "@/lib/auth"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
  profilePicUrl: string
  isOwner: boolean
}

interface Service {
  _id: string
  title: string
  description: string
  hashtags: string[]
  imageUrl: string
  tags: string[]
  price: number
  duration: number
  isActive: boolean
  createdAt: string
}

interface Business {
  _id: string
  brandName: string
  website: string
  thumbnail: string
  about: string
  serviceCategories: {
    _id: string
    name: string
    description: string
    appointmentColor: string
  }[]
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

interface ServicesApiResponse {
  success: boolean
  data: Service[]
  message: string
}

export default function BusinessProfilePage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [business, setBusiness] = useState<Business | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isServicesLoading, setIsServicesLoading] = useState(false)
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null)
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    address : "",
    city : "",
    state : "",
    zipCode : "",
  }); //{ cardNumber, expDate, cvv, firstName, lastName, address, city, state, zipCode }

  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [isSlotAvailable, setIsSlotAvailable] = useState(null); // null | true | false

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/business/${params.id}`)
        const result: ApiResponse = await response.json()
        if (result.success) {
          console.log('Business data:', result.data)
          console.log('Service categories:', result.data.serviceCategories)
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

  const handleShare = async () => {
    const shareData = {
      title: `Check out ${business?.brandName}`,
      text: `I found this great business: ${business?.brandName}. Check out their services!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Use Web Share API if available (mobile devices)
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareData.text
        )}&url=${encodeURIComponent(shareData.url)}`;
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const fetchServices = async () => {
    try {
      setIsServicesLoading(true)
      const response = await fetch(`${API_URL}/service-categories/${params.id}/service-categories`)
      const result: ServicesApiResponse = await response.json()
      if (result.success) {
        console.log('Services data:', result.data)
        setServices(result.data.filter(service => service.isActive && service.title))
      } else {
        console.error('Failed to fetch services:', result.message)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setIsServicesLoading(false)
    }
  }

  const handleBookingNext = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1)
      setBookingError(null)
      setBookingSuccess(null)
    }
  }

  const handleBookingBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
      setBookingError(null)
      setBookingSuccess(null)
    }
  }



  const checkAvailableStaff = async () => {
  setCheckingAvailability(true);
  setCheckError("");

  try {
    const res = await fetch(`${API_URL}/appointments/check-availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staff: selectedStaff,   // Make sure you have selectedStaffId in state
        date: selectedDate,
        time: selectedTime,
      }),
    });

    const data = await res.json();

    if (data.success && data.available) {
      setBookingStep((prev) => prev + 1);
    } else {
      setCheckError("Selected time slot is not available. Please choose another.");
    }
  } catch (error) {
    setCheckError("Failed to check availability. Please try again.");
  }

  setCheckingAvailability(false);
};


useEffect(() => {
  const autoCheckAvailability = async () => {
    if (!selectedDate || !selectedTime || !selectedStaff) return;

    setCheckingAvailability(true);
    setCheckError("");
    setIsSlotAvailable(null);

    try {
      const res = await fetch(`${API_URL}/appointments/check-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staff: selectedStaff,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSlotAvailable(data.available);
        if (!data.available) {
          setCheckError("Selected time slot is not available.");
        }
      } else {
        setCheckError("Unable to verify availability.");
      }
    } catch (err) {
      setCheckError("Error checking availability.");
    }

    setCheckingAvailability(false);
  };

  autoCheckAvailability();
}, [selectedDate, selectedTime, selectedStaff]);


  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setBookingError('Please fill in all required fields')
      return
    }

    try {
      setIsBookingLoading(true)
      setBookingError(null)
      setBookingSuccess(null)

      const user = getUserData();
      const payload = {
        service: selectedService._id,
        staff: selectedStaff,
        date: selectedDate.trim(),
        time: selectedTime.trim(),
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          notes: customerInfo.notes || ""
        },
        user: user?._id,
        paymentDetails
      }

      const response = await fetch(`${API_URL}/appointments/${params.id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        console.log("Appointment created successfully:", result.data)
        setBookingSuccess("Appointment booked successfully! You will receive a confirmation email shortly.")

        // Reset form after a short delay to show success message
        setTimeout(() => {
          setIsBookingOpen(false)
          setBookingStep(1)
          setSelectedService(null)
          setSelectedStaff("")
          setSelectedDate("")
          setSelectedTime("")
          setCustomerInfo({ name: "", email: "", phone: "", notes: "" })
          setBookingSuccess(null)
        }, 2000)
      } else if (response.status === 409 && result.message === "This slot is booked") {
        setBookingError("This slot is already booked. Please choose another time or staff member.");
      } else {
        throw new Error(result.message || 'Failed to create appointment')
      }
    } catch (err) {
      console.error('Error creating appointment:', err)
      setBookingError(err instanceof Error ? err.message : 'Failed to create appointment')
    } finally {
      setIsBookingLoading(false)
    }
  }

  const openBookingDialog = (service: Service) => {
    const user = getUserData()
    if (!user) {
      // Redirect to login page with current URL as redirect parameter
      router.push(`/customer/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }
    setSelectedService(service)
    setIsBookingOpen(true)
    setBookingStep(1)
    setBookingError(null)
    setBookingSuccess(null)
  }

  const getDayName = (dayNumber: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayNumber]
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
    }
    return `${minutes}m`
  }

  // Add a useEffect to pre-fill customerInfo when booking dialog opens
  useEffect(() => {
    if (isBookingOpen) {
      const user = getUserData();
      if (user) {
        setCustomerInfo((prev) => ({
          name: prev.name || user.firstName || user.name || "",
          email: prev.email || user.email || "",
          phone: prev.phone || user.phoneNumber || user.phone || "",
          notes: prev.notes || ""
        }));
      }
    }
  }, [isBookingOpen]);
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/business/${params.id}`)
        const result: ApiResponse = await response.json()
        if (result.success) {
          console.log('Business data:', result.data)
          console.log('Service categories:', result.data.serviceCategories)
          setBusiness(result.data)
          // Fetch services immediately after business data is loaded
          await fetchServices()
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

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (selectedStaff && selectedDate) {
        try {
          const response = await fetch(`${API_URL}/appointments/${params.id}/employee/${selectedStaff}/booked?date=${selectedDate}`);
          const result = await response.json();
          if (result.success) {
            setBookedTimes(result.data);
          } else {
            setBookedTimes([]);
          }
        } catch (err) {
          setBookedTimes([]);
        }
      } else {
        setBookedTimes([]);
      }
    };
    fetchBookedTimes();
  }, [selectedStaff, selectedDate, params.id]);

  // Define all possible time slots
  const allTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00"
  ];
  const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

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
              <Link href="/customer/home">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsShareOpen(true)}
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={business.media.length > 0 ? business.media[selectedImage]?.url : (business.thumbnail || "/placeholder.svg")}
                  alt={business.brandName}
                  className="w-full h-96 object-cover"
                />
                {/* Carousel Arrows */}
                {business.media.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md z-10"
                      onClick={() => setSelectedImage((selectedImage - 1 + business.media.length) % business.media.length)}
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md z-10"
                      onClick={() => setSelectedImage((selectedImage + 1) % business.media.length)}
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </>
                )}
              </div>
              {business.media.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {business.media.slice(0, 4).map((media, index) => (
                    <button
                      key={media.url || index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index ? "border-purple-500" : "border-transparent"}`}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt={`${business.brandName} ${index + 1}`}
                        className="w-full h-20 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                  {business.media.length > 5 && (
                    <button
                      key={business.media[4].url || 4}
                      onClick={() => setSelectedImage(4)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${selectedImage === 4 ? "border-purple-500" : "border-transparent"}`}
                      aria-label={`Show image 5 and more`}
                    >
                      <img
                        src={business.media[4].url || "/placeholder.svg"}
                        alt={`${business.brandName} 5`}
                        className="w-full h-20 object-cover hover:scale-105 transition-transform opacity-70"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-semibold text-lg">+{business.media.length - 4}</span>
                    </button>
                  )}
                  {business.media.length === 5 && (
                    <button
                      key={business.media[4].url || 4}
                      onClick={() => setSelectedImage(4)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${selectedImage === 4 ? "border-purple-500" : "border-transparent"}`}
                      aria-label={`Show image 5`}
                    >
                      <img
                        src={business.media[4].url || "/placeholder.svg"}
                        alt={`${business.brandName} 5`}
                        className="w-full h-20 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  )}
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
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h3>

                        {isServicesLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                          </div>
                        ) : services.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service) => (
                              <Card key={service._id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    {service.imageUrl && (
                                      <div className="relative h-32 overflow-hidden rounded-lg">
                                        <img
                                          src={service.imageUrl}
                                          alt={service.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-semibold text-gray-900 text-lg">{service.title}</h4>
                                      {service.description && (
                                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span className="font-medium text-purple-600">{formatPrice(service.price)}</span>
                                        <span>{formatDuration(service.duration)}</span>
                                      </div>
                                      <Button
                                        onClick={() => openBookingDialog(service)}
                                        className="bg-purple-600 hover:bg-purple-700"
                                      >
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        Book Appointment
                                      </Button>
                                    </div>
                                    {service.tags && service.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1">
                                        {service.tags.map((tag, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No services available at the moment.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {business.employees
                    .filter(employee => !employee.isOwner) // Filter out owners
                    .map((employee) => (
                      <Card key={employee._id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={employee.profilePicUrl} />
                              <AvatarFallback>
                                {employee.name.charAt(0)}
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

                      {/* <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Map would be integrated here</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4">
              {/* Error Message */}
              {bookingError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-600">{bookingError}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {bookingSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600">{bookingSuccess}</p>
                  </div>
                </div>
              )}

              {/* Step 1: Service Details */}
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{selectedService.title}</h3>
                    {selectedService.description && (
                      <p className="text-sm text-gray-600 mt-1">{selectedService.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-purple-600">{formatPrice(selectedService.price)}</span>
                      <span className="text-sm text-gray-600">{formatDuration(selectedService.duration)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staff">Select Staff Member</Label>
                    <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                      <SelectTrigger>
                        {selectedStaff ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={business.employees.find(e => e._id === selectedStaff)?.profilePicUrl}
                              />
                              <AvatarFallback>
                                {business.employees.find(e => e._id === selectedStaff)?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{business.employees.find(e => e._id === selectedStaff)?.name}</span>
                          </div>
                        ) : (
                          "Choose a staff member"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {business.employees
                          .filter(employee => !employee.isOwner) // Filter out owners
                          .map((employee) => (
                            <SelectItem key={employee._id} value={employee._id}>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={employee.profilePicUrl} />
                                  <AvatarFallback>
                                    {employee.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <p className="text-xs text-gray-500">{employee.email}</p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleBookingNext} className="w-full" disabled={!selectedStaff}>
                    Next
                  </Button>
                </div>
              )}

              {/* Step 2: Date and Time */}
              {bookingStep === 2 && (
                <div className="space-y-4">

                     {isSlotAvailable === true && (
                        <div className="text-green-600 text-sm">Slot is available</div>
                      )}
                      {isSlotAvailable === false && (
                        <div className="text-red-500 text-sm">Slot not available</div>
                      )}
                      {checkingAvailability && (
                        <div className="text-gray-500 text-sm">Checking availability...</div>
                      )}



                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date(Date.now()).toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Select Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.length > 0 ? (
                          availableTimes.map(time => (
                            <SelectItem key={time} value={time}>
                              {`${parseInt(time) > 12 ? parseInt(time) - 12 : parseInt(time)}:${time.slice(3)} ${parseInt(time) >= 12 ? 'PM' : 'AM'}`}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">No available times</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={checkAvailableStaff} className="flex-1">
                      Back
                    </Button>
                   <Button
                        onClick={handleBookingNext}
                        className="flex-1"
                        disabled={
                          !selectedDate || !selectedTime || checkingAvailability || isSlotAvailable === false
                        }
                      >
                        {checkingAvailability ? "Checking..." : "Next"}
                      </Button>


                      

                  </div>
                </div>
              )}

              {/* Step 3: Customer Information */}
              {bookingStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      placeholder="Any special requests or notes"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleBookingBack} className="flex-1" disabled={isBookingLoading}>
                      Back
                    </Button>
                    {/* <Button
                      onClick={handleBookingSubmit}
                      className="flex-1"
                      disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || isBookingLoading}
                    >

                   
                      {isBookingLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </Button> */}

                       <Button onClick={handleBookingNext} className="flex-1" >
                      Next
                    </Button>
                  </div>
                </div>
              )}

         {bookingStep === 4 && (
  <div className="space-y-4">
    <h1>Complete Payment</h1>

    {/* Card Number */}
    <div className="space-y-2">
      <Label htmlFor="cardNumber">Card Number *</Label>
      <Input
        type="text"
        inputMode="numeric"
        pattern="\d{16}"
        maxLength={17}
        placeholder="1234567812345678"
        value={paymentDetails.cardNumber}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '');
          if (val.length <= 16) setPaymentDetails({ ...paymentDetails, cardNumber: val });
        }}
      />
    </div>

    {/* Expiry Date & CVV */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiry Date (MMYY) *</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          placeholder="MMYY"
          value={paymentDetails.expiryDate}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 4) setPaymentDetails({ ...paymentDetails, expiryDate: val });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cvv">CVV *</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d{3,4}"
          maxLength={4}
          placeholder="123"
          value={paymentDetails.cvv}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 4) setPaymentDetails({ ...paymentDetails, cvv: val });
          }}
        />
      </div>
    </div>

    {/* Name on Card */}
    <div className="space-y-2">
      <Label htmlFor="firstName">First Name on Card *</Label>
      <Input
        type="text"
        placeholder="First Name"
        value={paymentDetails.firstName}
        onChange={(e) => {
          const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setPaymentDetails({ ...paymentDetails, firstName: val });
        }}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="lastName">Last Name on Card *</Label>
      <Input
        type="text"
        placeholder="Last Name"
        value={paymentDetails.lastName}
        onChange={(e) => {
          const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
          setPaymentDetails({ ...paymentDetails, lastName: val });
        }}
      />
    </div>

    {/* Billing Address */}
    <div className="space-y-2">
      <Label htmlFor="address">Billing Address *</Label>
      <Input
        type="text"
        placeholder="123 Main St"
        value={paymentDetails.address}
        onChange={(e) => setPaymentDetails({ ...paymentDetails, address: e.target.value })}
      />
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          type="text"
          value={paymentDetails.city}
          onChange={(e) => {
            const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setPaymentDetails({ ...paymentDetails, city: val });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <Input
          type="text"
          maxLength={2}
          value={paymentDetails.state.toUpperCase()}
          onChange={(e) => {
            const val = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
            if (val.length <= 2) setPaymentDetails({ ...paymentDetails, state: val });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP Code *</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={10}
          value={paymentDetails.zipCode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 10) setPaymentDetails({ ...paymentDetails, zipCode: val });
          }}
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex space-x-2">
      <Button variant="outline" onClick={handleBookingBack} className="flex-1" disabled={isBookingLoading}>
        Back
      </Button>
      <Button
        onClick={handleBookingSubmit}
        className="flex-1"
        disabled={
          !paymentDetails.cardNumber ||
          !paymentDetails.expiryDate ||
          !paymentDetails.cvv ||
          !paymentDetails.firstName ||
          !paymentDetails.lastName ||
          !paymentDetails.address ||
          !paymentDetails.city ||
          !paymentDetails.state ||
          !paymentDetails.zipCode ||
          isBookingLoading
        }
      >
        {isBookingLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          'Pay & Book'
        )}
      </Button>
    </div>
  </div>
)}

              

            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="h-96"></div>

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share {business?.brandName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              {/* Twitter */}
              <button
                onClick={() => {
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Check out ${business?.brandName}`
                  )}&url=${encodeURIComponent(window.location.href)}`;
                  window.open(url, '_blank');
                }}
                className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                onClick={() => {
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`;
                  window.open(url, '_blank');
                }}
                className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    window.location.href
                  )}&title=${encodeURIComponent(business?.brandName || '')}&summary=${encodeURIComponent(
                    business?.about || ''
                  )}`;
                  window.open(url, '_blank');
                }}
                className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                value={window.location.href}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
