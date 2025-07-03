"use client"
import Layout from '@/components/customer/Layout';
import { useState, useEffect } from "react"
import { Search, Filter, Star, MapPin, Clock, SlidersHorizontal, Grid, List, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { API_URL } from "@/lib/const"
import Header from "@/components/Header"
import HeaderForCustomer from "@/components/customer/HeaderForCustomer"
import { useRouter } from 'next/navigation';

interface BusinessTiming {
  days: number[]
  time: {
    open: { hour: number; minute: number }
    close: { hour: number; minute: number }
  }[]
}

interface BusinessAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  pincode: string
}

interface Business {
  _id: string
  brandName: string
  website: string
  thumbnail: string
  about: string
  serviceCategories: string[]
  teamSize: {
    min: number
    max: number
  }
  address: BusinessAddress
  isOnlineOnly: boolean
  existingSoftware: string
  foundUsAt: string
  media: {
    url: string
    type: "photo" | "video"
  }[]
  timings: BusinessTiming[]
  avgReview: number
  reviewCount: number
  services: string[]
}

interface ApiResponse {
  data: Business[]
}

interface Category {
  id: string
  label: string
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasToken, setHasToken] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  const categories: Category[] = [
    { id: "salon", label: "Hair Salon" },
    { id: "barbershop", label: "Barbershop" },
    { id: "spa", label: "Spa" },
    { id: "nail-salon", label: "Nail Salon" },
  ]

  // Check authentication first
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/customer/auth/login');
      return;
    }
    setHasToken(true);
    setAuthChecked(true);
  }, [router]);

  // Fetch businesses only after auth check
  useEffect(() => {
    if (!authChecked) return;

    const fetchBusinesses = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/business/getAllBusiness`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch businesses')
        }
        
        const result: ApiResponse = await response.json()
        setFilteredBusinesses(result.data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch businesses')
        console.error('Error fetching businesses:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinesses()
  }, [authChecked])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const applyFilters = () => {
    const filtered = filteredBusinesses.filter((business) => {
      const matchesSearch =
        business.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(business.serviceCategories[0] || '')
      const matchesRating = business.avgReview >= minRating

      return matchesSearch && matchesCategory && matchesRating
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.avgReview - a.avgReview
        case "name":
          return a.brandName.localeCompare(b.brandName)
        default:
          return 0
      }
    })

    setFilteredBusinesses(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [searchQuery, selectedCategories, minRating, sortBy])

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }
    if (!hasToken) {
    return null; // This will briefly show while redirect happens
  }


  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <HeaderForCustomer />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">{filteredBusinesses.length} businesses found</h1>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-purple-600" : ""}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-purple-600" : ""}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading businesses...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <div className="text-red-500 mb-4">
                    <AlertCircle className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Businesses</h3>
                  <p className="text-gray-600">{error}</p>
                </div>
              )}

              {!isLoading && !error && (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                  {filteredBusinesses.map((business) => (
                    <Card
                      key={business._id}
                      className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 ${viewMode === "list" ? "flex" : ""}`}
                    >
                      <div
                        className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : "rounded-t-lg"}`}
                      >
                        <img
                          src={business.thumbnail || "/placeholder.svg"}
                          alt={business.brandName}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                        />
                      </div>
                      <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{business.brandName}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{business.avgReview.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({business.reviewCount})</span>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {business.address.city}, {business.address.state}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-3">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {business.timings[0]?.time[0]?.open.hour.toString().padStart(2, '0')}:
                            {business.timings[0]?.time[0]?.open.minute.toString().padStart(2, '0')} - 
                            {business.timings[0]?.time[0]?.close.hour.toString().padStart(2, '0')}:
                            {business.timings[0]?.time[0]?.close.minute.toString().padStart(2, '0')}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {business.services.slice(0, 3).map((service) => (
                            <Badge key={service} variant="secondary" className="bg-purple-100 text-purple-700">
                              {service}
                            </Badge>
                          ))}
                          {business.services.length > 3 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              +{business.services.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{business.about.substring(0, 50)}...</span>
                          <Link href={`/business/${business._id}`}>
                            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!isLoading && !error && filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}