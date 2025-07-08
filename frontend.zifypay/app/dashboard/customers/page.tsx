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
import AppSidebar from "@/components/for-bussiness/AppSidebar"
import { API_URL } from "@/lib/const"

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  favoriteService: string;
}

interface ApiResponse {
  success: boolean;
  data: Customer[];
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent") // recent, name, visits, spent
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${API_URL}/appointments/68652722209db192d721ad57/visit-history`)
        const data: ApiResponse = await response.json()
        
        if (data.success) {
          setCustomers(data.data)
        } else {
          setError('Failed to fetch customers')
        }
      } catch (err) {
        setError('Error fetching customers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  }).sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "visits":
        return b.totalVisits - a.totalVisits
      case "spent":
        return b.totalSpent - a.totalSpent
      case "recent":
      default:
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    }
  })

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-full">
            <p>Loading customers...</p>
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
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600">Manage your customer relationships</p>
            </div>
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
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent Activity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="visits">Most Visits</SelectItem>
                    <SelectItem value="spent">Highest Spent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customers List */}
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                       
                        <div className="text-sm text-purple-600">{customer.favoriteService}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            {/* <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              View Details
                            </Button> */}
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarFallback>
                                      {selectedCustomer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                                    <p className="text-purple-600">{selectedCustomer.favoriteService}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Email</Label>
                                    <p>{selectedCustomer.email}</p>
                                  </div>
                                  <div>
                                    <Label>Phone</Label>
                                    <p>{selectedCustomer.phone}</p>
                                  </div>
                                  <div>
                                    <Label>Last Visit</Label>
                                    <p>{new Date(selectedCustomer.lastVisit).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <Label>Total Visits</Label>
                                    <p>{selectedCustomer.totalVisits}</p>
                                  </div>
                                  <div>
                                    <Label>Total Spent</Label>
                                    <p>${selectedCustomer.totalSpent}</p>
                                  </div>
                                  <div>
                                    <Label>Favorite Service</Label>
                                    <p>{selectedCustomer.favoriteService}</p>
                                  </div>
                                </div>
                                
                                {selectedCustomer.notes && (
                                  <div>
                                    <Label>Notes</Label>
                                    <Textarea 
                                      className="mt-1" 
                                      value={selectedCustomer.notes} 
                                      readOnly
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>

                  {customer.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Notes:</strong> {customer.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or add new customers</p>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Customer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}