"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Loader2, Clock, User } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'blocked'
  service?: any
  customer: any
  staff: any
}

interface CalendarResource {
  resourceId: string
  resourceTitle: string
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
  loading = false
}: CalendarComponentProps) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day')
  const [currentDate, setCurrentDate] = useState(new Date())

  const statusColors = {
    confirmed: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500',
    cancelled: 'bg-red-500',
    blocked: 'bg-gray-500'
  }

  const statusBorders = {
    confirmed: 'border-green-200',
    pending: 'border-yellow-200',
    completed: 'border-blue-200',
    cancelled: 'border-red-200',
    blocked: 'border-gray-200'
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push({ hour, minute })
      }
    }
    return slots
  }

  const getEventsForDay = (date: Date, resourceId?: string) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      const isSameDay = eventDate.toDateString() === date.toDateString()
      const matchesResource = resourceId ? event.resourceId === resourceId : true
      return isSameDay && matchesResource
    })
  }

  const getEventsForTimeSlot = (date: Date, hour: number, minute: number, resourceId?: string) => {
    const slotStart = new Date(date)
    slotStart.setHours(hour, minute, 0, 0)
    const slotEnd = new Date(slotStart)
    slotEnd.setMinutes(slotEnd.getMinutes() + 30)

    return events.filter(event => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const matchesResource = resourceId ? event.resourceId === resourceId : true
      
      return matchesResource && (
        (eventStart >= slotStart && eventStart < slotEnd) ||
        (eventEnd > slotStart && eventEnd <= slotEnd) ||
        (eventStart <= slotStart && eventEnd >= slotEnd)
      )
    })
  }

  const navigateCalendar = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate)
    
    if (direction === 'today') {
      setCurrentDate(new Date())
      return
    }

    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    }
    
    setCurrentDate(newDate)
  }

  const handleSlotClick = (date: Date, hour: number, minute: number, resourceId?: string) => {
    const start = new Date(date)
    start.setHours(hour, minute, 0, 0)
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + 30)
    
    onSelectSlot({ start, end, resourceId })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const renderDayView = () => {
    const timeSlots = getTimeSlots()
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex border-b border-gray-200">
          <div className="w-20 p-4 bg-gray-50 border-r border-gray-200">
            <span className="text-sm font-medium text-gray-600">Time</span>
          </div>
          {resources.map(resource => (
            <div key={resource.resourceId} className="flex-1 p-4 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center">
              <span className="text-sm font-medium text-gray-600">{resource.resourceTitle}</span>
            </div>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map(({ hour, minute }) => (
            <div key={`${hour}-${minute}`} className="flex border-b border-gray-100 min-h-12">
              <div className="w-20 p-2 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
                </span>
              </div>
              {resources.map(resource => {
                const slotEvents = getEventsForTimeSlot(currentDate, hour, minute, resource.resourceId)
                return (
                  <div 
                    key={resource.resourceId}
                    className="flex-1 p-1 border-r border-gray-200 last:border-r-0 hover:bg-purple-50 cursor-pointer transition-colors duration-150"
                    onClick={() => handleSlotClick(currentDate, hour, minute, resource.resourceId)}
                  >
                    {slotEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg mb-1 text-xs text-white cursor-pointer hover:shadow-md transition-all duration-200 ${statusColors[event.status]} ${statusBorders[event.status]} border`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectEvent(event)
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-white/80 truncate">{event.staff.name}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate)
    const timeSlots = getTimeSlots()
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex border-b border-gray-200">
          <div className="w-20 p-4 bg-gray-50 border-r border-gray-200">
            <span className="text-sm font-medium text-gray-600">Time</span>
          </div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="flex-1 p-4 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center">
              <div className="text-sm font-medium text-gray-600">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map(({ hour, minute }) => (
            <div key={`${hour}-${minute}`} className="flex border-b border-gray-100 min-h-12">
              <div className="w-20 p-2 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
                </span>
              </div>
              {weekDays.map(day => {
                const dayEvents = getEventsForTimeSlot(day, hour, minute)
                return (
                  <div 
                    key={day.toISOString()}
                    className="flex-1 p-1 border-r border-gray-200 last:border-r-0 hover:bg-purple-50 cursor-pointer transition-colors duration-150"
                    onClick={() => handleSlotClick(day, hour, minute)}
                  >
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`p-1 rounded text-xs text-white cursor-pointer hover:shadow-md transition-all duration-200 ${statusColors[event.status]} mb-1`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectEvent(event)
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

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
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 bg-gray-50 border-r border-gray-200 last:border-r-0 text-center">
              <span className="text-sm font-medium text-gray-600">{day}</span>
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 gap-0">
          {days.map(day => {
            const dayEvents = getEventsForDay(day)
            const isCurrentMonth = day.getMonth() === currentDate.getMonth()
            const isToday = day.toDateString() === new Date().toDateString()
            
            return (
              <div
                key={day.toISOString()}
                className={`p-2 border-r border-b border-gray-200 hover:bg-purple-50 cursor-pointer transition-colors duration-150 ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                } ${isToday ? 'bg-blue-50' : ''}`}
                onClick={() => handleSlotClick(day, 9, 0)}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`p-1 rounded text-xs text-white cursor-pointer hover:shadow-md transition-all duration-200 ${statusColors[event.status]}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectEvent(event)
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
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
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={() => navigateCalendar('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={() => navigateCalendar('today')}
            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors mx-2"
          >
            Today
          </button>
          <button
            onClick={() => navigateCalendar('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
          <span className="ml-4 text-lg font-semibold text-gray-800">
            {view === 'day' ? formatDate(currentDate) : 
             view === 'week' ? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` :
             currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        
        <div className="flex space-x-1">
          {['day', 'week', 'month'].map((viewType) => (
            <button
              key={viewType}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                view === viewType
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => setView(viewType as any)}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        {view === 'day' && renderDayView()}
        {view === 'week' && renderWeekView()}
        {view === 'month' && renderMonthView()}
      </div>
    </div>
  )
}