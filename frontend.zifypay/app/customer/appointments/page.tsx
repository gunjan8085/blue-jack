"use client"
import React from 'react'
import Layout from '@/components/customer/Layout';

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Star,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    businessName: "Elite Hair Studio",
    category: "Beauty & Wellness",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Premium Hair Cut & Styling",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: 90,
    location: "123 Fashion Ave, New York, NY",
    status: "confirmed",
    paymentAmount: 85,
    paymentMode: "Credit Card",
    paymentStatus: "paid",
    userRating: 5,
    userReview: "Amazing service! The stylist was very professional and I love my new look.",
    businessRating: 4.8,
  },
  {
    id: 2,
    businessName: "TechFix Solutions",
    category: "Technology",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Laptop Screen Repair",
    date: "2024-01-18",
    time: "2:30 PM",
    duration: 120,
    location: "456 Tech Street, San Francisco, CA",
    status: "pending",
    paymentAmount: 150,
    paymentMode: "PayPal",
    paymentStatus: "pending",
    userRating: null,
    userReview: null,
    businessRating: 4.6,
  },
  {
    id: 3,
    businessName: "Wellness Spa Retreat",
    category: "Health & Wellness",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Deep Tissue Massage",
    date: "2024-01-12",
    time: "4:00 PM",
    duration: 60,
    location: "789 Zen Boulevard, Los Angeles, CA",
    status: "completed",
    paymentAmount: 120,
    paymentMode: "Cash",
    paymentStatus: "paid",
    userRating: 4,
    userReview: "Very relaxing experience. The therapist was skilled and the ambiance was perfect.",
    businessRating: 4.9,
  },
  {
    id: 4,
    businessName: "AutoCare Express",
    category: "Automotive",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Full Car Detailing",
    date: "2024-01-20",
    time: "9:00 AM",
    duration: 180,
    location: "321 Motor Way, Chicago, IL",
    status: "confirmed",
    paymentAmount: 200,
    paymentMode: "Debit Card",
    paymentStatus: "paid",
    userRating: null,
    userReview: null,
    businessRating: 4.7,
  },
  {
    id: 5,
    businessName: "Dental Care Plus",
    category: "Healthcare",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Teeth Cleaning & Checkup",
    date: "2024-01-08",
    time: "11:30 AM",
    duration: 45,
    location: "654 Health Plaza, Miami, FL",
    status: "cancelled",
    paymentAmount: 75,
    paymentMode: "Insurance",
    paymentStatus: "refunded",
    userRating: null,
    userReview: null,
    businessRating: 4.5,
  },
  {
    id: 6,
    businessName: "Fitness First Gym",
    category: "Fitness",
    logo: "/placeholder.svg?height=60&width=60",
    serviceName: "Personal Training Session",
    date: "2024-01-25",
    time: "6:00 PM",
    duration: 60,
    location: "987 Fitness Street, Austin, TX",
    status: "confirmed",
    paymentAmount: 60,
    paymentMode: "Monthly Plan",
    paymentStatus: "paid",
    userRating: null,
    userReview: null,
    businessRating: 4.4,
  },
]

// Star Rating Component
const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
}: { rating: number; onRatingChange?: (rating: number) => void; readonly?: boolean }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
        >
          <Star className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        </button>
      ))}
    </div>
  )
}

// Review Modal Component
const ReviewModal = ({
  appointment,
  onSubmit,
}: { appointment: any; onSubmit: (rating: number, review: string) => void }) => {
  const [rating, setRating] = useState(appointment.userRating || 0)
  const [review, setReview] = useState(appointment.userReview || "")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      })
      return
    }
    onSubmit(rating, review)
    setIsOpen(false)
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          {appointment.userRating ? "Update Review" : "Add Review"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Your Experience</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Rate your experience</Label>
            <div className="mt-2">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>
          <div>
            <Label htmlFor="review" className="text-sm font-medium">
              Write a review (optional)
            </Label>
            <Textarea
              id="review"
              placeholder="Share your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Review</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Rebook Modal Component
const RebookModal = ({ appointment, onRebook }: { appointment: any; onRebook: (data: any) => void }) => {
  const [date, setDate] = useState(appointment.date)
  const [time, setTime] = useState(appointment.time)
  const [isOpen, setIsOpen] = useState(false)

  const handleRebook = () => {
    onRebook({ ...appointment, date, time })
    setIsOpen(false)
    toast({
      title: "Rebooking Requested",
      description: "Your rebooking request has been submitted successfully.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Rebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rebook Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium">{appointment.serviceName}</p>
            <p className="text-sm text-muted-foreground">{appointment.businessName}</p>
          </div>
          <div>
            <Label htmlFor="date" className="text-sm font-medium">
              New Date
            </Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm font-medium">
              New Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time.replace(" AM", "").replace(" PM", "")}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRebook}>Confirm Rebook</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Appointment Card Component
const AppointmentCard = ({
  appointment,
  onReview,
  onRebook,
}: { appointment: any; onReview: (rating: number, review: string) => void; onRebook: (data: any) => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "refunded":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={appointment.logo || "/placeholder.svg"} alt={appointment.businessName} />
                <AvatarFallback>{appointment.businessName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{appointment.businessName}</h3>
                <p className="text-sm text-muted-foreground">{appointment.category}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{appointment.businessRating}</span>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-base mb-2">{appointment.serviceName}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{appointment.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span>${appointment.paymentAmount} - </span>
                <span className={getPaymentStatusColor(appointment.paymentStatus)}>{appointment.paymentStatus}</span>
              </div>
            </div>
          </div>

          {appointment.userRating && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Your Review:</span>
                <StarRating rating={appointment.userRating} readonly />
              </div>
              {appointment.userReview && <p className="text-sm text-muted-foreground">{appointment.userReview}</p>}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <ReviewModal appointment={appointment} onSubmit={onReview} />
            <RebookModal appointment={appointment} onRebook={onRebook} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Skeleton Loading Component
const AppointmentSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </CardContent>
  </Card>
)

// Main Appointments Component
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 4

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter appointments based on search and tab
  const filteredAppointments = useMemo(() => {
    let filtered = appointments

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.date.includes(searchTerm),
      )
    }

    // Filter by tab
    if (activeTab !== "all") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(0, 0, 0, 0)

        switch (activeTab) {
          case "upcoming":
            return appointmentDate >= today && appointment.status !== "cancelled"
          case "past":
            return appointmentDate < today || appointment.status === "completed"
          case "cancelled":
            return appointment.status === "cancelled"
          default:
            return true
        }
      })
    }

    return filtered
  }, [appointments, searchTerm, activeTab])

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleReview = (appointmentId: number, rating: number, review: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === appointmentId ? { ...apt, userRating: rating, userReview: review } : apt)),
    )
  }

  const handleRebook = (rebookData: any) => {
    // In a real app, this would make an API call
    console.log("Rebooking appointment:", rebookData)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-10 w-full max-w-sm" />
        </div>
        <div className="grid gap-6">
          {[...Array(4)].map((_, i) => (
            <AppointmentSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Layout>
    <div className="container mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h1 className="text-3xl font-bold">My Appointments</h1>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Appointments List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {paginatedAppointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No appointments found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms." : "You have no appointments in this category."}
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6">
              {paginatedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReview={(rating, review) => handleReview(appointment.id, rating, review)}
                  onRebook={handleRebook}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>

      <Toaster />
    </div>
    </Layout >
  )
}
