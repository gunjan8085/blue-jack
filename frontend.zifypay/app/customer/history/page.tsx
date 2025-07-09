"use client"

import { use, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "@/components/customer/Layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Search, Calendar, Clock, DollarSign, CheckCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import HeaderForCustomer from "@/components/customer/HeaderForCustomer"
import { format } from "date-fns"
import { API_URL } from "@/lib/const"

interface Appointment {
  id: string
  businessId: string
  businessName: string
  service: string
  staffName: string
  date: string
  time: string
  status: string
  logo: string
  category: string
  businessRating: number
  duration: number
  location: string
  paymentAmount: number
  paymentStatus: string
  hasReview: boolean
  review?: {
    _id: string
    stars: number
    text: string
    createdAt: string
    addedBy: {
      name: string
      email: string
    }
  }
}

const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
  size = "md"
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={readonly}
          className={`${readonly ? "cursor-default" : "cursor-pointer"}`}
          whileHover={readonly ? {} : { scale: 1.1 }}
          whileTap={readonly ? {} : { scale: 0.9 }}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => !readonly && onRatingChange?.(star)}
        >
          <Star
            className={`${sizes[size]} transition-colors ${
              star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </motion.button>
      ))}
    </div>
  )
}

export default function HistoryPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [search, setSearch] = useState("")
  const [editReview, setEditReview] = useState<{ [key: string]: boolean }>({})
  const [reviewData, setReviewData] = useState<{ [key: string]: { rating: number; comment: string } }>({})
  const [loading, setLoading] = useState(true)
  const [submittingReviews, setSubmittingReviews] = useState<{ [key: string]: boolean }>({})

  const email = typeof window !== 'undefined' ? localStorage.getItem("userEmail") || "prityush@gmail.com" : ""

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_URL}/appointments/customer/completed?email=${encodeURIComponent(email)}`)
        
        if (res.data?.success) {
          const appointmentsWithReviews = await Promise.all(
            res.data.data.map(async (appointment: Appointment) => {
              try {
                const token = localStorage.getItem("token") || ""
                
                const reviewCheck = await axios.get(
                  `${API_URL}/businesses/${appointment.businessId}/reviews/check`,
                  {
                    params: { appointmentId: appointment.id,
                              userId: localStorage.getItem("userId") || ""
                     },
                    headers: { Authorization: `Bearer ${token}` }
                  }
                )
                
                if (reviewCheck.data?.success && reviewCheck.data.exists) {
                  return {
                    ...appointment,
                    hasReview: true,
                    review: reviewCheck.data.data
                  }
                }
                return appointment
              } catch (error) {
                return appointment
              }
            })
          )
          setAppointments(appointmentsWithReviews)
        } else {
          setAppointments([])
        }
      } catch (error) {
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [email])

  const handleReviewSubmit = async (id: string) => {
    const data = reviewData[id]
    if (!data) return
    
    const appointment = appointments.find(a => a.id === id)
    if (!appointment || appointment.hasReview) return
    
    setSubmittingReviews(prev => ({ ...prev, [id]: true }))
    
    try {
      const token = localStorage.getItem("token") || ""
      const response = await axios.post(
        `${API_URL}/businesses/${appointment.businessId}/reviews`,
        {
          text: data.comment,
          stars: data.rating,
          appointment: id,
          userId: localStorage.getItem("userId") || ""
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAppointments(prev =>
        prev.map(a =>
          a.id === id
            ? {
                ...a,
                hasReview: true,
                review: response.data.data
              }
            : a
        )
      )
      setEditReview(prev => ({ ...prev, [id]: false }))
      setReviewData(prev => ({ ...prev, [id]: { rating: 5, comment: "" } }))
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit review. Please try again.")
    } finally {
      setSubmittingReviews(prev => ({ ...prev, [id]: false }))
    }
  }

  const startEditReview = (appointment: Appointment) => {
    if (appointment.hasReview) return
    setEditReview(prev => ({ ...prev, [appointment.id]: true }))
    setReviewData(prev => ({
      ...prev,
      [appointment.id]: {
        rating: appointment.review?.stars || 5,
        comment: appointment.review?.text || "",
      },
    }))
  }

  const updateReviewData = (id: string, field: "rating" | "comment", value: number | string) => {
    setReviewData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const filtered = appointments.filter(
    a =>
      a.status === "completed" &&
      (a.businessName.toLowerCase().includes(search.toLowerCase()) ||
        a.service.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse max-w-md"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <HeaderForCustomer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto py-6 px-4 max-w-6xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointment History</h1>
            <p className="text-gray-600">View and manage your past appointments</p>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search appointments..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 w-full md:w-64"
            />
          </div>
        </div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 rounded-lg border border-dashed border-gray-200"
            >
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No completed appointments found</p>
              <p className="text-gray-400 text-sm mt-2">
                {search ? "Try a different search term" : "Your completed appointments will appear here"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appointment.businessName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{appointment.service}</span>
                          <span>•</span>
                          <span>{appointment.staffName}</span>
                        </CardDescription>
                      </div>
                      <Badge
                        variant={appointment.status === "completed" ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {appointment.status === "completed" && <CheckCircle className="w-3 h-3" />}
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={appointment.logo} />
                            <AvatarFallback>{appointment.businessName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{appointment.businessName}</h3>
                            <p className="text-sm text-gray-500">{appointment.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{appointment.businessRating.toFixed(1)}</span>
                          <span className="text-gray-400">•</span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{format(new Date(appointment.date), "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>${appointment.paymentAmount.toFixed(2)}</span>
                          <Badge variant="outline" className="ml-2">
                            {appointment.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Duration:</span>
                          <span>{appointment.duration} mins</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Review Section */}
                    <div className="p-6">
                      {appointment.hasReview && appointment.review ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-3 bg-green-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-green-800">Your Review</h3>
                            <span className="text-xs text-green-600">
                              {format(new Date(appointment.review.createdAt), "PP")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StarRating rating={appointment.review.stars} readonly size="sm" />
                            <span className="text-sm text-gray-600">
                              {appointment.review.stars.toFixed(1)} stars
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">"{appointment.review.text}"</p>
                        </motion.div>
                      ) : editReview[appointment.id] ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 border border-gray-200 rounded-lg p-4"
                        >
                          <h3 className="font-medium">Leave a Review</h3>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rating</label>
                            <StarRating
                              rating={reviewData[appointment.id]?.rating || 5}
                              onRatingChange={rating => updateReviewData(appointment.id, "rating", rating)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Share your experience
                            </label>
                            <Textarea
                              placeholder="What did you like about the service?"
                              value={reviewData[appointment.id]?.comment || ""}
                              onChange={e => updateReviewData(appointment.id, "comment", e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleReviewSubmit(appointment.id)}
                              disabled={submittingReviews[appointment.id]}
                            >
                              {submittingReviews[appointment.id] ? "Submitting..." : "Submit Review"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditReview(prev => ({ ...prev, [appointment.id]: false }))}
                              disabled={submittingReviews[appointment.id]}
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => startEditReview(appointment)}
                        >
                          Write a Review
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </Layout>
  )
}