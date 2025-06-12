"use client"

import { useState } from "react"
import { Search, Filter, Star, MapPin, Clock, SlidersHorizontal, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: "Glow & Go Salon",
    rating: 4.7,
    reviewsCount: 132,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Haircut", "Manicure", "Facial", "Hair Color"],
    location: "Downtown",
    distance: "0.5 miles",
    nextAvailable: "20 mins",
    price: 25,
    priceRange: "From $25",
    workingHours: "9 AM - 7 PM",
    category: "salon",
  },
  {
    id: 2,
    name: "Elite Barbershop",
    rating: 4.9,
    reviewsCount: 89,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Haircut", "Beard Trim", "Hot Towel", "Styling"],
    location: "Midtown",
    distance: "1.2 miles",
    nextAvailable: "1 hour",
    price: 30,
    priceRange: "From $30",
    workingHours: "8 AM - 8 PM",
    category: "barbershop",
  },
  {
    id: 3,
    name: "Zen Spa Retreat",
    rating: 4.8,
    reviewsCount: 156,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Massage", "Facial", "Body Treatment", "Aromatherapy"],
    location: "Uptown",
    distance: "2.1 miles",
    nextAvailable: "45 mins",
    price: 60,
    priceRange: "From $60",
    workingHours: "10 AM - 9 PM",
    category: "spa",
  },
  {
    id: 4,
    name: "Nail Art Studio",
    rating: 4.6,
    reviewsCount: 78,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
    location: "Westside",
    distance: "1.8 miles",
    nextAvailable: "30 mins",
    price: 35,
    priceRange: "From $35",
    workingHours: "9 AM - 6 PM",
    category: "nail-salon",
  },
  {
    id: 5,
    name: "Luxury Hair Lounge",
    rating: 4.9,
    reviewsCount: 203,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Haircut", "Hair Color", "Styling", "Extensions"],
    location: "Downtown",
    distance: "0.8 miles",
    nextAvailable: "2 hours",
    price: 45,
    priceRange: "From $45",
    workingHours: "10 AM - 8 PM",
    category: "salon",
  },
  {
    id: 6,
    name: "Wellness Massage Center",
    rating: 4.7,
    reviewsCount: 124,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Deep Tissue", "Swedish", "Hot Stone", "Reflexology"],
    location: "Eastside",
    distance: "3.2 miles",
    nextAvailable: "1.5 hours",
    price: 70,
    priceRange: "From $70",
    workingHours: "9 AM - 10 PM",
    category: "spa",
  },
]

export default function BusinessListingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)

  const categories = [
    { id: "salon", label: "Hair Salon" },
    { id: "barbershop", label: "Barbershop" },
    { id: "spa", label: "Spa" },
    { id: "nail-salon", label: "Nail Salon" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const applyFilters = () => {
    const filtered = businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(business.category)
      const matchesPrice = business.price >= priceRange[0] && business.price <= priceRange[1]
      const matchesRating = business.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default:
          return 0
      }
    })

    setFilteredBusinesses(filtered)
  }

  // Apply filters whenever dependencies change
  useState(() => {
    applyFilters()
  })

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Service Type</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <label htmlFor={category.id} className="text-sm">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100} min={0} step={5} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                {rating}+ <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={applyFilters} className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
        Apply Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BB</span>
              </div>
              <span className="text-xl font-bold text-gray-900">BookBeauty</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700">
                Get Started
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for services, salons, or spas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 border-2 border-purple-200 focus:border-purple-400 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <SlidersHorizontal className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <FilterContent />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
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
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
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

            {/* Business Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredBusinesses.map((business) => (
                <Card
                  key={business.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 ${viewMode === "list" ? "flex" : ""}`}
                >
                  <div
                    className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : "rounded-t-lg"}`}
                  >
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                    />
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                      Next: {business.nextAvailable}
                    </Badge>
                  </div>
                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{business.rating}</span>
                        <span className="text-sm text-gray-500">({business.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {business.location} • {business.distance}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{business.workingHours}</span>
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
                      <span className="text-lg font-semibold text-purple-600">{business.priceRange}</span>
                      <Link href={`/business/${business.id}`}>
                        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBusinesses.length === 0 && (
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
  )
}
