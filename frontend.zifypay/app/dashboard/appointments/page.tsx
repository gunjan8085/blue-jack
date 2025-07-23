"use client"
import { useState, useEffect } from "react"
import { CalendarIcon, Clock, User, Search, Plus, Edit, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppSidebar from "@/components/for-bussiness/AppSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { API_URL } from "@/lib/const"
import { format, parseISO } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import CalendarComponent from "./Calender"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types for API response
interface Customer {
  name: string
  email: string
  phone: string
  notes?: string
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

interface Staff {
  _id: string
  name: string
  email: string
  isOwner: boolean
  phoneNumber: string
  country: string
  jobTitle: string
  profilePicUrl?: string
}

interface Appointment {
  _id: string
  business: string
  service: Service | null
  staff: Staff
  customer: Customer
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "blocked"
  reason?: string
  duration?: number
  startTime?: string
  endTime?: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  data: Appointment[]
}

interface TimeSlot {
  start: Date
  end: Date
  staffId: string
}

interface CalendarResource {
  resourceId: string
  resourceTitle: string
}

interface Props {
  start: Date
  end: Date
  resourceId?: string
}

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId: string
  status: "confirmed" | "pending" | "completed" | "cancelled" | "blocked"
  service?: Service
  customer: Customer
  staff: Staff
  reason?: string
}

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [staffMembers, setStaffMembers] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isBlockingTime, setIsBlockingTime] = useState(false)
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isListViewOpen, setIsListViewOpen] = useState(false)
  const [blockConflictMessage, setBlockConflictMessage] = useState<string | null>(null)

  const [newAppointment, setNewAppointment] = useState({
    customer: { name: "", email: "", phone: "", notes: "" },
    service: "",
    staff: "",
    date: "",
    time: "",
  })

  const [blockDetails, setBlockDetails] = useState({
    reason: "",
    staff: "",
    date: "",
    time: "",
    duration: 60,
  })

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const businessProfile = localStorage.getItem("businessProfile")
      if (!businessProfile) throw new Error("Business profile not found")
      const business = JSON.parse(businessProfile)
      const businessId = business._id
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Authentication token not found")

      const [appointmentsRes, servicesRes, staffRes] = await Promise.all([
        fetch(`${API_URL}/appointments/${businessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/service-categories/${businessId}/service-categories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/employee/business/${businessId}/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (!appointmentsRes.ok || !servicesRes.ok || !staffRes.ok) {
        throw new Error("Failed to fetch data")
      }

      const [appointmentsData, servicesData, staffData] = await Promise.all([
        appointmentsRes.json(),
        servicesRes.json(),
        staffRes.json(),
      ])

      setAppointments(appointmentsData.data)
      setServices(servicesData.data)
      staffData.data = staffData.data.filter((staff: Staff) => !staff.isOwner)
      setStaffMembers(staffData.data)
    } catch (err: any) {
      console.error("Error fetching data:", err)
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to load data: " + err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
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
      case "blocked":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    // Add null checks to prevent undefined errors
    const customerName = appointment?.customer?.name || ""
    const serviceName = appointment?.service?.title || "Service"
    const staffName = appointment?.staff?.name || ""

    const matchesSearch =
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = dateFilter === "all" || appointment.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      setIsUpdatingStatus(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Auth token not found")

      const res = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) throw new Error("Failed to update status")

      // Refresh data to get latest status
      await fetchData()
      toast({
        title: "Success",
        description: `Appointment status changed to ${newStatus}`,
        duration: 3000,
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update status: " + err.message,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  // Helper function to format time for API
  const formatTimeForAPI = (timeString: string) => {
    if (!timeString) return ""
    // Ensure the time is in HH:mm format
    const timeParts = timeString.split(":")
    if (timeParts.length !== 2) return timeString
    const hours = timeParts[0].padStart(2, "0")
    const minutes = timeParts[1].padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Helper function to calculate end time
  const calculateEndTime = (startTime: string, durationMinutes: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0, 0)
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000)
    return `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`
  }

  // Check if a time slot is blocked
  const isTimeSlotBlocked = (staffId: string, date: string, startTime: string, endTime: string): boolean => {
    return events.some((event) => {
      if (event.status !== "blocked" || event.resourceId !== staffId) return false

      const eventDate = new Date(event.start).toDateString()
      const selectedDate = new Date(`${date}T${startTime}`).toDateString()

      if (eventDate !== selectedDate) return false

      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const selectedStart = new Date(`${date}T${startTime}`)
      const selectedEnd = new Date(`${date}T${endTime}`)

      return selectedStart < eventEnd && selectedEnd > eventStart
    })
  }

  // Updated handleCreateAppointment function with block conflict handling
  const handleCreateAppointment = async () => {
    console.log("🚀 handleCreateAppointment function called")
    console.log("📋 Current form data:", newAppointment)

    // Clear any previous block conflict messages
    setBlockConflictMessage(null)

    try {
      setIsCreatingAppointment(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Auth token not found")

      const businessProfile = localStorage.getItem("businessProfile")
      if (!businessProfile) throw new Error("Business profile not found")
      const business = JSON.parse(businessProfile)

      // Format and validate time
      const formattedTime = formatTimeForAPI(newAppointment.time)
      const formattedDate = newAppointment.date.trim()

      // Validate time format
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
      if (!timeRegex.test(formattedTime)) {
        toast({
          title: "Error",
          description: "Please select a valid time",
          variant: "destructive",
        })
        return
      }

      // Validate required fields
      const requiredFields = {
        name: newAppointment.customer.name?.trim(),
        phone: newAppointment.customer.phone?.trim(),
        service: newAppointment.service,
        staff: newAppointment.staff,
        date: formattedDate,
        time: formattedTime,
      }

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key)

      if (missingFields.length > 0) {
        toast({
          title: "Error",
          description: `Please fill in: ${missingFields.join(", ")}`,
          variant: "destructive",
        })
        return
      }

      // Get service duration for end time calculation
      const selectedService = services.find((s) => s._id === newAppointment.service)
      const serviceDuration = selectedService?.duration || 60
      const endTime = calculateEndTime(formattedTime, serviceDuration)

      // Check if the selected time slot is blocked
      if (isTimeSlotBlocked(newAppointment.staff, formattedDate, formattedTime, endTime)) {
        setBlockConflictMessage("This time slot is blocked. No appointments can be booked.")
        toast({
          title: "Time Slot Blocked",
          description: "This time is blocked. No appointments can be booked.",
          variant: "destructive",
          duration: 5000,
        })
        return
      }

      const payload = {
        customer: {
          name: newAppointment.customer.name.trim(),
          email: newAppointment.customer.email.trim(),
          phone: newAppointment.customer.phone.trim(),
          notes: newAppointment.customer.notes?.trim() || "",
        },
        service: newAppointment.service,
        staff: newAppointment.staff,
        date: formattedDate,
        time: formattedTime,
      }

      const res = await fetch(`${API_URL}/appointments/${business._id}/create-by-business`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      // Handle block conflict (409 status)
      if (res.status === 409) {
        const errorMessage = data.message || "This time slot is blocked. No appointments can be booked."
        setBlockConflictMessage(errorMessage)
        toast({
          title: "Time Slot Blocked",
          description: "This time is blocked. No appointments can be booked.",
          variant: "destructive",
          duration: 5000,
        })
        return
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to create appointment")
      }

      // Close the dialog first
      setIsCreateDialogOpen(false)

      // Reset form
      setNewAppointment({
        customer: { name: "", email: "", phone: "", notes: "" },
        service: "",
        staff: "",
        date: "",
        time: "",
      })

      // Refresh all data to get the latest appointments
      await fetchData()

      // Show success message after data is refreshed
      toast({
        title: "Success! 🎉",
        description: "Appointment created successfully",
        duration: 3000,
      })
    } catch (err: any) {
      console.error("💥 Error creating appointment:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to create appointment. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsCreatingAppointment(false)
    }
  }

  // Updated handleBlockTime function with correct API endpoint
  const handleBlockTime = async () => {
    try {
      setIsBlockingTime(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Auth token not found")

      const businessProfile = localStorage.getItem("businessProfile")
      if (!businessProfile) throw new Error("Business profile not found")
      const business = JSON.parse(businessProfile)

      // Validate required fields
      if (!blockDetails.staff || !blockDetails.date || !blockDetails.time) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // Format times
      const startTime = formatTimeForAPI(blockDetails.time)
      const endTime = calculateEndTime(startTime, blockDetails.duration)

      // Check if time slot is already blocked
      if (isTimeSlotBlocked(blockDetails.staff, blockDetails.date, startTime, endTime)) {
        toast({
          title: "Error",
          description: "Time slot is already blocked",
          variant: "destructive",
          duration: 5000,
        })
        return
      }

      const payload = {
        staffId: blockDetails.staff,
        date: blockDetails.date,
        startTime: startTime,
        endTime: endTime,
        reason: blockDetails.reason || "Time blocked by admin",
      }

      console.log("🔒 Blocking time with payload:", payload)

      // Updated API endpoint to match your specification
      const res = await fetch(`${API_URL}/appointments/${business._id}/staff/${blockDetails.staff}/block`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        // Handle specific error cases
        if (res.status === 409) {
          toast({
            title: "Error",
            description: "Time slot is already blocked",
            variant: "destructive",
            duration: 5000,
          })
          return
        }
        throw new Error(data.message || "Failed to block time")
      }

      // Success response handling
      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Time blocked successfully",
          duration: 3000,
        })

        setIsBlockDialogOpen(false)
        setBlockDetails({
          reason: "",
          staff: "",
          date: "",
          time: "",
          duration: 60,
        })

        // Refresh data to show blocked time
        await fetchData()
      } else {
        throw new Error(data.message || "Failed to block time")
      }
    } catch (err: any) {
      console.error("💥 Error blocking time:", err)
      toast({
        title: "Error",
        description: "Failed to block time: " + err.message,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsBlockingTime(false)
    }
  }

  // Updated events mapping to handle blocked slots properly
  const events = appointments
    .filter((apt) => apt?.customer || apt?.status === "blocked") // Allow blocked events without customers
    .map((apt) => {
      // For blocked appointments, use startTime and endTime if available
      let startDate: Date
      let endDate: Date

      if (apt.status === "blocked" && apt.startTime && apt.endTime) {
        // Parse the date and time correctly for blocked appointments
        startDate = new Date(`${apt.date}T${apt.startTime}:00`)
        endDate = new Date(`${apt.date}T${apt.endTime}:00`)
      } else {
        // For regular appointments
        startDate = new Date(`${apt.date}T${apt.time}:00`)
        endDate = new Date(startDate.getTime() + (apt.service?.duration || apt.duration || 30) * 60000)
      }

      // Validate dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn("Invalid date for appointment:", apt)
        // Fallback to current time if dates are invalid
        startDate = new Date()
        endDate = new Date(startDate.getTime() + 30 * 60000)
      }

      return {
        ...apt, // Move spread operator first
        id: apt._id,
        title:
          apt.status === "blocked"
            ? "🔒 BLOCKED"
            : `${apt.customer?.name || "Unknown"} - ${apt.service?.title || "Service"}`,
        start: startDate,
        end: endDate,
        resourceId: apt.staff._id,
        status: apt.status,
        reason: apt.reason,
      }
    })

  const resources = staffMembers
    .filter((staff) => staff?.jobTitle !== "Owner" && staff?._id && staff?.name)
    .map((staff) => ({
      resourceId: staff._id,
      resourceTitle: staff.name,
      resourceImage: staff.profilePicUrl || "",
    }))

  const handleSelectSlot = (slotInfo: { start: Date; end: Date; resourceId?: string }) => {
    // Check if the selected slot is blocked
    if (slotInfo.resourceId) {
      const slotDate = slotInfo.start.toISOString().split("T")[0]
      const slotStartTime = slotInfo.start.toTimeString().slice(0, 5)
      const slotEndTime = slotInfo.end.toTimeString().slice(0, 5)

      if (isTimeSlotBlocked(slotInfo.resourceId, slotDate, slotStartTime, slotEndTime)) {
        toast({
          title: "Time Slot Blocked",
          description: "This time slot is blocked and unavailable for booking.",
          variant: "destructive",
          duration: 3000,
        })
        return
      }
    }

    setSelectedTimeSlot({
      start: slotInfo.start,
      end: slotInfo.end,
      staffId: slotInfo.resourceId || staffMembers[0]?._id || "",
    })
  }

  const handleSelectEvent = (event: any) => {
    setSelectedAppointment(event)
    setIsEditDialogOpen(true)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
              <p className="text-sm text-gray-600">Manage your bookings and schedule</p>
            </div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {isListViewOpen && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
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
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      {Array.from(new Set(appointments.map((apt) => apt.date))).map((date) => (
                        <SelectItem key={date} value={date}>
                          {format(parseISO(date), "MMM dd, yyyy")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsBlockDialogOpen(true)}
                    className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Block Time
                  </Button>
                </div>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="h-[600px]">
                    <CalendarComponent
                      events={events}
                      resources={resources}
                      onSelectEvent={handleSelectEvent}
                      onSelectSlot={handleSelectSlot}
                      loading={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
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
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        {Array.from(new Set(appointments.map((apt) => apt.date))).map((date) => (
                          <SelectItem key={date} value={date}>
                            {format(parseISO(date), "MMM dd, yyyy")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment._id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback
                              className={
                                appointment.status === "blocked"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-purple-100 text-purple-600"
                              }
                            >
                              {appointment.status === "blocked" ? (
                                <Lock className="h-6 w-6" />
                              ) : (
                                appointment.customer?.name?.charAt(0) || "U"
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.status === "blocked"
                                ? "🔒 Blocked Time"
                                : appointment.customer?.name || "Unknown Customer"}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {format(parseISO(appointment.date), "MMM dd, yyyy")}
                              <Clock className="h-4 w-4 ml-3 mr-1" />
                              {appointment.status === "blocked" && appointment.startTime && appointment.endTime
                                ? `${appointment.startTime} - ${appointment.endTime}`
                                : appointment.time}
                            </div>
                            {appointment.status === "blocked" ? (
                              <p className="text-sm text-gray-600 mt-1">
                                Reason: {appointment.reason || "Time blocked by admin"}
                              </p>
                            ) : (
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <User className="h-4 w-4 mr-1" />
                                {appointment.staff?.name}
                                <span className="mx-2">•</span>
                                {appointment.service?.title || "Service"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={cn("border", getStatusColor(appointment.status))}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Appointment Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {blockConflictMessage && (
                <Alert className="border-red-200 bg-red-50">
                  <Lock className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{blockConflictMessage}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer-name">Customer Name *</Label>
                  <Input
                    id="customer-name"
                    value={newAppointment.customer.name}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        customer: { ...newAppointment.customer, name: e.target.value },
                      })
                    }
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customer-phone">Phone Number *</Label>
                  <Input
                    id="customer-phone"
                    value={newAppointment.customer.phone}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        customer: { ...newAppointment.customer, phone: e.target.value },
                      })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={newAppointment.customer.email}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      customer: { ...newAppointment.customer, email: e.target.value },
                    })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="service">Service *</Label>
                  <Select
                    value={newAppointment.service}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.title} - ${service.price} ({service.duration}min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="staff">Staff Member *</Label>
                  <Select
                    value={newAppointment.staff}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, staff: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff._id} value={staff._id}>
                          {staff.name} - {staff.jobTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.customer.notes}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      customer: { ...newAppointment.customer, notes: e.target.value },
                    })
                  }
                  placeholder="Additional notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAppointment} disabled={isCreatingAppointment}>
                {isCreatingAppointment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Appointment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Block Time Dialog */}
        <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-600" />
                Block Time Slot
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="block-reason">Reason</Label>
                <Input
                  id="block-reason"
                  value={blockDetails.reason}
                  onChange={(e) => setBlockDetails({ ...blockDetails, reason: e.target.value })}
                  placeholder="Reason for blocking (optional)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="block-staff">Staff Member *</Label>
                <Select
                  value={blockDetails.staff}
                  onValueChange={(value) => setBlockDetails({ ...blockDetails, staff: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff._id} value={staff._id}>
                        {staff.name} - {staff.jobTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="block-date">Date *</Label>
                  <Input
                    id="block-date"
                    type="date"
                    value={blockDetails.date}
                    onChange={(e) => setBlockDetails({ ...blockDetails, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="block-time">Start Time *</Label>
                  <Input
                    id="block-time"
                    type="time"
                    value={blockDetails.time}
                    onChange={(e) => setBlockDetails({ ...blockDetails, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="block-duration">Duration (minutes) *</Label>
                <Select
                  value={blockDetails.duration.toString()}
                  onValueChange={(value) => setBlockDetails({ ...blockDetails, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {blockDetails.staff && blockDetails.date && blockDetails.time && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Preview:</strong> This will block{" "}
                    {staffMembers.find((s) => s._id === blockDetails.staff)?.name}'s schedule from {blockDetails.time}{" "}
                    to {calculateEndTime(blockDetails.time, blockDetails.duration)} on{" "}
                    {format(parseISO(blockDetails.date), "MMM dd, yyyy")}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBlockTime} disabled={isBlockingTime} className="bg-gray-600 hover:bg-gray-700">
                {isBlockingTime ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Blocking...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Block Time
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Appointment Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedAppointment?.status === "blocked" ? "🔒 Blocked Time Details" : "Appointment Details"}
              </DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="grid gap-4 py-4">
                {selectedAppointment.status === "blocked" ? (
                  <>
                    <div className="grid gap-2">
                      <Label>Reason</Label>
                      <p className="text-sm text-gray-600 p-2 bg-gray-50 border border-gray-200 rounded">
                        {selectedAppointment.reason || "Time blocked by admin"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Staff Member</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.staff?.name}</p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Duration</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.duration || 60} minutes</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <p className="text-sm text-gray-600">
                          {format(parseISO(selectedAppointment.date), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Time</Label>
                        <p className="text-sm text-gray-600">
                          {selectedAppointment.startTime && selectedAppointment.endTime
                            ? `${selectedAppointment.startTime} - ${selectedAppointment.endTime}`
                            : selectedAppointment.time}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Customer</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.customer?.name}</p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Phone</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.customer?.phone}</p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <p className="text-sm text-gray-600">{selectedAppointment.customer?.email || "Not provided"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Service</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.service?.title}</p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Staff</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.staff?.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <p className="text-sm text-gray-600">
                          {format(parseISO(selectedAppointment.date), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Time</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.time}</p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <Select
                        value={selectedAppointment.status}
                        onValueChange={(value) => handleStatusChange(selectedAppointment._id, value)}
                        disabled={isUpdatingStatus}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedAppointment.customer?.notes && (
                      <div className="grid gap-2">
                        <Label>Notes</Label>
                        <p className="text-sm text-gray-600">{selectedAppointment.customer.notes}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
