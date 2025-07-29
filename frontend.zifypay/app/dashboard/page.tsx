"use client"

import BusinessStatusChecker from "./BusinessStatusChecker"
import { useState, useEffect, useMemo } from "react"
import {
  Calendar,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CalendarDays,
  MessageSquare,
  User,
  ChevronDown,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { API_URL } from "@/lib/const"
import AppSidebar from "@/components/for-bussiness/AppSidebar"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Appointment {
  _id: string
  customer?: {
    name?: string
    firstName?: string
    lastName?: string
    profilePicture?: string
  }
  service?: {
    title?: string
  }
  staff?: {
    name?: string
  }
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  price?: number
}

interface Review {
  _id: string
  addedBy: {
    firstName: string
    lastName: string
    profilePicture?: string
  }
  stars: number
  text: string
  createdAt: string
}

const BusinessDashboard = () => {
  const router = require("next/navigation").useRouter()
  const [totalBookings, setTotalBookings] = useState<number | null>(null)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([])
  const [loadingToday, setLoadingToday] = useState(true)
  const [recentBookings, setRecentBookings] = useState<Appointment[]>([])
  const [loadingRecent, setLoadingRecent] = useState(true)
  const { toast } = useToast()
  const [statusLoading, setStatusLoading] = useState<{ [id: string]: boolean }>({})
  const [todaysRevenue, setTodaysRevenue] = useState<number | null>(null)
  const [bookingsToday, setBookingsToday] = useState<number | null>(null)
  const [loadingQuickStats, setLoadingQuickStats] = useState(true)
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null)
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [recentReviews, setRecentReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [customerSatisfaction, setCustomerSatisfaction] = useState<number | null>(null)
  const [loadingRatings, setLoadingRatings] = useState(true)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")

  const filteredAppointments = useMemo(() => {
    let filtered = [...todaysAppointments]
    if (statusFilter !== "all") {
      filtered = filtered.filter((appt) => appt.status === statusFilter)
    }
    filtered.sort((a, b) => {
      const timeA = a.time.split(":").map(Number)
      const timeB = b.time.split(":").map(Number)
      return timeA[0] - timeB[0] || timeA[1] - timeB[1]
    })
    return filtered
  }, [todaysAppointments, statusFilter])

  const fetchStats = async () => {
    setLoadingStats(true)
    try {
      let businessId = null
      if (typeof window !== "undefined") {
        const businessProfile = localStorage.getItem("businessProfile")
        if (businessProfile) {
          businessId = JSON.parse(businessProfile)._id
        }
      }
      if (!businessId) return

      const bookingsRes = await fetch(`${API_URL}/appointments/${businessId}/total-bookings`)
      const bookingsData = await bookingsRes.json()
      setTotalBookings(bookingsData.totalBookings ?? 0)

      const revenueRes = await fetch(`${API_URL}/appointments/${businessId}/monthly-revenue`)
      const revenueData = await revenueRes.json()
      setMonthlyRevenue(revenueData.monthlyRevenue ?? 0)
    } catch (err) {
      setTotalBookings(0)
      setMonthlyRevenue(0)
    } finally {
      setLoadingStats(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
  }, [router])

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    const fetchToday = async () => {
      setLoadingToday(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const res = await fetch(`${API_URL}/appointments/${businessId}/today`)
        const data = await res.json()
        setTodaysAppointments(data.data || [])
      } catch (err) {
        setTodaysAppointments([])
      } finally {
        setLoadingToday(false)
      }
    }

    fetchToday()
  }, [])

  useEffect(() => {
    const fetchRecent = async () => {
      setLoadingRecent(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const res = await fetch(`${API_URL}/appointments/${businessId}/recent`)
        const data = await res.json()
        setRecentBookings(data.data || [])
      } catch (err) {
        setRecentBookings([])
      } finally {
        setLoadingRecent(false)
      }
    }

    fetchRecent()
  }, [])

  useEffect(() => {
    const fetchQuickStats = async () => {
      setLoadingQuickStats(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const revenueRes = await fetch(`${API_URL}/appointments/${businessId}/today-revenue`)
        const revenueData = await revenueRes.json()
        setTodaysRevenue(revenueData.todaysRevenue ?? 0)

        const bookingsRes = await fetch(`${API_URL}/appointments/${businessId}/today-bookings`)
        const bookingsData = await bookingsRes.json()
        setBookingsToday(bookingsData.bookingsToday ?? 0)
      } catch (err) {
        setTodaysRevenue(0)
        setBookingsToday(0)
      } finally {
        setLoadingQuickStats(false)
      }
    }

    fetchQuickStats()
  }, [])

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      setLoadingCustomers(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const res = await fetch(`${API_URL}/appointments/${businessId}/total-customers`)
        const data = await res.json()
        setTotalCustomers(data.totalCustomers ?? 0)
      } catch (err) {
        setTotalCustomers(0)
      } finally {
        setLoadingCustomers(false)
      }
    }

    fetchTotalCustomers()
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const res = await fetch(`${API_URL}/businesses/${businessId}/reviews`)
        const data = await res.json()
        setRecentReviews((data.data || []).slice(0, 5))
      } catch (err) {
        setRecentReviews([])
      } finally {
        setLoadingReviews(false)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    const fetchRatings = async () => {
      setLoadingRatings(true)
      try {
        let businessId = null
        if (typeof window !== "undefined") {
          const businessProfile = localStorage.getItem("businessProfile")
          if (businessProfile) {
            businessId = JSON.parse(businessProfile)._id
          }
        }
        if (!businessId) return

        const avgRes = await fetch(`${API_URL}/appointments/${businessId}/average-rating`)
        const avgData = await avgRes.json()
        setAverageRating(avgData.averageRating ?? 0)

        const csRes = await fetch(`${API_URL}/appointments/${businessId}/customer-satisfaction`)
        const csData = await csRes.json()
        setCustomerSatisfaction(csData.customerSatisfaction ?? 0)
      } catch (err) {
        setAverageRating(0)
        setCustomerSatisfaction(0)
      } finally {
        setLoadingRatings(false)
      }
    }

    fetchRatings()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    setStatusLoading((prev) => ({ ...prev, [appointmentId]: true }))
    try {
      const res = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to update status")

      toast({
        title: "Status updated",
        description: `Status changed to ${status}`,
      })

      let businessId = null
      if (typeof window !== "undefined") {
        const businessProfile = localStorage.getItem("businessProfile")
        if (businessProfile) {
          businessId = JSON.parse(businessProfile)._id
        }
      }
      if (businessId) {
        const res = await fetch(`${API_URL}/appointments/${businessId}/today`)
        const data = await res.json()
        setTodaysAppointments(data.data || [])
      }

      if (status === "completed") {
        fetchStats()
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setStatusLoading((prev) => ({ ...prev, [appointmentId]: false }))
    }
  }

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">Dashboard Overview</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Welcome back! Here's what's happening today.</p>
            </div>
          </div>
        </header>

        <BusinessStatusChecker />

        <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{loadingStats ? "..." : totalBookings}</div>
                <p className="text-xs opacity-90">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{loadingStats ? "..." : `$${monthlyRevenue}`}</div>
                <p className="text-xs opacity-90">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Average Rating</CardTitle>
                <Star className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">
                  {loadingRatings ? "..." : averageRating !== null ? averageRating.toFixed(1) : "0"}
                </div>
                <p className="text-xs opacity-90">Based on {loadingReviews ? "..." : recentReviews.length} reviews</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Customers</CardTitle>
                <Users className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{loadingCustomers ? "..." : totalCustomers}</div>
                <p className="text-xs opacity-90">+5 new this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Today's Appointments */}
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base md:text-lg">Today's Appointments</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                      <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Link href="/dashboard/appointments">
                      <Button variant="ghost" size="sm" className="text-purple-600 h-8 px-2 text-xs">
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingToday ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="mx-auto h-8 w-8 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      {statusFilter === "all" ? "No appointments today" : `No ${statusFilter} appointments`}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {statusFilter === "all"
                        ? "All appointments are completed for today"
                        : "Try changing the status filter"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment._id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-lg border hover:border-purple-300 transition-all hover:shadow-sm bg-white gap-3 sm:gap-0"
                      >
                        <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                          <div className="flex flex-col items-center justify-center p-2 md:p-3 rounded-lg bg-purple-50 text-purple-600 min-w-[50px] md:min-w-[60px]">
                            <span className="font-medium text-sm md:text-lg">
                              {formatTimeDisplay(appointment.time)}
                            </span>
                            <span className="text-xs text-purple-500">
                              {new Date(appointment.date).toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900 truncate text-sm md:text-base">
                                {appointment.customer?.name || "Unknown Customer"}
                              </h4>
                              <Badge
                                variant={appointment.status === "completed" ? "default" : "outline"}
                                className={
                                  appointment.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "confirmed"
                                      ? "bg-blue-100 text-blue-800"
                                      : appointment.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
                              {appointment.service?.title || "No service specified"}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-gray-500 truncate">
                              <User className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">with {appointment.staff?.name || "Unassigned"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 self-end sm:self-auto">
                          <StatusDropdown
                            appointment={appointment}
                            onStatusChange={updateAppointmentStatus}
                            isLoading={statusLoading[appointment._id]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Today's Revenue</span>
                    <span className="font-medium">{loadingQuickStats ? "..." : `$${todaysRevenue}`}</span>
                  </div>
                  <Progress
                    value={
                      todaysRevenue && todaysRevenue > 0 ? Math.min(100, Math.round((todaysRevenue / 650) * 100)) : 0
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {todaysRevenue ? `${Math.round((todaysRevenue / 650) * 100)}% of daily goal` : "0% of daily goal"}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bookings Today</span>
                    <span className="font-medium">{loadingQuickStats ? "..." : bookingsToday}</span>
                  </div>
                  <Progress
                    value={
                      bookingsToday && bookingsToday > 0 ? Math.min(100, Math.round((bookingsToday / 12) * 100)) : 0
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {bookingsToday ? `${12 - bookingsToday} slots remaining` : "12 slots remaining"}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">
                      {loadingRatings
                        ? "..."
                        : customerSatisfaction !== null
                          ? `${customerSatisfaction.toFixed(0)}%`
                          : "0%"}
                    </span>
                  </div>
                  <Progress value={customerSatisfaction ? Math.round(customerSatisfaction) : 0} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Based on recent reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Bookings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Recent Bookings</span>
                  <Badge variant="outline" className="ml-2">
                    {recentBookings.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingRecent ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : recentBookings.length === 0 ? (
                    <div className="text-center py-6">
                      <Calendar className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No recent bookings</h3>
                      <p className="mt-1 text-xs text-gray-500">Your recent bookings will appear here.</p>
                    </div>
                  ) : (
                    <>
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking._id}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Avatar className="h-8 w-8 md:h-10 md:w-10 border flex-shrink-0">
                            <AvatarImage src={booking.customer?.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {booking.customer?.name?.charAt(0) || "C"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 text-sm truncate">{booking.customer?.name}</h4>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 truncate">{booking.service?.title || "-"}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">
                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Link href="/dashboard/appointments">
                          <Button variant="ghost" className="text-purple-600 w-full text-sm">
                            View all bookings
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                  <span>Recent Reviews</span>
                  <Badge variant="outline" className="ml-2">
                    {recentReviews.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingReviews ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : recentReviews.length === 0 ? (
                    <div className="text-center py-6">
                      <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                      <p className="mt-1 text-xs text-gray-500">Customer reviews will appear here.</p>
                    </div>
                  ) : (
                    <>
                      {recentReviews.slice(0, 3).map((review) => (
                        <div key={review._id} className="p-3 rounded-lg border">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                              <AvatarImage src={review.addedBy?.profilePicture || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {review.addedBy?.firstName?.charAt(0)}
                                {review.addedBy?.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900 text-sm truncate">
                                  {review.addedBy.firstName} {review.addedBy.lastName}
                                </h4>
                                <div className="flex items-center flex-shrink-0">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < review.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-1 text-xs text-gray-600 line-clamp-2">"{review.text}"</p>
                              <div className="mt-2 flex items-center text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Link href="/dashboard/reviews">
                          <Button variant="ghost" className="text-purple-600 w-full text-sm">
                            View all reviews
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

interface StatusDropdownProps {
  appointment: Appointment
  onStatusChange: (id: string, status: string) => void
  isLoading: boolean
}

const StatusDropdown = ({ appointment, onStatusChange, isLoading }: StatusDropdownProps) => {
  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "confirmed", label: "Confirmed", color: "bg-blue-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600 mr-2"></div>
              <span className="hidden sm:inline">Updating...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span
                className={`h-2 w-2 rounded-full ${
                  statusOptions.find((opt) => opt.value === appointment.status)?.color
                }`}
              ></span>
              <span className="ml-2 capitalize hidden sm:inline">{appointment.status}</span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(appointment._id, option.value)}
            className="flex items-center text-sm"
          >
            <span className={`h-2 w-2 rounded-full ${option.color} mr-2`}></span>
            <span>{option.label}</span>
            {appointment.status === option.value && <Check className="ml-auto h-3 w-3" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BusinessDashboard
