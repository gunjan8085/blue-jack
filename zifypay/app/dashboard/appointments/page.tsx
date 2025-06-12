"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail, Search, Plus, Edit, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Mock appointments data
const appointmentsData = [
  {
    id: 1,
    customer: {
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "(555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Hair Color",
    staff: "Ayesha Khan",
    date: "2025-06-12",
    time: "2:30 PM",
    duration: "2 hours",
    status: "confirmed",
    price: 85,
    notes: "First time client, wants natural blonde highlights",
  },
  {
    id: 2,
    customer: {
      name: "Michael Chen",
      email: "michael@email.com",
      phone: "(555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Men's Haircut",
    staff: "Marcus Johnson",
    date: "2025-06-12",
    time: "3:00 PM",
    duration: "30 mins",
    status: "confirmed",
    price: 25,
    notes: "Regular client, usual style",
  },
  {
    id: 3,
    customer: {
      name: "Emma Davis",
      email: "emma@email.com",
      phone: "(555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Facial Treatment",
    staff: "Emma Wilson",
    date: "2025-06-12",
    time: "4:00 PM",
    duration: "75 mins",
    status: "pending",
    price: 75,
    notes: "Sensitive skin, avoid harsh products",
  },
  {
    id: 4,
    customer: {
      name: "Jessica Brown",
      email: "jessica@email.com",
      phone: "(555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Manicure",
    staff: "Sofia Rodriguez",
    date: "2025-06-13",
    time: "10:00 AM",
    duration: "45 mins",
    status: "confirmed",
    price: 35,
    notes: "Gel polish, French tips",
  },
  {
    id: 5,
    customer: {
      name: "David Wilson",
      email: "david@email.com",
      phone: "(555) 567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Deep Tissue Massage",
    staff: "Emma Wilson",
    date: "2025-06-13",
    time: "2:00 PM",
    duration: "60 mins",
    status: "completed",
    price: 80,
    notes: "Focus on back and shoulders",
  },
]

const sidebarItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Calendar,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: Calendar,
  },
  {
    title: "Staff",
    url: "/dashboard/staff",
    icon: User,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: User,
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
                  <SidebarMenuButton asChild isActive={item.title === "Appointments"}>
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

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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

  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearch =
      appointment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.staff.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    // Handle status change logic here
    console.log(`Changing appointment ${appointmentId} status to ${newStatus}`)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600">Manage your bookings and schedule</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Filters and Search */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search appointments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="2025-06-12">Today</SelectItem>
                    <SelectItem value="2025-06-13">Tomorrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Tabs */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {appointment.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.customer.name}</h3>
                          <p className="text-purple-600 font-medium">{appointment.service}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {appointment.staff}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time} ({appointment.duration})
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">${appointment.price}</div>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>

                        <div className="flex space-x-2">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(appointment.id, "confirmed")}
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </>
                          )}

                          {appointment.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(appointment.id, "completed")}
                              className="bg-gradient-to-r from-purple-600 to-purple-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                          )}

                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Appointment</DialogTitle>
                              </DialogHeader>
                              {selectedAppointment && (
                                <div className="space-y-4">
                                  <div>
                                    <Label>Customer</Label>
                                    <Input value={selectedAppointment.customer.name} readOnly />
                                  </div>
                                  <div>
                                    <Label>Service</Label>
                                    <Select defaultValue={selectedAppointment.service}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Hair Color">Hair Color</SelectItem>
                                        <SelectItem value="Men's Haircut">Men's Haircut</SelectItem>
                                        <SelectItem value="Facial Treatment">Facial Treatment</SelectItem>
                                        <SelectItem value="Manicure">Manicure</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Date</Label>
                                    <Input type="date" defaultValue={selectedAppointment.date} />
                                  </div>
                                  <div>
                                    <Label>Time</Label>
                                    <Input type="time" defaultValue="14:30" />
                                  </div>
                                  <div>
                                    <Label>Notes</Label>
                                    <Textarea defaultValue={selectedAppointment.notes} rows={3} />
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" className="flex-1">
                                      Cancel
                                    </Button>
                                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700">
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {appointment.customer.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {appointment.customer.email}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar View</h3>
                    <p className="text-gray-600">Calendar integration would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {filteredAppointments.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
