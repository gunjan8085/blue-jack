"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "@/components/customer/Layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Search, Calendar, Clock, DollarSign, CheckCircle, Edit3, RotateCcw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

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
  userRating: number
  userReview: string
  review?: {
    rating: number
    comment: string
  }
}

const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}) => {
  const [hoverRating, setHoverRating] = useState(0)

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
            className={`w-5 h-5 transition-colors ${
              star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </motion.button>
      ))}
    </div>
  )
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001/api/v1"

export default function HistoryPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [search, setSearch] = useState("")
  const [editReview, setEditReview] = useState<{ [key: string]: boolean }>({})
  const [reviewData, setReviewData] = useState<{ [key: string]: { rating: number; comment: string } }>({})
  const [loading, setLoading] = useState(true)

  // Get email dynamically (replace with your auth/user context as needed)
  const email = typeof window !== 'undefined' ? localStorage.getItem("email") || "prityush@gmail.com" : ""

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_BASE}/appointments/customer/completed?email=${encodeURIComponent(email)}`)
      .then((res) => {
        if (res.data && res.data.success) {
          setAppointments(res.data.data)
        } else {
          setAppointments([])
        }
        setLoading(false)
      })
      .catch(() => {
        setAppointments([])
        setLoading(false)
      })
  }, [email])

  const handleRebook = (appointment: Appointment) => {
    const updatedPrice = Math.round(appointment.paymentAmount * 1.1)
    // Add success feedback
    const button = document.activeElement as HTMLButtonElement
    button.textContent = "Booked!"
    setTimeout(() => {
      button.textContent = "Rebook"
    }, 2000)
  }

  const handleReviewSubmit = async (id: string) => {
    const data = reviewData[id]
    if (!data) return

    // Find the appointment to get businessId
    const appointment = appointments.find((a) => a.id === id)
    if (!appointment) return

    try {
      // Replace with actual token logic
      const token = localStorage.getItem("token") || ""
      await axios.post(
        `${API_BASE}/reviews`,
        {
          businessId: appointment.businessId || "", // You may need to add businessId to Appointment type
          text: data.comment,
          stars: data.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, review: { rating: data.rating, comment: data.comment } } : a)),
      )
      setEditReview((prev) => ({ ...prev, [id]: false }))
      setReviewData((prev) => ({ ...prev, [id]: { rating: 5, comment: "" } }))
    } catch (err) {
      alert("Failed to submit review. Please try again.")
    }
  }

  const startEditReview = (appointment: Appointment) => {
    setEditReview((prev) => ({ ...prev, [appointment.id]: true }))
    setReviewData((prev) => ({
      ...prev,
      [appointment.id]: {
        rating: appointment.review?.rating || 5,
        comment: appointment.review?.comment || "",
      },
    }))
  }

  const updateReviewData = (id: string, field: "rating" | "comment", value: number | string) => {
    setReviewData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const filtered = appointments.filter(
    (a) =>
      a.status === "completed" &&
      (a.businessName.toLowerCase().includes(search.toLowerCase()) ||
        a.service.toLowerCase().includes(search.toLowerCase())),
  )

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse max-w-md"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Appointment History
        </h1>

        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by business or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 max-w-md h-12 border-2 focus:border-blue-500 transition-colors"
          />
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No appointments found.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <AnimatePresence>
            {filtered.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                          {appointment.businessName}
                        </h2>
                        <p className="text-gray-600 font-medium">{appointment.service}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
                          <DollarSign className="w-5 h-5" />₹{appointment.paymentAmount}
                        </div>
                        <Badge
                          variant={appointment.status === "completed" ? "default" : "secondary"}
                          className={`${
                            appointment.status === "completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          }`}
                        >
                          {appointment.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Review Section */}
                    <motion.div className="mt-6 p-4 bg-gray-50 rounded-lg" layout>
                      <AnimatePresence mode="wait">
                        {appointment.review && !editReview[appointment.id] ? (
                          <motion.div
                            key="review-display"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-700">Your Review:</span>
                                  <StarRating rating={appointment.review.rating} readonly />
                                </div>
                                <p className="text-gray-700 italic">"{appointment.review.comment}"</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditReview(appointment)}
                                className="hover:bg-blue-100 hover:text-blue-600"
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="review-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Rating</label>
                              <StarRating
                                rating={reviewData[appointment.id]?.rating || 5}
                                onRatingChange={(rating) => updateReviewData(appointment.id, "rating", rating)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">Comment</label>
                              <Textarea
                                placeholder="Share your experience..."
                                value={reviewData[appointment.id]?.comment || ""}
                                onChange={(e) => updateReviewData(appointment.id, "comment", e.target.value)}
                                className="resize-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleReviewSubmit(appointment.id)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Submit Review
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditReview((prev) => ({ ...prev, [appointment.id]: false }))}
                              >
                                Cancel
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Rebook Button */}
                    <div className="mt-6 flex justify-end">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          onClick={() => handleRebook(appointment)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Rebook (+10% price)
                        </Button>
                      </motion.div>
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
