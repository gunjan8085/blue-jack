"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  Plus,
  Settings,
  BarChart3,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Mock dashboard data
const dashboardData = {
  stats: {
    totalBookings: 145,
    monthlyRevenue: 3200,
    averageRating: 4.7,
    totalCustomers: 89,
  },
  recentBookings: [
    {
      id: 1,
      customer: "Sarah Johnson",
      service: "Hair Color",
      staff: "Ayesha Khan",
      date: "2025-06-12",
      time: "2:30 PM",
      status: "confirmed",
      price: 85,
    },
    {
      id: 2,
      customer: "Michael Chen",
      service: "Men's Haircut",
      staff: "Marcus Johnson",
      date: "2025-06-12",
      time: "3:00 PM",
      status: "confirmed",
      price: 25,
    },
    {
      id: 3,
      customer: "Emma Davis",
      service: "Facial Treatment",
      staff: "Emma Wilson",
      date: "2025-06-12",
      time: "4:00 PM",
      status: "pending",
      price: 75,
    },
    {
      id: 4,
      customer: "Jessica Brown",
      service: "Manicure",
      staff: "Sofia Rodriguez",
      date: "2025-06-13",
      time: "10:00 AM",
      status: "confirmed",
      price: 35,
    },
  ],
  upcomingAppointments: [
    {
      id: 1,
      customer: "Alice Cooper",
      service: "Highlights",
      time: "9:00 AM",
      staff: "Ayesha Khan",
    },
    {
      id: 2,
      customer: "Bob Wilson",
      service: "Beard Trim",
      time: "10:30 AM",
      staff: "Marcus Johnson",
    },
    {
      id: 3,
      customer: "Carol Smith",
      service: "Pedicure",
      time: "2:00 PM",
      staff: "Sofia Rodriguez",
    },
  ],
  recentReviews: [
    {
      id: 1,
      customer: "Sarah Johnson",
      rating: 5,
      comment: "Amazing service! Ayesha did an incredible job.",
      service: "Hair Color",
      date: "2025-06-10",
    },
    {
      id: 2,
      customer: "Michael Chen",
      rating: 5,
      comment: "Best haircut I've had in years!",
      service: "Men's Haircut",
      date: "2025-06-08",
    },
  ],
}

const sidebarItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: Settings,
  },
  {
    title: "Staff",
    url: "/dashboard/staff",
    icon: Users,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BB</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            BookBeauty
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Business Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>GG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Glow & Go Salon</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function BusinessDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalBookings}</div>
                <p className="text-xs opacity-90">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData.stats.monthlyRevenue}</div>
                <p className="text-xs opacity-90">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Average Rating</CardTitle>
                <Star className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.averageRating}</div>
                <p className="text-xs opacity-90">Based on 132 reviews</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Customers</CardTitle>
                <Users className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalCustomers}</div>
                <p className="text-xs opacity-90">+5 new this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Appointments */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-purple-600" />
                    <span>Today's Appointments</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">{appointment.time}</div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.customer}</h4>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                          <p className="text-xs text-purple-600">with {appointment.staff}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700">
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Today's Revenue</span>
                    <span className="font-medium">$420</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">65% of daily goal</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bookings Today</span>
                    <span className="font-medium">8/12</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">4 slots remaining</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Based on recent reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Recent Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentBookings.slice(0, 4).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.customer}</h4>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-xs text-gray-500">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        <p className="text-sm font-medium text-gray-900 mt-1">${booking.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <span>Recent Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{review.customer}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">"{review.comment}"</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{review.service}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
