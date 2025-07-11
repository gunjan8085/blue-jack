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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import AppSidebar from "@/components/for-bussiness/AppSidebar"

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
  profilePicUrl?: string
  dob?: string
  additionalPhoneNumber?: string
  country?: string
  emergencyContacts?: {
    name: string
    relationship: string
    email: string
    phoneNumber: string
  }[]
  isAvailableForNewJob?: boolean
}

// Create employee payload interface
interface CreateEmployeePayload {
  name: string
  email: string
  authType: string
  password?: string
  phoneNumber: string
  additionalPhoneNumber?: string
  jobTitle: string
  startDate: string
  dob?: string
  country?: string
  servicesProvided: string[]
  allowCalendarBooking: boolean
  profilePicUrl?: string
  emergencyContacts?: {
    name: string
    relationship: string
    email: string
    phoneNumber: string
  }[]
  isAvailableForNewJob?: boolean
}

export default function StaffPage() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [jobTitleFilter, setJobTitleFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [creatingEmployee, setCreatingEmployee] = useState(false)
  const [updatingEmployee, setUpdatingEmployee] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [emergencyContacts, setEmergencyContacts] = useState<{
    name: string
    relationship: string
    email: string
    phoneNumber: string
  }[]>([])
  const router = useRouter()

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
    isAvailableForNewJob: true,
    profilePicUrl: undefined,
  })

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)

      try {
        setUploadingImage(true)
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_URL}/business/upload-thumbnail`, {
          method: 'POST',
          headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
          body: formData,
        })

        const data = await res.json()

        if (!res.ok || !data.url) {
          throw new Error(data.message || 'Upload failed')
        }

        // Update the appropriate state based on whether we're creating or editing
        if (isEditDialogOpen && selectedEmployee) {
          setSelectedEmployee({ ...selectedEmployee, profilePicUrl: data.url })
        } else {
          setNewEmployee({ ...newEmployee, profilePicUrl: data.url })
        }

        setProfilePicPreview(data.url)
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        })
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        })
      } finally {
        setUploadingImage(false)
      }
    }
  }

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
        // Filter out owners from the employee list
        setEmployees(data.data.filter((emp: Employee) => !emp.isOwner))
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

      const payload = {
        ...newEmployee,
        emergencyContacts: emergencyContacts.length > 0 ? emergencyContacts : undefined,
        servicesProvided: [], // Ensure this is always empty array
      }
      const response = await fetch(`${API_URL}/employee/${businessId}/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to create staff. Please log in as a business owner.",
            variant: "destructive",
          });
          router.push('/auth/login');
          return;
        }

        if (response.status === 500) {
          if (data.message.includes('E11000 duplicate key error') && data.message.includes('email_1')) {
            setError("An employee with this email already exists. Please use a different email.");
          } else {
            setError("Failed to create employee due to a server error. Please try again.");
          }
          return;
        }

        // Handle other 4xx errors
        if (response.status >= 400 && response.status < 500) {
          setError(data.message || "Invalid request. Please check your input and try again.");
          return;
        }
      }


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
          isAvailableForNewJob: true,
        })
        setEmergencyContacts([])
        setProfilePicPreview(null)
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

  // Update employee
  const updateEmployee = async () => {
    if (!selectedEmployee) return

    try {
      setUpdatingEmployee(true)
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

      const payload = {
        ...selectedEmployee,
        emergencyContacts: emergencyContacts.length > 0 ? emergencyContacts : undefined,
        servicesProvided: [], // Ensure this is always empty array
      }

      const response = await fetch(`${API_URL}/employee/${selectedEmployee._id}/update`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.status === 401 || response.status === 403) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to update staff.",
          variant: "destructive",
        })
        return
      }

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Employee updated successfully",
        })
        setIsEditDialogOpen(false)
        fetchEmployees() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update employee",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating employee:", error)
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive",
      })
    } finally {
      setUpdatingEmployee(false)
    }
  }

  // Open edit dialog with employee data
  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setEmergencyContacts(employee.emergencyContacts || [])
    setProfilePicPreview(employee.profilePicUrl || null)
    setIsEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false)
    setProfilePicPreview(null)
  }

  // When closing the create dialog, reset the preview
  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false)
    setProfilePicPreview(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const businessProfile = localStorage.getItem('businessProfile');
    if (!token || !businessProfile) {
      router.push('/auth/login');
    }
  }, []);

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

  const handleUpdateEmployee = () => {
    if (!selectedEmployee?.name || !selectedEmployee?.email || !selectedEmployee?.phoneNumber || !selectedEmployee?.jobTitle) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    updateEmployee()
  }

  const addEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { name: "", relationship: "", email: "", phoneNumber: "" }
    ])
  }

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    }
    setEmergencyContacts(updatedContacts)
  }

  const removeEmergencyContact = (index: number) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts.splice(index, 1)
    setEmergencyContacts(updatedContacts)
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
              <DialogContent className="max-w-2xl" onInteractOutside={handleCreateDialogClose}>
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                {error && (<p className="text-red-500">{error}</p>)}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      {/* Basic Information */}
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
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newEmployee.startDate}
                          onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="space-y-4">
                      <div>
                        <Label>Profile Picture</Label>
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="h-20 w-20">
                              {profilePicPreview ? (
                                <AvatarImage src={profilePicPreview} />
                              ) : (
                                <AvatarFallback>
                                  {newEmployee.name ? newEmployee.name.charAt(0) : "U"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            {uploadingImage && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              </div>
                            )}
                          </div>
                          <div>
                            <input
                              type="file"
                              id="profilePic"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Label htmlFor="profilePic" className="cursor-pointer">
                              <Button variant="outline" asChild>
                                <span>{profilePicPreview ? "Change" : "Upload"} Image</span>
                              </Button>
                            </Label>
                            {profilePicPreview && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 mt-2"
                                onClick={() => {
                                  setProfilePicPreview(null)
                                  setNewEmployee({ ...newEmployee, profilePicUrl: undefined })
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
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
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={newEmployee.dob || ""}
                          onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-2 pt-4">
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
                          <AvatarImage src={employee.profilePicUrl || "/placeholder.svg"} />
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
                                <div className="flex justify-center">
                                  <Avatar className="h-20 w-20">
                                    <AvatarImage src={selectedEmployee.profilePicUrl || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {selectedEmployee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
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
                                {selectedEmployee.dob && (
                                  <div>
                                    <Label>Date of Birth</Label>
                                    <p className="text-sm text-gray-600">{new Date(selectedEmployee.dob).toLocaleDateString()}</p>
                                  </div>
                                )}
                                {selectedEmployee.country && (
                                  <div>
                                    <Label>Country</Label>
                                    <p className="text-sm text-gray-600">{selectedEmployee.country}</p>
                                  </div>
                                )}
                                <div>
                                  <Label>Email Verified</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.isEmailVerified ? "Yes" : "No"}</p>
                                </div>
                                <div>
                                  <Label>Role</Label>
                                  <p className="text-sm text-gray-600">{selectedEmployee.isOwner ? "Owner" : "Employee"}</p>
                                </div>
                                {selectedEmployee.emergencyContacts && selectedEmployee.emergencyContacts.length > 0 && (
                                  <div>
                                    <Label>Emergency Contacts</Label>
                                    <div className="space-y-2 mt-2">
                                      {selectedEmployee.emergencyContacts.map((contact, index) => (
                                        <div key={index} className="border p-2 rounded">
                                          <p className="text-sm font-medium">{contact.name} ({contact.relationship})</p>
                                          <p className="text-xs text-gray-600">{contact.email}</p>
                                          <p className="text-xs text-gray-600">{contact.phoneNumber}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(employee)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {/* <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button> */}
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

        {/* Edit Employee Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl" onInteractOutside={handleCreateDialogClose}>
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {/* Basic Information */}
                    <div>
                      <Label htmlFor="edit-name">Full Name *</Label>
                      <Input
                        id="edit-name"
                        value={selectedEmployee.name}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email *</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={selectedEmployee.email}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-phone">Phone Number *</Label>
                      <Input
                        id="edit-phone"
                        value={selectedEmployee.phoneNumber}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phoneNumber: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-startDate">Start Date</Label>
                      <Input
                        id="edit-startDate"
                        type="date"
                        value={selectedEmployee.startDate || ""}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, startDate: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="space-y-4">
                    <div>
                      <Label>Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20">
                            {profilePicPreview ? (
                              <AvatarImage src={profilePicPreview} />
                            ) : (
                              <AvatarFallback>
                                {selectedEmployee.name ? selectedEmployee.name.charAt(0) : "U"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          {uploadingImage && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            id="edit-profilePic"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Label htmlFor="edit-profilePic" className="cursor-pointer">
                            <Button variant="outline" asChild>
                              <span>{profilePicPreview ? "Change" : "Upload"} Image</span>
                            </Button>
                          </Label>
                          {profilePicPreview && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 mt-2"
                              onClick={() => {
                                setProfilePicPreview(null)
                                setSelectedEmployee({ ...selectedEmployee, profilePicUrl: undefined })
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="edit-jobTitle">Job Title *</Label>
                      <Select
                        value={selectedEmployee.jobTitle}
                        onValueChange={(value) => setSelectedEmployee({ ...selectedEmployee, jobTitle: value })}
                      >
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
                      <Label htmlFor="edit-dob">Date of Birth</Label>
                      <Input
                        id="edit-dob"
                        type="date"
                        value={selectedEmployee.dob || ""}
                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div>
                  <Label>Emergency Contacts</Label>
                  <div className="space-y-3 mt-2">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="border p-3 rounded-lg space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={contact.name}
                              onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                              placeholder="Full name"
                            />
                          </div>
                          <div>
                            <Label>Relationship</Label>
                            <Input
                              value={contact.relationship}
                              onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}
                              placeholder="Relationship"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Email</Label>
                            <Input
                              value={contact.email}
                              onChange={(e) => updateEmergencyContact(index, "email", e.target.value)}
                              placeholder="Email"
                              type="email"
                            />
                          </div>
                          <div>
                            <Label>Phone Number</Label>
                            <Input
                              value={contact.phoneNumber}
                              onChange={(e) => updateEmergencyContact(index, "phoneNumber", e.target.value)}
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => removeEmergencyContact(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove Contact
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addEmergencyContact}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Emergency Contact
                    </Button>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700"
                    onClick={handleUpdateEmployee}
                    disabled={updatingEmployee}
                  >
                    {updatingEmployee ? "Updating..." : "Update Employee"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}