"use client"
import Layout from '@/components/customer/Layout';
import { useState, useEffect } from "react"
import { Search, Filter, Star, MapPin, Clock, SlidersHorizontal, Grid, List, AlertCircle, X } from "lucide-react"
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
import HeaderForCustomer from "@/components/customer/HeaderForCustomer"
import { useRouter } from 'next/navigation';
import { Separator } from "@/components/ui/separator"

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
  businessType: string
  teamSize: {
    min: number
    max: number
  }
  address: BusinessAddress
  isOnlineOnly: boolean
  timings: BusinessTiming[]
  avgReview: number
  reviewCount: number
  serviceCategories: {
    title: string
    tags: string[]
    price: number
  }[]
  services: string[]
}

interface ApiResponse {
  data: Business[]
  message: string
  success: boolean

}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasToken, setHasToken] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])

  // Filter states
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [teamSizeRange, setTeamSizeRange] = useState<[number, number]>([0, 50])
  const [onlineOnly, setOnlineOnly] = useState<boolean | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract filter options from data
  const businessTypes = Array.from(new Set(businesses.map(b => b.businessType)))
  const cities = Array.from(new Set(businesses.map(b => b.address.city)))
  const allTags = Array.from(new Set(businesses.flatMap(b =>
    b.serviceCategories?.flatMap(cat => cat.tags) || []
  )))

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

        // Process the tags to remove # if needed
        const processedBusinesses = result.data.map(business => ({
          ...business,
          serviceCategories: business.serviceCategories?.map(category => ({
            ...category,
            tags: category.tags?.map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
          })) || []
        }))

        setBusinesses(processedBusinesses)
        setFilteredBusinesses(processedBusinesses)
        setError(null)

        // Set dynamic price range based on data
        const prices = result.data.flatMap(b =>
          b.serviceCategories?.map(cat => cat.price) || []
        )
        const maxPrice = Math.max(...prices, 1000)
        setPriceRange([0, maxPrice])

        // Set dynamic team size range
        const teamSizes = result.data.flatMap(b => [b.teamSize.min, b.teamSize.max])
        const maxTeamSize = Math.max(...teamSizes, 50)
        setTeamSizeRange([0, maxTeamSize])

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch businesses')
        console.error('Error fetching businesses:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinesses()
  }, [authChecked])

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const filtered = businesses.filter((business) => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        business.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.serviceCategories?.some(cat =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Business type filter
      const matchesBusinessType = selectedBusinessTypes.length === 0 ||
        selectedBusinessTypes.includes(business.businessType)

      // City filter
      const matchesCity = selectedCities.length === 0 ||
        selectedCities.includes(business.address.city)

      // Rating filter
      const matchesRating = business.avgReview >= minRating

      // Price filter (check if any service category falls within range)
      const matchesPrice = business.serviceCategories?.length === 0 ||
        business.serviceCategories?.some(cat =>
          cat.price >= priceRange[0] && cat.price <= priceRange[1]
        )

      // Team size filter
      const matchesTeamSize =
        (business.teamSize.min >= teamSizeRange[0] ||
          business.teamSize.max >= teamSizeRange[0]) &&
        (business.teamSize.max <= teamSizeRange[1] ||
          business.teamSize.min <= teamSizeRange[1])

      // Online only filter
      const matchesOnline = onlineOnly === null ||
        business.isOnlineOnly === onlineOnly

      // Tags filter
      const matchesTags = selectedTags.length === 0 ||
        (business.serviceCategories?.length > 0 &&
          selectedTags.some(tag =>
            business.serviceCategories?.some(cat =>
              cat.tags?.includes(tag)
            )
          ))

      return matchesSearch && matchesBusinessType && matchesCity &&
        matchesRating && matchesPrice && matchesTeamSize &&
        matchesOnline && matchesTags
    })

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.avgReview - a.avgReview
        case "name":
          return a.brandName.localeCompare(b.brandName)
        case "price-high":
          const maxPriceA = Math.max(...(a.serviceCategories?.map(c => c.price) || [0]))
          const maxPriceB = Math.max(...(b.serviceCategories?.map(c => c.price) || [0]))
          return maxPriceB - maxPriceA
        case "price-low":
          const minPriceA = Math.min(...(a.serviceCategories?.map(c => c.price) || [0]))
          const minPriceB = Math.min(...(b.serviceCategories?.map(c => c.price) || [0]))
          return minPriceA - minPriceB
        default:
          return 0
      }
    })

    setFilteredBusinesses(filtered)
  }, [
    searchQuery, selectedBusinessTypes, selectedCities, minRating,
    priceRange, teamSizeRange, onlineOnly, selectedTags, sortBy, businesses
  ])

  const resetFilters = () => {
    setSelectedBusinessTypes([])
    setSelectedCities([])
    setMinRating(0)
    setOnlineOnly(null)
    setSelectedTags([])
  }

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
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <HeaderForCustomer />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters - Left Sidebar */}
            <div className="hidden lg:block w-72 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Reset all
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Search</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search businesses..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Business Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Business Type</h4>
                  <div className="space-y-2">
                    {businessTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedBusinessTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBusinessTypes([...selectedBusinessTypes, type])
                            } else {
                              setSelectedBusinessTypes(selectedBusinessTypes.filter(t => t !== type))
                            }
                          }}
                        />
                        <label htmlFor={`type-${type}`} className="text-sm">
                          {type || "Other"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Cities</h4>
                  <div className="space-y-2">
                    {cities.map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox
                          id={`city-${city}`}
                          checked={selectedCities.includes(city)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCities([...selectedCities, city])
                            } else {
                              setSelectedCities(selectedCities.filter(c => c !== city))
                            }
                          }}
                        />
                        <label htmlFor={`city-${city}`} className="text-sm">
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Minimum Rating</h4>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Slider
                      min={0}
                      max={5}
                      step={0.5}
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      className="flex-1"
                    />
                    <span className="text-sm w-8">{minRating}</span>
                  </div>
                </div>



                {/* Tags */}
                {allTags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Service Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter(t => t !== tag))
                            } else {
                              setSelectedTags([...selectedTags, tag])
                            }
                          }}
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <X className="h-3 w-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filters - Sheet */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md mr-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search businesses..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Business Type */}
                    <div>
                      <h4 className="font-medium mb-2">Business Type</h4>
                      <div className="space-y-2">
                        {businessTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-type-${type}`}
                              checked={selectedBusinessTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedBusinessTypes([...selectedBusinessTypes, type])
                                } else {
                                  setSelectedBusinessTypes(selectedBusinessTypes.filter(t => t !== type))
                                }
                              }}
                            />
                            <label htmlFor={`mobile-type-${type}`} className="text-sm">
                              {type || "Other"}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Cities */}
                    <div>
                      <h4 className="font-medium mb-2">Cities</h4>
                      <div className="space-y-2">
                        {cities.map((city) => (
                          <div key={city} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-city-${city}`}
                              checked={selectedCities.includes(city)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCities([...selectedCities, city])
                                } else {
                                  setSelectedCities(selectedCities.filter(c => c !== city))
                                }
                              }}
                            />
                            <label htmlFor={`mobile-city-${city}`} className="text-sm">
                              {city}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Rating */}
                    <div>
                      <h4 className="font-medium mb-2">Minimum Rating</h4>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Slider
                          min={0}
                          max={5}
                          step={0.5}
                          value={[minRating]}
                          onValueChange={(value) => setMinRating(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm w-8">{minRating}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <Slider
                        min={0}
                        max={priceRange[1]}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Team Size */}
                    <div>
                      <h4 className="font-medium mb-2">Team Size</h4>
                      <Slider
                        min={0}
                        max={teamSizeRange[1]}
                        step={1}
                        value={teamSizeRange}
                        onValueChange={(value) => setTeamSizeRange(value as [number, number])}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{teamSizeRange[0]} people</span>
                        <span>{teamSizeRange[1]} people</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Online Only */}
                    <div>
                      <h4 className="font-medium mb-2">Business Mode</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mobile-online-only"
                            checked={onlineOnly === true}
                            onCheckedChange={(checked) => setOnlineOnly(checked ? true : null)}
                          />
                          <label htmlFor="mobile-online-only" className="text-sm">
                            Online Only
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mobile-physical"
                            checked={onlineOnly === false}
                            onCheckedChange={(checked) => setOnlineOnly(checked ? false : null)}
                          />
                          <label htmlFor="mobile-physical" className="text-sm">
                            Physical Location
                          </label>
                        </div>
                      </div>
                    </div>

                    {allTags.length > 0 && (
                      <>
                        <Separator />
                        {/* Tags */}
                        <div>
                          <h4 className="font-medium mb-2">Service Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                              <Badge
                                key={tag}
                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => {
                                  if (selectedTags.includes(tag)) {
                                    setSelectedTags(selectedTags.filter(t => t !== tag))
                                  } else {
                                    setSelectedTags([...selectedTags, tag])
                                  }
                                }}
                              >
                                {tag}
                                {selectedTags.includes(tag) && (
                                  <X className="h-3 w-3 ml-1" />
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="pt-4">
                      <Button
                        onClick={resetFilters}
                        variant="outline"
                        className="w-full"
                      >
                        Reset All Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-9 w-9 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-9 w-9 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sort By Dropdown - Mobile */}
            <div className="lg:hidden">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Sort and Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {filteredBusinesses.length} {filteredBusinesses.length === 1 ? "Business" : "Businesses"} Found
                </h2>
                <div className="hidden lg:block">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading businesses</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {!isLoading && !error && filteredBusinesses.length === 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Grid View */}
              {!isLoading && !error && filteredBusinesses.length > 0 && viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBusinesses.map((business) => (
                    <Link key={business._id} href={`/business/${business._id}`}>
                      <Card className="h-full transition-all hover:shadow-md hover:border-purple-200 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col h-full">
                            {/* Business Image */}
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                              {business.thumbnail ? (
                                <img
                                  src={business.thumbnail}
                                  alt={business.brandName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                  <span>No Image</span>
                                </div>
                              )}
                            </div>

                            {/* Business Info */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold line-clamp-1">{business.brandName}</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-sm font-medium">
                                    {business.avgReview ? business.avgReview.toFixed(1) : 0} ({business.reviewCount})
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{business.about}</p>

                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="line-clamp-1">
                                  {business.address.city}, {business.address.state}
                                </span>
                              </div>

                              {/* Price Range */}
                              <div className="mt-auto">
                                <div className="text-sm text-gray-600 mb-2">
                                  {business.serviceCategories?.length > 0 && (
                                    <span>
                                      From ${Math.min(...business.serviceCategories.map(c => c.price))}
                                    </span>
                                  )}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                  {business.serviceCategories?.slice(0, 3).map((category) => (
                                    <Badge key={category.title} variant="outline" className="text-xs">
                                      {category.title}
                                    </Badge>
                                  ))}
                                  {business.serviceCategories?.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{business.serviceCategories.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* List View */}
              {!isLoading && !error && filteredBusinesses.length > 0 && viewMode === "list" && (
                <div className="space-y-4">
                  {filteredBusinesses.map((business) => (
                    <Link key={business._id} href={`/customer/business/${business._id}`}>
                      <Card className="transition-all hover:shadow-md hover:border-purple-200 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Business Image */}
                            <div className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-gray-100">
                              {business.thumbnail ? (
                                <img
                                  src={business.thumbnail}
                                  alt={business.brandName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                  <span>No Image</span>
                                </div>
                              )}
                            </div>

                            {/* Business Info */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{business.brandName}</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-sm font-medium">
                                     {business.avgReview ? business.avgReview.toFixed(1) : 0} ({business.reviewCount})
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{business.about}</p>

                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>
                                    {business.address.city}, {business.address.state}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                                    {business.isOnlineOnly ? "Online Only" : "Physical Location"}
                                  </span>
                                </div>
                              </div>

                              {/* Price and Tags */}
                              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                                <div className="text-sm text-gray-600">
                                  {business.serviceCategories?.length > 0 && (
                                    <span>
                                      From ${Math.min(...business.serviceCategories.map(c => c.price))}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {business.serviceCategories?.slice(0, 5).map((category) => (
                                    <Badge key={category.title} variant="outline" className="text-xs">
                                      {category.title}
                                    </Badge>
                                  ))}
                                  {business.serviceCategories?.length > 5 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{business.serviceCategories.length - 5} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}