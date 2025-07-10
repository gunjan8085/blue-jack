"use client"

import { useState, useEffect } from "react"
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Search, Plus, Edit, CheckCircle, XCircle, ChevronDown, ChevronUp, Lock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppSidebar from "@/components/for-bussiness/AppSidebar"

import {

  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { API_URL } from "@/lib/const"
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parseISO } from "date-fns"
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
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

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
}

interface Appointment {
  _id: string
  business: string
  service: Service | null
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
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'blocked'
  service?: Service
  customer: Customer
  staff: Staff
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
  const [error, setError] = useState<string | null>(null)
  const [isListViewOpen, setIsListViewOpen] = useState(false)

  const [newAppointment, setNewAppointment] = useState({
    customer: { name: "", email: "", phone: "", notes: "" },
    service: "",
    staff: "",
    date: "",
    time: ""
  })

  const [blockDetails, setBlockDetails] = useState({
    reason: "",
    staff: "",
    date: "",
    time: "",
    duration: 60
  })

  const locales = { "en-US": enUS }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const businessProfile = localStorage.getItem('businessProfile')
        if (!businessProfile) throw new Error('Business profile not found')

        const business = JSON.parse(businessProfile)
        const businessId = business._id
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Authentication token not found')

        const [appointmentsRes, servicesRes, staffRes] = await Promise.all([
          fetch(`${API_URL}/appointments/${businessId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/service-categories/${businessId}/service-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/employee/business/${businessId}/all`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        if (!appointmentsRes.ok || !servicesRes.ok || !staffRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [appointmentsData, servicesData, staffData] = await Promise.all([
          appointmentsRes.json(),
          servicesRes.json(),
          staffRes.json()
        ])

        setAppointments(appointmentsData.data)
        setServices(servicesData.data)
        setStaffMembers(staffData.data)
      } catch (err: any) {
        console.error('Error fetching data:', err)
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

    fetchData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (appointment.service?.title || 'Service').toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.staff.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!res.ok) throw new Error("Failed to update status")

      toast({
        title: "Status updated",
        description: `Appointment status changed to ${newStatus}`,
      })

      setAppointments(prev => prev.map(apt =>
        apt._id === appointmentId ? { ...apt, status: newStatus as Appointment["status"] } : apt
      ))
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update status: " + err.message,
        variant: "destructive",
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleCreateAppointment = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Auth token not found")

      const businessProfile = localStorage.getItem('businessProfile')
      if (!businessProfile) throw new Error('Business profile not found')

      const business = JSON.parse(businessProfile)
      // if(newAppointment.date== format(new Date(), 'yyyy-MM-dd') && newAppointment.time < format(new Date(), 'HH:mm')) {
      //   toast({
      //     title: "Error",
      //     description: "Cannot create appointment in the past",
      //     variant: "destructive",
      //   })
      //   return
      // }
      const payload = {
        customer: newAppointment.customer,
        service: newAppointment.service,
        staff: newAppointment.staff,
        date: newAppointment.date,
        time: newAppointment.time,
      }

      const res = await fetch(`${API_URL}/appointments/${business._id}/create-by-business`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        toast({
          title: "Error",
          description: "Failed to create appointment",
          variant: "destructive",
        })
        throw new Error("Failed to create appointment")
      }
      const data = await res.json()
      toast({ title: "Success", description: "Appointment created successfully" })

      setAppointments(prev => [...prev, data.data])
      setIsCreateDialogOpen(false)
      setNewAppointment({
        customer: { name: "", email: "", phone: "", notes: "" },
        service: "",
        staff: "",
        date: "",
        time: ""
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to create appointment: " + err.message,
        variant: "destructive",
      })
    }
  }

  const handleBlockTime = async () => {
    try {
      setIsBlockingTime(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Auth token not found")

      const businessProfile = localStorage.getItem('businessProfile')
      if (!businessProfile) throw new Error('Business profile not found')

      const business = JSON.parse(businessProfile)
      const payload = {
        ...blockDetails,
        status: "blocked",
        notes: blockDetails.reason
      }

      const res = await fetch(`${API_URL}/appointments/${business._id}/block`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error("Failed to block time")

      toast({ title: "Success", description: "Time blocked successfully" })
      setIsBlockDialogOpen(false)
      setBlockDetails({
        reason: "",
        staff: "",
        date: "",
        time: "",
        duration: 60
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to block time: " + err.message,
        variant: "destructive",
      })
    } finally {
      setIsBlockingTime(false)
    }
  }

  const events = appointments.map((apt) => ({
    id: apt._id,
    title: `${apt.customer.name} - ${apt.service?.title || "Service"}`,
    start: new Date(`${apt.date}T${apt.time}`),
    end: new Date(new Date(`${apt.date}T${apt.time}`).getTime() + (apt.service?.duration || 30) * 60000),
    resourceId: apt.staff._id,
    ...apt,
  }))

  const resources = staffMembers.map((staff) => ({
    resourceId: staff._id,
    resourceTitle: staff.name,
  }))

  const handleSelectSlot = (slotInfo: { start: Date; end: Date; resourceId?: string }) => {
    setSelectedTimeSlot({
      start: slotInfo.start,
      end: slotInfo.end,
      staffId: slotInfo.resourceId || staffMembers[0]?._id || ""
    })
  }

  const handleSelectEvent = (event: any) => {
    setSelectedAppointment(event)
    setIsEditDialogOpen(true)
  }

  const eventStyleGetter = (event: { status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'blocked' }) => {
    const statusColors = {
      confirmed: '#38a169',
      pending: '#d69e2e',
      completed: '#3182ce',
      cancelled: '#e53e3e',
      blocked: '#718096'
    }

    return {
      style: {
        backgroundColor: statusColors[event.status] || '#805ad5',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
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
          {isListViewOpen &&
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
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      {Array.from(new Set(appointments.map(apt => apt.date))).map(date => (
                        <SelectItem key={date} value={date}>
                          {format(parseISO(date), 'MMM dd, yyyy')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          }

          {/* Appointments Tabs */}
          <Tabs defaultValue="calendar" className="w-[84vw] overflow-scroll">
            <TabsList className="grid w-full grid-cols-2 max-w-xs bg-white">
              <TabsTrigger value="list" onClick={() => setIsListViewOpen(true)}>List View</TabsTrigger>
              <TabsTrigger value="calendar" onClick={() => setIsListViewOpen(false)}>Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                </div>
              ) : filteredAppointments.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-purple-700"
                      onClick={() => setIsCreateDialogOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Appointment
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment._id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {appointment.customer.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">{appointment.customer.name}</h3>
                            <p className="text-purple-600 font-medium text-sm">{appointment.service?.title || 'Service'}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {appointment.staff.name}
                              </span>
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {format(parseISO(appointment.date), 'MMM dd, yyyy')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <Badge className={cn("text-xs", getStatusColor(appointment.status))}>
                            {appointment.status}
                          </Badge>

                          <div className="flex gap-2">
                            {appointment.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(appointment._id, "confirmed")}
                                  className="text-green-600 border-green-200 hover:bg-green-50 h-8"
                                >
                                  {isUpdatingStatus ? (
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  ) : (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  )}
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(appointment._id, "cancelled")}
                                  className="text-red-600 border-red-200 hover:bg-red-50 h-8"
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}

                            {appointment.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(appointment._id, "completed")}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 h-8"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Complete
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>

                      {appointment.customer.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                          <strong>Notes:</strong> {appointment.customer.notes}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {appointment.customer.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {appointment.customer.email}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>


            <TabsContent value="calendar" className="space-y-4 ">
              <Card className="border border-gray-100 shadow-sm rounded-lg overflow-hidden">
                <CardContent className="p-0">
                  <div style={{ height: 700 }} className="relative">
                    <BigCalendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      resources={resources}
                      resourceIdAccessor="resourceId"
                      resourceTitleAccessor="resourceTitle"
                      defaultView="day"
                      views={["day", "week", "work_week", "month", "agenda"]}
                      style={{ height: "100%" }}
                      onSelectEvent={handleSelectEvent}
                      onSelectSlot={handleSelectSlot}
                      selectable
                      eventPropGetter={eventStyleGetter}
                      step={30}
                      timeslots={2}
                      min={new Date(0, 0, 0, 8, 0, 0)}
                      max={new Date(0, 0, 0, 23, 0, 0)}
                      resourceHeader={(resource: CalendarResource) => (
                        <div className="flex items-center justify-center h-[150px] bg-gray-50 border-r border-gray-100 last:border-r-0">
                          <span className="text-sm font-medium text-gray-600">{resource.resourceTitle}</span>
                        </div>
                      )}
                      components={{
                        timeSlotWrapper: (props: { children?: React.ReactNode }) => (
                          <div
                            {...props}
                            className="hover:bg-purple-50 hover:bg-opacity-70 cursor-pointer transition-all duration-150 ease-out border-b border-gray-100"
                          />
                        ),
                        eventWrapper: ({ event, children }: { event: CalendarEvent; children: React.ReactNode }) => (
                          <div className="hover:shadow-md hover:border hover:border-purple-200 transition-all duration-200 ease-out">
                            {children}
                          </div>
                        ),
                        dayHeader: ({ label }: { label: string }) => (
                          <div className="text-center py-3 bg-white hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-700">{label}</span>
                          </div>
                        ),
                        toolbar: (toolbarProps: {
                          onNavigate: (action: 'PREV' | 'TODAY' | 'NEXT') => void;
                          label: string;
                          views: string[];
                          view: string;
                          onView: (view: string) => void;
                        }) => (
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border-b border-gray-100">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <button
                                onClick={() => toolbarProps.onNavigate('PREV')}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <ChevronLeft className="h-4 w-4 text-gray-500" />
                              </button>
                              <button
                                onClick={() => toolbarProps.onNavigate('TODAY')}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors mx-1"
                              >
                                Today
                              </button>
                              <button
                                onClick={() => toolbarProps.onNavigate('NEXT')}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              </button>
                              <span className="ml-4 text-md font-medium text-gray-800">
                                {toolbarProps.label}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {toolbarProps.views.map((view: string) => (
                                <button
                                  key={view}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${toolbarProps.view === view
                                      ? 'bg-purple-100 text-purple-700'
                                      : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                  onClick={() => toolbarProps.onView(view)}
                                >
                                  {view.charAt(0).toUpperCase() + view.slice(1).replace('_', ' ')}
                                </button>
                              ))}
                            </div>
                          </div>
                        ),
                        timeGutterHeader: () => (
                          <div className="h-[50px] bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">Time</span>
                          </div>
                        ),
                        event: ({ event }: { event: CalendarEvent }) => (
                          <div className="h-full p-1 text-xs overflow-hidden">
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-gray-500 truncate">
                              {event.staff.name}
                            </div>
                          </div>
                        ),
                      }}
                      dayPropGetter={(date: Date) => ({
                        className: `${date.getDay() === 0 || date.getDay() === 6
                            ? 'bg-gray-50'
                            : 'bg-white'
                          } hover:bg-gray-50 transition-colors duration-150`,
                      })}
                      slotPropGetter={() => ({
                        className: 'border-gray-100',
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

        {/* Appointment Details Modal */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedAppointment.customer.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedAppointment.customer.name}</h3>
                    <Badge className={cn("mt-1", getStatusColor(selectedAppointment.status))}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Service</Label>
                    <Input value={selectedAppointment.service?.title || 'Service'} readOnly />
                  </div>
                  <div>
                    <Label>Staff</Label>
                    <Input value={selectedAppointment.staff.name} readOnly />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input value={format(parseISO(selectedAppointment.date), 'PPP')} readOnly />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input value={selectedAppointment.time} readOnly />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={selectedAppointment.customer.phone} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={selectedAppointment.customer.email} readOnly />
                  </div>
                </div>

                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={selectedAppointment.customer.notes || ''}
                    readOnly
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  {selectedAppointment.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleStatusChange(selectedAppointment._id, "confirmed")
                          setIsEditDialogOpen(false)
                        }}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleStatusChange(selectedAppointment._id, "cancelled")
                          setIsEditDialogOpen(false)
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}

                  {selectedAppointment.status === "confirmed" && (
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedAppointment._id, "completed")
                        setIsEditDialogOpen(false)
                      }}
                      className="bg-gradient-to-r from-purple-600 to-purple-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as Completed
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Appointment Modal */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    value={newAppointment.customer.name}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      customer: { ...newAppointment.customer, name: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Customer Email</Label>
                  <Input
                    type="email"
                    value={newAppointment.customer.email}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      customer: { ...newAppointment.customer, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Customer Phone</Label>
                  <Input
                    type="tel"
                    value={newAppointment.customer.phone}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      customer: { ...newAppointment.customer, phone: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Service</Label>
                  <Select
                    value={newAppointment.service}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.title} ({service.duration} mins) - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Staff</Label>
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
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newAppointment.date >= new Date().toISOString().split('T')[0] ? newAppointment.date : format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={newAppointment.customer.notes || ''}
                  onChange={(e) => setNewAppointment({
                    ...newAppointment,
                    customer: { ...newAppointment.customer, notes: e.target.value }
                  })}
                  rows={3}
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-700"
                onClick={handleCreateAppointment}
              >
                Create Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Time Slot Action Modal */}
        <Dialog open={!!selectedTimeSlot} onOpenChange={(open) => !open && setSelectedTimeSlot(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Time Slot Actions</DialogTitle>
            </DialogHeader>
            {selectedTimeSlot && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Time Slot</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Date:</strong> {format(selectedTimeSlot.start, 'PPP')}</p>
                    <p><strong>Time:</strong> {format(selectedTimeSlot.start, 'p')} - {format(selectedTimeSlot.end, 'p')}</p>
                    <p><strong>Staff:</strong> {staffMembers.find(s => s._id === selectedTimeSlot.staffId)?.name || 'Unknown'}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setNewAppointment({
                        ...newAppointment,
                        staff: selectedTimeSlot.staffId,
                        date: format(selectedTimeSlot.start, 'yyyy-MM-dd'),
                        time: format(selectedTimeSlot.start, 'HH:mm')
                      })
                      setSelectedTimeSlot(null)
                      setIsCreateDialogOpen(true)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBlockDetails({
                        ...blockDetails,
                        staff: selectedTimeSlot.staffId,
                        date: format(selectedTimeSlot.start, 'yyyy-MM-dd'),
                        time: format(selectedTimeSlot.start, 'HH:mm'),
                        duration: Math.floor((selectedTimeSlot.end.getTime() - selectedTimeSlot.start.getTime()) / 60000)
                      })
                      setSelectedTimeSlot(null)
                      setIsBlockDialogOpen(true)
                    }}
                    className="flex-1"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Block Time
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Block Time Modal */}
        <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Block Time Slot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Staff</Label>
                  <Select
                    value={blockDetails.staff}
                    onValueChange={(value) => setBlockDetails({ ...blockDetails, staff: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff._id} value={staff._id}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={blockDetails.duration}
                    onChange={(e) => setBlockDetails({
                      ...blockDetails,
                      duration: parseInt(e.target.value) || 60
                    })}
                    min="15"
                    step="15"
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={blockDetails.date}
                    onChange={(e) => setBlockDetails({ ...blockDetails, date: e.target.value })}
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={blockDetails.time}
                    onChange={(e) => setBlockDetails({ ...blockDetails, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Reason for blocking</Label>
                <Textarea
                  value={blockDetails.reason}
                  onChange={(e) => setBlockDetails({ ...blockDetails, reason: e.target.value })}
                  rows={3}
                  placeholder="Break, maintenance, personal time, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700"
                onClick={handleBlockTime}
                disabled={isBlockingTime}
              >
                {isBlockingTime ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4 mr-2" />
                )}
                Block Time
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}