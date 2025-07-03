"use client"

import { useState, useEffect } from "react"
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
import { API_URL } from "@/lib/const"
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar"
import { format } from "date-fns/format"
import { parse } from "date-fns/parse"
import { startOfWeek } from "date-fns/startOfWeek"
import { getDay } from "date-fns/getDay"
import { enUS } from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import {

  Users,
  DollarSign,
  Star,
  TrendingUp,
  Settings,
  BarChart3,
  CalendarDays,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
// Types for API response
interface Customer {
  name: string
  email: string
  phone: string
  notes?: string
}

interface Staff {
  _id: string
  name: string
}

interface Appointment {
  _id: string
  business: string
  service: {
    _id: string
    title: string
  } | null
  staff: Staff
  customer: Customer
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  data: Appointment[]
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

]


function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">

          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            <img src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png" alt="" />
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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const locales = { "en-US": enUS }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get business ID from localStorage
        const businessProfile = localStorage.getItem('businessProfile')
        if (!businessProfile) {
          throw new Error('Business profile not found')
        }

        const business = JSON.parse(businessProfile)
        const businessId = business._id

        // Get auth token
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Authentication token not found')
        }

        const response = await fetch(`${API_URL}/appointments/${businessId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status}`)
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setAppointments(data.data)
        } else {
          throw new Error('Failed to fetch appointments')
        }
      } catch (err: any) {
        console.error('Error fetching appointments:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

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

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (appointment.service?.title || 'Service').toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })  

const handleStatusChange = async (appointmentId: string, newStatus: string) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Auth token not found")

    const res = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Failed to update status")
    toast({ title: "Status updated", description: `Status changed to ${newStatus}` })
    setAppointments((prev: Appointment[]) =>
      prev.map((apt) =>
        apt._id === appointmentId
          ? { ...apt, status: newStatus as Appointment["status"] }
          : apt
      )
    )
    
  } catch (err: any) {
    console.error("Error updating appointment status:", err.message)
    alert("Failed to update status: " + err.message)
  }
}


  // Transform appointments and staff for Big Calendar
  const events = appointments.map((apt) => ({
    id: apt._id,
    title: `${apt.customer.name} - ${apt.service?.title ?? "Service"}`,
    start: new Date(`${apt.date}T${apt.time}`),
    end: new Date(`${apt.date}T${apt.time}`), // You may want to add duration
    resourceId: apt.staff._id,
    ...apt,
  }))

  const resources = Array.from(
    new Map(appointments.map((apt) => [apt.staff._id, apt.staff])).values()
  ).map((staff) => ({
    resourceId: staff._id,
    resourceTitle: staff.name,
  }))

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <XCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading appointments</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-purple-600 to-purple-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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
            {/* <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button> */}
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
                    {Array.from(new Set(appointments.map(apt => apt.date))).map(date => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString()}
                      </SelectItem>
                    ))}
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
                <Card key={appointment._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {appointment.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.customer.name}</h3>
                          <p className="text-purple-600 font-medium">{appointment.service?.title || 'Service'}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {appointment.staff.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>

                        <div className="flex space-x-2">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(appointment._id, "confirmed")}
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(appointment._id, "cancelled")}
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
                              onClick={() => handleStatusChange(appointment._id, "completed")}
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
                                    <Input value={selectedAppointment.service?.title || 'Service'} readOnly />
                                  </div>
                                  <div>
                                    <Label>Date</Label>
                                    <Input type="date" defaultValue={selectedAppointment.date} />
                                  </div>
                                  <div>
                                    <Label>Time</Label>
                                    <Input type="time" defaultValue={selectedAppointment.time} />
                                  </div>
                                  <div>
                                    <Label>Notes</Label>
                                    <Textarea defaultValue={selectedAppointment.customer.notes || ''} rows={3} />
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

                    {appointment.customer.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {appointment.customer.notes}
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
              <div style={{ height: 600 }}>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  resources={resources}
                  resourceIdAccessor="resourceId"
                  resourceTitleAccessor="resourceTitle"
                  defaultView="day"
                  views={["day", "week", "work_week", "agenda"]}
                  style={{ height: "100%" }}
                  onSelectEvent={(event: any) => {
                    setSelectedAppointment(event)
                    setIsEditDialogOpen(true)
                  }}
                  onSelectSlot={({ start, end, resourceId }: { start: Date; end: Date; resourceId: string }) => {
                    // Placeholder: open dialog to create new appointment for this employee and time
                    // You can implement a dialog for adding new appointments here
                    alert(`Add new appointment for employee ${resources.find(r => r.resourceId === resourceId)?.resourceTitle || ""} at ${start}`)
                  }}
                  selectable
                />
              </div>
            </TabsContent>
          </Tabs>

          {filteredAppointments.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                {/* <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Appointment
                </Button> */}
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
