"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "@/lib/const"
import {
  Upload,
  Loader2,
  Plus,
  Trash2,
  Edit3,
  Clock,
  DollarSign,
  Tag,
  Hash,
  FileText,
  ImageIcon as ImageIconLucide,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, BarChart3, Settings, TrendingUp } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Service {
  title: string
  description: string
  hashtags: string
  tags: string
  price: string
  duration: string
  image: File | null
}

interface CreatedService {
  _id: string
  title: string
  description: string
  price: number
  duration: number
  imageUrl?: string
  [key: string]: any
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
  /*{
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },*/
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
                  <SidebarMenuButton asChild isActive={item.title === "Services"}>
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

const ServiceManagerPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [createdServices, setCreatedServices] = useState<CreatedService[]>([])
  const [allServices, setAllServices] = useState<CreatedService[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [currentService, setCurrentService] = useState<Service>({
    title: "",
    description: "",
    hashtags: "",
    tags: "",
    price: "",
    duration: "",
    image: null,
  })

  const getBusinessId = () => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("businessProfile")
      if (profile) return JSON.parse(profile)?._id
    }
    return null
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const businessId = getBusinessId()
        if (!businessId) return
        const res = await axios.get(`${API_URL}/service-categories/${businessId}/service-categories`)
        setAllServices(res.data.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentService({ ...currentService, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentService({ ...currentService, image: e.target.files[0] })
    }
  }

  const addToQueue = () => {
    if (!currentService.title || !currentService.price || !currentService.duration) {
      return
    }
    setServices([...services, currentService])
    setCurrentService({
      title: "",
      description: "",
      hashtags: "",
      tags: "",
      price: "",
      duration: "",
      image: null,
    })
  }

  const removeFromQueue = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const uploadServices = async () => {
    setLoading(true)
    const businessId = getBusinessId()
    const newCreated: CreatedService[] = []

    for (const s of services) {
      const formData = new FormData()
      if (s.image) formData.append("image", s.image)
      formData.append("title", s.title)
      formData.append("description", s.description)
      formData.append("hashtags", s.hashtags)
      formData.append("tags", s.tags)
      formData.append("price", s.price)
      formData.append("duration", s.duration)

      try {
        const res = await axios.post(`${API_URL}/service-categories/${businessId}/service-categories`, formData)
        newCreated.push(res.data.data.serviceCategories.at(-1))
      } catch (err) {
        console.error("Upload failed:", err)
      }
    }

    setCreatedServices([...createdServices, ...newCreated])
    setAllServices([...allServices, ...newCreated])
    setServices([])
    setLoading(false)
  }

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                <div
                  className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-pink-400 animate-spin mx-auto"
                  style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                ></div>
              </div>
              <p className="text-gray-600 font-medium">Creating amazing services...</p>
              <p className="text-sm text-gray-400 mt-1">Please wait while we process your request</p>
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-purple-100">
            <div className="flex items-center justify-between p-6">
              <div>
                <SidebarTrigger className="mr-4" />
                <div className="inline-block">
                  <h1 className="text-3xl font-bold">
                    Service Manager
                  </h1>
                  <p className="text-gray-600 mt-1">Create and manage your business services</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {allServices.length} Total Services
                </Badge>
                {services.length > 0 && (
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {services.length} Queued
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <main className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Service Creation Form */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gray-200">
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-6 w-6" />
                  <span>Create New Service</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4" />
                        <span>Service Title</span>
                      </label>
                      <Input
                        name="title"
                        placeholder="e.g., Premium Hair Cut & Styling"
                        value={currentService.title}
                        onChange={handleChange}
                        className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <FileText className="h-4 w-4" />
                        <span>Description</span>
                      </label>
                      <Textarea
                        name="description"
                        placeholder="Describe your service in detail..."
                        value={currentService.description}
                        onChange={handleChange}
                        className="min-h-[120px] border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <DollarSign className="h-4 w-4" />
                          <span>Price (₹)</span>
                        </label>
                        <Input
                          name="price"
                          type="number"
                          placeholder="299"
                          value={currentService.price}
                          onChange={handleChange}
                          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <Clock className="h-4 w-4" />
                          <span>Duration (min)</span>
                        </label>
                        <Input
                          name="duration"
                          type="number"
                          placeholder="45"
                          value={currentService.duration}
                          onChange={handleChange}
                          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Hash className="h-4 w-4" />
                        <span>Hashtags</span>
                      </label>
                      <Input
                        name="hashtags"
                        placeholder="#haircut, #styling, #premium"
                        value={currentService.hashtags}
                        onChange={handleChange}
                        className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Tag className="h-4 w-4" />
                        <span>Tags</span>
                      </label>
                      <Input
                        name="tags"
                        placeholder="hair, beauty, premium, styling"
                        value={currentService.tags}
                        onChange={handleChange}
                        className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <ImageIconLucide className="h-4 w-4" />
                        <span>Service Image</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={addToQueue}
                      className="w-full h-12 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={!currentService.title || !currentService.price || !currentService.duration}
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add to Queue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queued Services */}
            {services.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-6 w-6" />
                      <span>Queued Services ({services.length})</span>
                    </CardTitle>
                    <Button
                      onClick={uploadServices}
                      className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload All ({services.length})
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-200"
                      >
                        <Button
                          onClick={() => removeFromQueue(index)}
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4 mr-1" />₹{service.price}
                          </span>
                          <span className="flex items-center text-blue-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}min
                          </span>
                        </div>
                        {service.hashtags && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {service.hashtags
                                .split(",")
                                .slice(0, 3)
                                .map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                    {tag.trim()}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Successfully Created Services */}
            {createdServices.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Successfully Created ({createdServices.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {createdServices.map((service, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200"
                      >
                        {service.imageUrl && (
                          <img
                            src={service.imageUrl || "/placeholder.svg"}
                            alt="Service"
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                        )}
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4 mr-1" />₹{service.price}
                          </span>
                          <span className="flex items-center text-blue-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}min
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Existing Services */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gray-200 text-black rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-6 w-6" />
                  <span>All Services ({allServices.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {fetchLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading services...</p>
                    </div>
                  </div>
                ) : allServices.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Settings className="h-12 w-12 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Yet</h3>
                    <p className="text-gray-500">Create your first service to get started!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allServices.map((service) => (
                      <div
                        key={service._id}
                        className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {service.imageUrl && (
                          <div className="relative overflow-hidden rounded-lg mb-4">
                            <img
                              src={service.imageUrl || "/placeholder.svg"}
                              alt="Service"
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                        <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-green-600 font-bold text-lg">
                            <DollarSign className="h-5 w-5 mr-1" />₹{service.price}
                          </span>
                          <span className="flex items-center text-blue-600 font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}min
                          </span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          {/* <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button> */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ServiceManagerPage
