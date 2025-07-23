"use client"

import { useState, useRef } from "react"
import type React from "react"
import { ChevronLeft, ChevronRight, Loader2, Clock, User, MoreHorizontal, Lock } from "lucide-react"
import Image from "next/image"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId: string
  status: "confirmed" | "pending" | "completed" | "cancelled" | "blocked"
  service?: any
  customer: any
  staff: {
    _id: string
    name: string
    email: string
    profilePicUrl?: string
    jobTitle?: string
    phoneNumber?: string
  }
  isBlocked?: boolean
  reason?: string
}

interface CalendarResource {
  resourceId: string
  resourceTitle: string
  resourceImage?: string
}

interface CalendarComponentProps {
  events: CalendarEvent[]
  resources: CalendarResource[]
  onSelectEvent: (event: CalendarEvent) => void
  onSelectSlot: (slotInfo: { start: Date; end: Date; resourceId?: string }) => void
  loading?: boolean
}

export default function CalendarComponent({
  events,
  resources,
  onSelectEvent,
  onSelectSlot,
  loading = false,
}: CalendarComponentProps) {
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [hoveredStaff, setHoveredStaff] = useState<any>(null)
  const [staffTooltipPosition, setStaffTooltipPosition] = useState({ top: 0, left: 0 })
  const calendarRef = useRef<HTMLDivElement>(null)

  // Status colors with better visual hierarchy - Updated for blocked status
  const statusColors = {
    confirmed: "bg-green-500 border-green-600",
    pending: "bg-yellow-500 border-yellow-600",
    completed: "bg-blue-500 border-blue-600",
    cancelled: "bg-red-500 border-red-600",
    blocked: "bg-red-600 border-red-700", // Changed to red for blocked
  }

  const statusTextColors = {
    confirmed: "text-green-600",
    pending: "text-yellow-600",
    completed: "text-blue-600",
    cancelled: "text-red-600",
    blocked: "text-red-600", // Changed to red for blocked
  }

  const statusLightColors = {
    confirmed: "bg-green-50 border-green-100",
    pending: "bg-yellow-50 border-yellow-100",
    completed: "bg-blue-50 border-blue-100",
    cancelled: "bg-red-50 border-red-100",
    blocked: "bg-red-50 border-red-200", // Changed to red for blocked
  }

  // Format time without seconds
  const formatTime = (date: Date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/^0/, "")
  }

  // More compact date formatting
  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }
    return date
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      })
      .replace(/,/g, "")
  }

  // Handle hover events for tooltips
  const handleEventHover = (event: CalendarEvent, e: React.MouseEvent) => {
    setHoveredEvent(event)
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: e.clientY - rect.top + 10,
        left: e.clientX - rect.left + 10,
      })
    }
  }

  const handleStaffHover = (staff: any, e: React.MouseEvent) => {
    setHoveredStaff(staff)
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect()
      setStaffTooltipPosition({
        top: e.clientY - rect.top + 10,
        left: e.clientX - rect.left + 10,
      })
    }
  }

  // Close tooltips when mouse leaves
  const handleMouseLeave = () => {
    setHoveredEvent(null)
    setHoveredStaff(null)
  }

  // Get week days starting from Sunday
  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  // Business hours time slots
  const getTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push({ hour, minute })
      }
    }
    return slots
  }

  // Get events for a specific day
  const getEventsForDay = (date: Date, resourceId?: string) => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.start)
        const isSameDay = eventDate.toDateString() === date.toDateString()
        const matchesResource = resourceId ? event.resourceId === resourceId : true
        return isSameDay && matchesResource
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }

  // Calculate event blocks for day view
  const getEventBlocks = (date: Date, resourceId: string) => {
    const dayEvents = getEventsForDay(date, resourceId)
    const blocks = []
    for (const event of dayEvents) {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      // Calculate position and height
      const startHour = eventStart.getHours()
      const startMinute = eventStart.getMinutes()
      const endHour = eventEnd.getHours()
      const endMinute = eventEnd.getMinutes()
      const startSlot = (startHour - 8) * 2 + (startMinute >= 30 ? 1 : 0)
      const endSlot = (endHour - 8) * 2 + (endMinute > 30 ? 1 : 0)
      const duration = Math.max(endSlot - startSlot, 1) // Minimum 1 slot
      blocks.push({
        ...event,
        startSlot,
        duration,
        top: startSlot * 48 + 2, // 48px per slot + 2px margin
        height: duration * 48 - 4, // Subtract margin
      })
    }
    return blocks
  }

  // Check if a slot has overlapping event or is blocked
  const hasOverlappingEvent = (date: Date, hour: number, minute: number, resourceId: string) => {
    const slotStart = new Date(date)
    slotStart.setHours(hour, minute, 0, 0)
    const slotEnd = new Date(slotStart)
    slotEnd.setMinutes(slotEnd.getMinutes() + 30)

    return events.some((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const matchesResource = event.resourceId === resourceId
      const isOverlapping = matchesResource && eventStart < slotEnd && eventEnd > slotStart

      return isOverlapping
    })
  }

  // Check if a slot is blocked (specifically for visual indication)
  const isSlotBlocked = (date: Date, hour: number, minute: number, resourceId: string) => {
    const slotStart = new Date(date)
    slotStart.setHours(hour, minute, 0, 0)
    const slotEnd = new Date(slotStart)
    slotEnd.setMinutes(slotEnd.getMinutes() + 30)

    return events.some((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const matchesResource = event.resourceId === resourceId
      const isOverlapping = matchesResource && eventStart < slotEnd && eventEnd > slotStart

      return event.status === "blocked" && isOverlapping
    })
  }

  // Navigation functions
  const navigateCalendar = (direction: "prev" | "next" | "today") => {
    const newDate = new Date(currentDate)
    if (direction === "today") {
      setCurrentDate(new Date())
      return
    }
    if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  // Handle slot selection
  const handleSlotClick = (date: Date, hour: number, minute: number, resourceId?: string) => {
    if (resourceId && hasOverlappingEvent(date, hour, minute, resourceId)) {
      return // Don't allow booking on occupied slots
    }
    const start = new Date(date)
    start.setHours(hour, minute, 0, 0)
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + 30)
    onSelectSlot({ start, end, resourceId })
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  // Day View Component
  const renderDayView = () => {
    const timeSlots = getTimeSlots()
    return (
      <div className="flex flex-col h-full" onMouseLeave={handleMouseLeave}>
        {/* Resource Headers */}
        <div className="flex border-b border-gray-200">
          <div className="w-20 p-3 bg-gray-50 border-r border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Time</span>
          </div>
          {resources.map((resource) => (
            <div
              key={resource.resourceId}
              className="flex-1 p-3 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center"
            >
              <div className="flex items-center justify-center space-x-2">
                {resource.resourceImage ? (
                  <Image
                    src={resource.resourceImage || "/placeholder.svg"}
                    alt={resource.resourceTitle}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-3 w-3 text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{resource.resourceTitle}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Time Column */}
            <div className="w-20 bg-gray-50 border-r border-gray-200">
              {timeSlots.map(({ hour, minute }) => (
                <div
                  key={`${hour}-${minute}`}
                  className="h-12 p-1 border-b border-gray-100 flex items-start justify-end pr-2"
                >
                  <span className="text-xs text-gray-500 font-medium">
                    {hour}:{String(minute).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            {/* Resource Columns */}
            {resources.map((resource) => {
              const eventBlocks = getEventBlocks(currentDate, resource.resourceId)
              return (
                <div key={resource.resourceId} className="flex-1 border-r border-gray-200 last:border-r-0 relative">
                  {/* Time slots for clicking */}
                  {timeSlots.map(({ hour, minute }) => {
                    const hasEvent = hasOverlappingEvent(currentDate, hour, minute, resource.resourceId)
                    const isBlocked = isSlotBlocked(currentDate, hour, minute, resource.resourceId)
                    return (
                      <div
                        key={`${hour}-${minute}`}
                        className={`h-12 border-b border-gray-100 transition-colors duration-150 ${
                          isBlocked
                            ? "bg-red-100 cursor-not-allowed border-red-200"
                            : hasEvent
                              ? "cursor-not-allowed"
                              : "hover:bg-purple-50 cursor-pointer"
                        }`}
                        onClick={() => !hasEvent && handleSlotClick(currentDate, hour, minute, resource.resourceId)}
                      >
                        {isBlocked && (
                          <div className="flex items-center justify-center h-full">
                            <Lock className="h-3 w-3 text-red-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {/* Event blocks */}
                  {eventBlocks.map((event) => (
                    <div
                      key={event.id}
                      className={`absolute left-1 right-1 rounded-md border shadow-sm cursor-pointer transition-all duration-200 ${
                        event.status === "blocked" ? "bg-red-600 border-red-700" : statusColors[event.status]
                      }`}
                      style={{
                        top: `${event.top}px`,
                        height: `${event.height}px`,
                      }}
                      onClick={() => onSelectEvent(event)}
                      onMouseEnter={(e) => handleEventHover(event, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-xs text-white truncate">
                            {event.status === "blocked" ? (
                              <div className="flex items-center">
                                <Lock className="h-3 w-3 mr-1" />
                                {event.reason || "BLOCKED"}
                              </div>
                            ) : (
                              event.title
                            )}
                          </div>
                          <button
                            className="text-white/70 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectEvent(event)
                            }}
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Week View Component
  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate)
    const timeSlots = getTimeSlots()
    return (
      <div className="flex flex-col h-full" onMouseLeave={handleMouseLeave}>
        {/* Weekday Headers */}
        <div className="flex border-b border-gray-200">
          <div className="w-20 p-3 bg-gray-50 border-r border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Time</span>
          </div>
          {weekDays.map((day) => {
            const isToday = day.toDateString() === new Date().toDateString()
            return (
              <div
                key={day.toISOString()}
                className={`flex-1 p-3 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center ${
                  isToday ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div
                  className={`text-sm font-semibold mt-1 ${
                    isToday
                      ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                      : "text-gray-700"
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
            )
          })}
        </div>
        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Time Column */}
            <div className="w-20 bg-gray-50 border-r border-gray-200">
              {timeSlots.map(({ hour, minute }) => (
                <div
                  key={`${hour}-${minute}`}
                  className="h-12 p-1 border-b border-gray-100 flex items-start justify-end pr-2"
                >
                  <span className="text-xs text-gray-500 font-medium">
                    {hour}:{String(minute).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            {/* Day Columns */}
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(day)
              const eventBlocks: Array<
                CalendarEvent & {
                  startSlot: number
                  duration: number
                  top: number
                  height: number
                }
              > = []
              const isToday = day.toDateString() === new Date().toDateString()
              // Create event blocks for this day
              for (const event of dayEvents) {
                const eventStart = new Date(event.start)
                const eventEnd = new Date(event.end)
                const startHour = eventStart.getHours()
                const startMinute = eventStart.getMinutes()
                const endHour = eventEnd.getHours()
                const endMinute = eventEnd.getMinutes()
                const startSlot = (startHour - 8) * 2 + (startMinute >= 30 ? 1 : 0)
                const endSlot = (endHour - 8) * 2 + (endMinute > 30 ? 1 : 0)
                const duration = Math.max(endSlot - startSlot, 1)
                eventBlocks.push({
                  ...event,
                  startSlot,
                  duration,
                  top: startSlot * 48 + 2,
                  height: duration * 48 - 4,
                })
              }
              return (
                <div
                  key={day.toISOString()}
                  className={`flex-1 border-r border-gray-200 last:border-r-0 relative ${
                    isToday ? "bg-blue-50/30" : ""
                  }`}
                >
                  {/* Time slots for clicking */}
                  {timeSlots.map(({ hour, minute }) => {
                    const hasEvent = eventBlocks.some((event) => {
                      const slotIndex = (hour - 8) * 2 + (minute >= 30 ? 1 : 0)
                      return slotIndex >= event.startSlot && slotIndex < event.startSlot + event.duration
                    })

                    // Check if any of the events in this slot are blocked
                    const isBlocked = eventBlocks.some((event) => {
                      const slotIndex = (hour - 8) * 2 + (minute >= 30 ? 1 : 0)
                      return (
                        event.status === "blocked" &&
                        slotIndex >= event.startSlot &&
                        slotIndex < event.startSlot + event.duration
                      )
                    })

                    return (
                      <div
                        key={`${hour}-${minute}`}
                        className={`h-12 border-b border-gray-100 transition-colors duration-150 ${
                          isBlocked
                            ? "bg-red-100 cursor-not-allowed border-red-200"
                            : hasEvent
                              ? "cursor-not-allowed"
                              : "hover:bg-purple-50 cursor-pointer"
                        }`}
                        onClick={() => !hasEvent && handleSlotClick(day, hour, minute)}
                      >
                        {isBlocked && (
                          <div className="flex items-center justify-center h-full">
                            <Lock className="h-3 w-3 text-red-500" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {/* Event blocks */}
                  {eventBlocks.map((event) => (
                    <div
                      key={event.id}
                      className={`absolute left-1 right-1 rounded-md border shadow-sm cursor-pointer transition-all duration-200 ${
                        event.status === "blocked" ? "bg-red-600 border-red-700" : statusColors[event.status]
                      }`}
                      style={{
                        top: `${event.top}px`,
                        height: `${event.height}px`,
                      }}
                      onClick={() => onSelectEvent(event)}
                      onMouseEnter={(e) => handleEventHover(event, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
                        <div className="font-medium text-xs text-white truncate">
                          {event.status === "blocked" ? (
                            <div className="flex items-center">
                              <Lock className="h-3 w-3 mr-1" />
                              {event.reason || "BLOCKED"}
                            </div>
                          ) : (
                            event.title
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {event.staff.profilePicUrl ? (
                              <Image
                                src={event.staff.profilePicUrl || "/placeholder.svg"}
                                alt={event.staff.name}
                                width={16}
                                height={16}
                                className="rounded-full mr-1 border border-white"
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect()
                                  if (calendarRef.current) {
                                    const calendarRect = calendarRef.current.getBoundingClientRect()
                                    setStaffTooltipPosition({
                                      top: rect.bottom - calendarRect.top + 5,
                                      left: rect.left - calendarRect.left,
                                    })
                                  }
                                  setHoveredStaff(event.staff)
                                }}
                                onMouseLeave={() => setHoveredStaff(null)}
                              />
                            ) : (
                              <div
                                className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center mr-1 border border-white"
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect()
                                  if (calendarRef.current) {
                                    const calendarRect = calendarRef.current.getBoundingClientRect()
                                    setStaffTooltipPosition({
                                      top: rect.bottom - calendarRect.top + 5,
                                      left: rect.left - calendarRect.left,
                                    })
                                  }
                                  setHoveredStaff(event.staff)
                                }}
                                onMouseLeave={() => setHoveredStaff(null)}
                              >
                                <User className="h-2 w-2 text-gray-600" />
                              </div>
                            )}
                            <span className="text-white/80 text-xs font-medium truncate">
                              {event.staff?.name?.split(" ")[0] || "Staff"}
                            </span>
                          </div>
                          <div className="text-white/80 text-xs font-medium">{formatTime(new Date(event.start))}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Month View Component
  const renderMonthView = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDate = new Date(firstDayOfMonth)
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay())
    const days = []
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }
    return (
      <div className="flex flex-col h-full" onMouseLeave={handleMouseLeave}>
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-3 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{day}</span>
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 gap-0">
          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isCurrentMonth = day.getMonth() === currentDate.getMonth()
            const isToday = day.toDateString() === new Date().toDateString()

            // Check if there are any blocked events for this day
            const hasBlockedEvents = dayEvents.some((event) => event.status === "blocked")

            return (
              <div
                key={day.toISOString()}
                className={`p-1.5 border-r border-b border-gray-200 hover:bg-purple-50 cursor-pointer transition-colors duration-150 ${
                  !isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
                } ${isToday ? "bg-blue-50" : ""} ${hasBlockedEvents ? "bg-red-50" : ""}`}
                onClick={() => handleSlotClick(day, 9, 0)}
              >
                <div
                  className={`text-sm font-medium mb-1 text-right px-1 ${
                    isToday
                      ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                      : ""
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`p-1 rounded text-xs cursor-pointer hover:shadow-md transition-all duration-200 ${
                        event.status === "blocked" ? "bg-red-50 border-red-200" : statusLightColors[event.status]
                      } border`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectEvent(event)
                      }}
                      onMouseEnter={(e) => handleEventHover(event, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className={`font-medium truncate ${
                          event.status === "blocked" ? "text-red-600" : statusTextColors[event.status]
                        }`}
                      >
                        {event.status === "blocked" ? (
                          <div className="flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            {event.reason || "BLOCKED"}
                          </div>
                        ) : (
                          event.title
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        {event.staff.profilePicUrl ? (
                          <Image
                            src={event.staff.profilePicUrl || "/placeholder.svg"}
                            alt={event.staff.name}
                            width={16}
                            height={16}
                            className="rounded-full mr-1"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              if (calendarRef.current) {
                                const calendarRect = calendarRef.current.getBoundingClientRect()
                                setStaffTooltipPosition({
                                  top: rect.bottom - calendarRect.top + 5,
                                  left: rect.left - calendarRect.left,
                                })
                              }
                              setHoveredStaff(event.staff)
                            }}
                            onMouseLeave={() => setHoveredStaff(null)}
                          />
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center mr-1"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              if (calendarRef.current) {
                                const calendarRect = calendarRef.current.getBoundingClientRect()
                                setStaffTooltipPosition({
                                  top: rect.bottom - calendarRect.top + 5,
                                  left: rect.left - calendarRect.left,
                                })
                              }
                              setHoveredStaff(event.staff)
                            }}
                            onMouseLeave={() => setHoveredStaff(null)}
                          >
                            <User className="h-2 w-2 text-gray-600" />
                          </div>
                        )}
                        <span
                          className={`text-xs truncate ${
                            event.status === "blocked" ? "text-red-600" : statusTextColors[event.status]
                          }`}
                        >
                          {event.staff?.name?.split(" ")[0] || "Staff"}
                        </span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      ref={calendarRef}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border-b border-gray-200">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={() => navigateCalendar("prev")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateCalendar("today")}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors mx-2 border border-gray-200"
          >
            Today
          </button>
          <button
            onClick={() => navigateCalendar("next")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="ml-4 text-lg font-semibold text-gray-800">
            {view === "day"
              ? formatDate(currentDate)
              : view === "week"
                ? `Week of ${formatDate(currentDate)}`
                : currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* Status Legend */}
          <div className="hidden md:flex items-center space-x-3 mr-4">
            {Object.entries({
              confirmed: "Confirmed",
              pending: "Pending",
              cancelled: "Cancelled",
              completed: "Completed",
              blocked: "Blocked",
            }).map(([status, label]) => (
              <div key={status} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-1 ${statusColors[status as keyof typeof statusColors].split(" ")[0]}`}
                ></div>
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {["day", "week", "month"].map((viewType) => (
              <button
                key={viewType}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  view === viewType ? "bg-white text-purple-700 shadow-sm" : "hover:bg-gray-50 text-gray-600"
                }`}
                onClick={() => setView(viewType as any)}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden relative">
        {view === "day" && renderDayView()}
        {view === "week" && renderWeekView()}
        {view === "month" && renderMonthView()}
        {/* Event Tooltip */}
        {hoveredEvent && (
          <div
            className="absolute z-50 w-64 bg-white border border-gray-200 p-3 rounded-lg shadow-lg pointer-events-none"
            style={{
              top: `${tooltipPosition.top - 80}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">
                {hoveredEvent.status === "blocked" ? "🔒 Blocked Time" : hoveredEvent.title}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  hoveredEvent.status === "blocked"
                    ? "bg-red-50 text-red-600"
                    : `${statusLightColors[hoveredEvent.status]} ${statusTextColors[hoveredEvent.status]}`
                }`}
              >
                {hoveredEvent.status.charAt(0).toUpperCase() + hoveredEvent.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              {formatTime(new Date(hoveredEvent.start))} - {formatTime(new Date(hoveredEvent.end))}
            </div>
            {hoveredEvent.status === "blocked" ? (
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Reason:</span> {hoveredEvent.reason || "Time blocked by admin"}
              </div>
            ) : (
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Customer:</span> {hoveredEvent.customer?.name || "N/A"}
              </div>
            )}
          </div>
        )}
        {/* Staff Tooltip */}
        {hoveredStaff && (
          <div
            className="absolute z-50 w-56 bg-white border border-gray-200 p-3 rounded-lg shadow-lg pointer-events-none"
            style={{
              top: `${staffTooltipPosition.top}px`,
              left: `${staffTooltipPosition.left}px`,
            }}
          >
            <div className="flex items-center mb-2">
              {hoveredStaff.profilePicUrl ? (
                <Image
                  src={hoveredStaff.profilePicUrl || "/placeholder.svg"}
                  alt={hoveredStaff.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">{hoveredStaff.name}</div>
                <div className="text-xs text-gray-500">{hoveredStaff.jobTitle || "Staff Member"}</div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500 w-14">Email:</span>
                <span className="text-gray-700 truncate">{hoveredStaff.email}</span>
              </div>
              {hoveredStaff.phoneNumber && (
                <div className="flex items-center">
                  <span className="text-gray-500 w-14">Phone:</span>
                  <span className="text-gray-700">{hoveredStaff.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
