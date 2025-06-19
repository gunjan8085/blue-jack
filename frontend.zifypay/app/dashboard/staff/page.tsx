"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Phone, Mail, Search, Plus, Edit, CheckCircle, XCircle, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { API_URL } from "@/lib/const"
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
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Employee interface
interface Employee {
  _id: string
  name: string
  email: string
  isEmailVerified: boolean
  phoneNumber: string
  isOwner: boolean
  jobTitle: string
  startDate?: string
  servicesProvided?: string[]
  allowCalendarBooking?: boolean
}

// Create employee payload interface
interface CreateEmployeePayload {
  name: string
  email: string
  authType: string
  password: string
  phoneNumber: string
  jobTitle: string
  startDate: string
  servicesProvided: string[]
  allowCalendarBooking: boolean
}
import AppSidebar from "@/components/for-bussiness/AppSidebar"

  
export default function StaffPage() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [jobTitleFilter, setJobTitleFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [creatingEmployee, setCreatingEmployee] = useState(false)

  // Get business ID from localStorage
  const getBusinessId = () => {
    if (typeof window !== 'undefined') {
      const businessProfile = localStorage.getItem('businessProfile')
      if (businessProfile) {
        const parsed = JSON.parse(businessProfile)
        return parsed._id
      }
    }
    return null
  }

  // Form state for creating new employee
  const [newEmployee, setNewEmployee] = useState<CreateEmployeePayload>({
    name: "",
    email: "",
    authType: "password",
    password: "",
    phoneNumber: "",
    jobTitle: "",
    startDate: "",
    servicesProvided: [],
    allowCalendarBooking: true,
  })

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const businessId = getBusinessId()
      
      if (!businessId) {
        toast({
          title: "Error",
          description: "Business profile not found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        toast({
          title: "Error",
          description: "Authentication token not found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${API_URL}/employee/business/${businessId}/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      
      if (data.success) {
        setEmployees(data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching employees:", error)
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Create new employee
  const createEmployee = async () => {
    try {
      setCreatingEmployee(true)
      const businessId = getBusinessId()
      
      if (!businessId) {
        toast({
          title: "Error",
          description: "Business profile not found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        toast({
          title: "Error",
          description: "Authentication token not found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${API_URL}/employee/${businessId}/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEmployee,
          servicesProvided: [], // Ensure this is always empty array
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Employee created successfully",
        })
        setIsCreateDialogOpen(false)
        setNewEmployee({
          name: "",
          email: "",
          authType: "password",
          password: "",
          phoneNumber: "",
          jobTitle: "",
          startDate: "",
          servicesProvided: [],
          allowCalendarBooking: true,
        })
        fetchEmployees() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create employee",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating employee:", error)
      toast({
        title: "Error",
        description: "Failed to create employee",
        variant: "destructive",
      })
    } finally {
      setCreatingEmployee(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJobTitle = jobTitleFilter === "all" || employee.jobTitle === jobTitleFilter

    return matchesSearch && matchesJobTitle
  })

  const getJobTitleColor = (jobTitle: string) => {
    switch (jobTitle.toLowerCase()) {
      case "therapist":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "stylist":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "manager":
        return "bg-green-100 text-green-800 border-green-200"
      case "assistant":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleCreateEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.password || !newEmployee.phoneNumber || !newEmployee.jobTitle) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    createEmployee()
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-gray-600">Manage your team members and their roles</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newEmployee.password}
                      onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phoneNumber}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Select value={newEmployee.jobTitle} onValueChange={(value) => setNewEmployee({ ...newEmployee, jobTitle: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Therapist">Therapist</SelectItem>
                        <SelectItem value="Stylist">Stylist</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Assistant">Assistant</SelectItem>
                        <SelectItem value="Receptionist">Receptionist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEmployee.startDate}
                      onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allowBooking"
                      checked={newEmployee.allowCalendarBooking}
                      onChange={(e) => setNewEmployee({ ...newEmployee, allowCalendarBooking: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="allowBooking">Allow calendar booking</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700"
                      onClick={handleCreateEmployee}
                      disabled={creatingEmployee}
                    >
                      {creatingEmployee ? "Creating..." : "Create Employee"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={jobTitleFilter} onValueChange={setJobTitleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Therapist">Therapist</SelectItem>
                    <SelectItem value="Stylist">Stylist</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Assistant">Assistant</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employees List */}
          <div className="space-y-4">
            {loading ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading employees...</p>
                </CardContent>
              </Card>
            ) : filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <Card key={employee._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                          <Badge className={getJobTitleColor(employee.jobTitle)}>{employee.jobTitle}</Badge>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {employee.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {employee.phoneNumber}
                            </div>
                            {employee.isEmailVerified && (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Verified
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedEmployee(employee)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Employee Details</DialogTitle>
                            </DialogHeader>
                            {selectedEmployee && (
                              <div className="space-y-4">
                                <div>
                                  <Label>Name</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.name}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.phoneNumber}</p>
                                </div>
                                <div>
                                  <Label>Job Title</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.jobTitle}</p>
                                </div>
                                <div>
                                  <Label>Email Verified</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.isEmailVerified ? "Yes" : "No"}</p>
                                </div>
                                <div>
                                  <Label>Role</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.isOwner ? "Owner" : "Employee"}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or add your first employee</p>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-purple-700"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Employee
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
