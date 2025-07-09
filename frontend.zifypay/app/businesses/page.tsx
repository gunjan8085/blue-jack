"use client"
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
}

export default function BusinessListingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  // Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/business/getAllBusiness`)
        const result: ApiResponse = await response.json()
        setBusinesses(result.data)
        setFilteredBusinesses(result.data)
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
        setError('Failed to fetch businesses')
        console.error('Error fetching businesses:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

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
      const matchesPrice = business.serviceCategories?.some(cat =>
        cat.price >= priceRange[0] && cat.price <= priceRange[1]
      ) ?? false

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
        selectedTags.some(tag =>
          business.serviceCategories?.some(cat =>
            cat.tags?.includes(tag)
          )
        )

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
    setPriceRange([0, Math.max(...businesses.flatMap(b => b.serviceCategories?.map(c => c.price) || [1000]))])
    setTeamSizeRange([0, Math.max(...businesses.flatMap(b => [b.teamSize.min, b.teamSize.max]) || [50])])
    setOnlineOnly(null)
    setSelectedTags([])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Business Type */}
      <div>
        <h3 className="font-semibold mb-3">Business Type</h3>
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

      <Separator />

      {/* Cities */}
      <div>
        <h3 className="font-semibold mb-3">Cities</h3>
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

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
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


      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Service Tags</h3>
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <HeaderForCustomer />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="h-5 w-5 text-purple-600" />
                    <h2 className="text-lg font-semibold">Filters</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Reset all
                  </Button>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">{filteredBusinesses.length} businesses found</h1>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center space-x-2">
                        <SlidersHorizontal className="h-5 w-5 text-purple-600" />
                        <span>Filters</span>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                      <div className="mt-6">
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
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search businesses..."
                    className="pl-9 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
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
            </div>

            {/* Active Filters */}
            {(selectedBusinessTypes.length > 0 ||
              selectedCities.length > 0 ||
              minRating > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < Math.max(...businesses.flatMap(b => b.serviceCategories?.map(c => c.price) || [1000])) ||
              teamSizeRange[0] > 0 ||
              teamSizeRange[1] < Math.max(...businesses.flatMap(b => [b.teamSize.min, b.teamSize.max]) || [50]) ||
              onlineOnly !== null ||
              selectedTags.length > 0) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedBusinessTypes.map(type => (
                      <Badge key={type} className="flex items-center gap-1">
                        {type}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedBusinessTypes(selectedBusinessTypes.filter(t => t !== type))}
                        />
                      </Badge>
                    ))}
                    {selectedCities.map(city => (
                      <Badge key={city} className="flex items-center gap-1">
                        {city}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedCities(selectedCities.filter(c => c !== city))}
                        />
                      </Badge>
                    ))}
                    {minRating > 0 && (
                      <Badge className="flex items-center gap-1">
                        Rating ≥ {minRating}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setMinRating(0)}
                        />
                      </Badge>
                    )}
                    {(priceRange[0] > 0 || priceRange[1] < Math.max(...businesses.flatMap(b => b.serviceCategories?.map(c => c.price) || [1000]))) && (
                      <Badge className="flex items-center gap-1">
                        ${priceRange[0]} - ${priceRange[1]}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setPriceRange([0, Math.max(...businesses.flatMap(b => b.serviceCategories?.map(c => c.price) || [1000]))])}
                        />
                      </Badge>
                    )}
                    {(teamSizeRange[0] > 0 || teamSizeRange[1] < Math.max(...businesses.flatMap(b => [b.teamSize.min, b.teamSize.max]) || [50])) && (
                      <Badge className="flex items-center gap-1">
                        Team: {teamSizeRange[0]} - {teamSizeRange[1]}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setTeamSizeRange([0, Math.max(...businesses.flatMap(b => [b.teamSize.min, b.teamSize.max]) || [50])])}
                        />
                      </Badge>
                    )}
                    {onlineOnly !== null && (
                      <Badge className="flex items-center gap-1">
                        {onlineOnly ? "Online Only" : "Physical Location"}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setOnlineOnly(null)}
                        />
                      </Badge>
                    )}
                    {selectedTags.map(tag => (
                      <Badge key={tag} className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                        />
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading businesses...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <AlertCircle className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Businesses</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            )}

            {/* Business Grid/List */}
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
                      {business.isOnlineOnly && (
                        <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                          Online Only
                        </Badge>
                      )}
                    </div>
                    <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{business.brandName}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           {business.avgReview ? business.avgReview.toFixed(1) : 0} ({business.reviewCount})
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
                        {business.serviceCategories?.slice(0, 3).map((category) => (
                          <Badge key={category.title} variant="secondary" className="bg-purple-100 text-purple-700">
                            {category.title} (${category.price})
                          </Badge>
                        ))}
                        {business.serviceCategories?.length > 3 && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            +{business.serviceCategories.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {business.serviceCategories?.[0]?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {business.serviceCategories[0].tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

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
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}