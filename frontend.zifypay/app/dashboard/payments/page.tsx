"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/const"
import AppSidebar from "@/components/for-bussiness/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  Eye,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Payment = {
  transactionId: string
  amount: number
  date: string
  status: "success" | "failed" | "pending"
  customerName: string
  customerNumber: string
  customerEmail: string
  paymentMethod: "card" | "bank_transfer" | "cash"
}

type PaymentAccount = {
  NAME: string
  CUST_NBR: string
  MERCH_NBR: string
  DBA_NBR: string
  TERMINAL_NBR: string
}

function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filtered, setFiltered] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [setupLoading, setSetupLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [method, setMethod] = useState("")
  const [status, setStatus] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerNumber, setCustomerNumber] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [businessId, setBussinessId] = useState("")
  const [account, setAccount] = useState<PaymentAccount>({
    NAME: "NORTH",
    CUST_NBR: "",
    MERCH_NBR: "",
    DBA_NBR: "",
    TERMINAL_NBR: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [accountStatus, setAccountStatus] = useState<{
    isConnected: boolean
    account: PaymentAccount | null
  }>({ isConnected: false, account: null })
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [updateMode, setUpdateMode] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const businessId = localStorage.getItem("businessId")
    if (businessId == null) {
      router.push("/login")
      return
    }
    setBussinessId(businessId)

    // Check account status first, then fetch payments
    checkAccountStatus(businessId).then(() => {
      fetchPayments(businessId)
    })
  }, [])

  const fetchPayments = async (businessId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/payments/history/${businessId}`)
      const data = await response.json()
      setPayments(data.data || [])
      toast({
        title: "Success",
        description: "Payment history loaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load payment history",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const checkAccountStatus = async (businessId: string) => {
    try {
      setCheckingStatus(true)
      const response = await fetch(`${API_URL}/payments/account-status/${businessId}`)
      const data = await response.json()

      if (data.success) {
        setAccountStatus({
          isConnected: data.isConnected,
          account: data.account,
        })

        if (data.isConnected && data.account) {
          setAccount(data.account)
          setUpdateMode(true)
        }

        toast({
          title: "Account Status",
          description: data.message,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check account status",
        variant: "destructive",
      })
    } finally {
      setCheckingStatus(false)
    }
  }

  const handleAccountUpdate = async (e: React.FormEvent) => {
    // TODO : ask in alert before updating if user wants to uodate the account
    // if yes then proceed with update other wise return
    const yes = window.confirm("Are you sure you want to update the payment account?") 
    if (!yes) return;
    e.preventDefault()
    setSetupLoading(true)

    try {
      const res = await fetch(`${API_URL}/payments/update-payment-account/${businessId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      })
      const data = await res.json()

      if (data.success) {
        setAccountStatus({
          isConnected: true,
          account: data.account,
        })
        toast({
          title: "Success",
          description: "Payment account updated successfully",
        })
        // Refresh account status
        await checkAccountStatus(businessId)
      } else {
        throw new Error(data.message || "Update failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update payment account",
        variant: "destructive",
      })
    } finally {
      setSetupLoading(false)
    }
  }

  const disconnectAccount = async () => {
    try {
      setSetupLoading(true)
      // Reset account to empty values for disconnection
      const emptyAccount = {
        NAME: "NORTH",
        CUST_NBR: "",
        MERCH_NBR: "",
        DBA_NBR: "",
        TERMINAL_NBR: "",
      }

      const res = await fetch(`${API_URL}/payments/update-payment-account/${businessId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emptyAccount),
      })

      const data = await res.json()
      if (data.success) {
        setAccount(emptyAccount)
        setAccountStatus({ isConnected: false, account: null })
        setUpdateMode(false)
        toast({
          title: "Success",
          description: "Payment account disconnected successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect account",
        variant: "destructive",
      })
    } finally {
      setSetupLoading(false)
    }
  }

  useEffect(() => {
    let result = payments

    if (search) {
      result = result.filter(
        (p) =>
          p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
          p.customerName.toLowerCase().includes(search.toLowerCase()) ||
          p.customerNumber.includes(search) ||
          p.customerEmail.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (dateRange.from && dateRange.to) {
      result = result.filter((p) => {
        const d = new Date(p.date)
        return d >= new Date(dateRange.from) && d <= new Date(dateRange.to)
      })
    }

    if (method) result = result.filter((p) => p.paymentMethod === method)
    if (status) result = result.filter((p) => p.status === status)
    if (customerName) result = result.filter((p) => p.customerName.toLowerCase().includes(customerName.toLowerCase()))
    if (customerNumber) result = result.filter((p) => p.customerNumber.includes(customerNumber))
    if (customerEmail)
      result = result.filter((p) => p.customerEmail.toLowerCase().includes(customerEmail.toLowerCase()))
    if (amount) result = result.filter((p) => p.amount === Number(amount))

    setFiltered(result)
    setCurrentPage(1)
  }, [payments, search, dateRange, method, status, customerName, customerNumber, customerEmail, amount])

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSetupLoading(true)

    checkAccountStatus
    try {
      const res = await fetch(`${API_URL}/payments/setup-payment-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, paymentGatewayData: account }),
      })
      const data = await res.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Payment account setup completed successfully",
        })
      await  checkAccountStatus(businessId)
      } else {
        throw new Error(data.message || "Setup failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to setup payment account",
        variant: "destructive",
      })
    } finally {
      setSetupLoading(false)
    }
  }

  const clearFilters = () => {
    setSearch("")
    setDateRange({ from: "", to: "" })
    setMethod("")
    setStatus("")
    setCustomerName("")
    setCustomerNumber("")
    setCustomerEmail("")
    setAmount("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "bank_transfer":
        return <Building2 className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "failed":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Calculate stats
  const totalAmount = filtered.reduce((sum, p) => sum + p.amount, 0)
  const successfulPayments = filtered.filter((p) => p.status === "success").length
  const pendingPayments = filtered.filter((p) => p.status === "pending").length
  const failedPayments = filtered.filter((p) => p.status === "failed").length

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = filtered.slice(startIndex, endIndex)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Payments Dashboard</h2>
              <p className="text-muted-foreground">Manage your payment accounts and view transaction history</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => fetchPayments(businessId)} disabled={loading}>
                <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From {filtered.length} transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{successfulPayments}</div>
                <p className="text-xs text-muted-foreground">
                  {filtered.length > 0 ? Math.round((successfulPayments / filtered.length) * 100) : 0}% success rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingPayments}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{failedPayments}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Account Setup */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Zifypay Merchant Account
                    {checkingStatus ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Badge variant={accountStatus.isConnected ? "default" : "secondary"}>
                        {accountStatus.isConnected ? "Connected" : "Not Connected"}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {accountStatus.isConnected
                      ? "Your payment gateway is configured and ready to accept payments"
                      : "Configure your payment gateway credentials to start accepting payments"}
                  </CardDescription>
                </div>
                {accountStatus.isConnected && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => checkAccountStatus(businessId)}
                      disabled={checkingStatus}
                    >
                      <RefreshCw className={cn("h-4 w-4 mr-2", checkingStatus && "animate-spin")} />
                      Refresh Status
                    </Button>
                    <Button variant="destructive" size="sm" onClick={disconnectAccount} disabled={setupLoading}>
                      Disconnect
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {checkingStatus ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {accountStatus.isConnected && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Account Connected Successfully</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your payment account is active and ready to process transactions.
                      </p>
                    </div>
                  )}

                  <form onSubmit={updateMode ? handleAccountUpdate : handleAccountSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Business Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter business name"
                          value={account.NAME}
                          onChange={(e) => setAccount({ ...account, NAME: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cust-nbr">Customer Number</Label>
                        <Input
                          id="cust-nbr"
                          placeholder="Enter customer number"
                          type="password"
                          value={account.CUST_NBR}
                          onChange={(e) => setAccount({ ...account, CUST_NBR: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="merch-nbr">Merchant Number</Label>
                        <Input
                          id="merch-nbr"
                          type="password"
                          placeholder="Enter merchant number"
                          value={account.MERCH_NBR}
                          onChange={(e) => setAccount({ ...account, MERCH_NBR: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dba-nbr">DBA Number</Label>
                        <Input
                          id="dba-nbr"
                          type="password"
                          placeholder="Enter DBA number"
                          value={account.DBA_NBR}
                          onChange={(e) => setAccount({ ...account, DBA_NBR: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="terminal-nbr">Terminal Number</Label>
                        <Input
                          id="terminal-nbr"
                          type="password"
                          placeholder="Enter terminal number"
                          value={account.TERMINAL_NBR}
                          onChange={(e) => setAccount({ ...account, TERMINAL_NBR: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={setupLoading} className="w-full md:w-auto">
                        {setupLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            {updateMode ? "Updating..." : "Setting up..."}
                          </>
                        ) : (
                          <>
                            <Settings className="mr-2 h-4 w-4" />
                            {updateMode ? "Update Account" : "Setup Account"}
                          </>
                        )}
                      </Button>

                      
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search & Filter Payments
                  </CardTitle>
                  <CardDescription>Find specific transactions using various filters</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide" : "Show"} Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction ID, customer name, number, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={dateRange.from}
                          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                          className="text-sm"
                        />
                        <Input
                          type="date"
                          value={dateRange.to}
                          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Methods" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input
                        placeholder="Filter by amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Customer Name</Label>
                      <Input
                        placeholder="Filter by customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Customer Number</Label>
                      <Input
                        placeholder="Filter by customer number"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Customer Email</Label>
                      <Input
                        placeholder="Filter by customer email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment History Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Payment History
              </CardTitle>
              <CardDescription>
                {filtered.length} transactions found
                {search || method || status || dateRange.from ? " (filtered)" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No payments found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPayments.map((payment) => (
                          <TableRow key={payment.transactionId} className="hover:bg-muted/50">
                            <TableCell>
                              <div className="font-medium">{payment.transactionId}</div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{payment.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  <span>{payment.customerNumber}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  <span>{payment.customerEmail}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold">${payment.amount.toLocaleString()}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getPaymentMethodIcon(payment.paymentMethod)}
                                <span className="capitalize">{payment.paymentMethod.replace("_", " ")}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(payment.status)}
                                className="flex items-center gap-1 w-fit"
                              >
                                {getStatusIcon(payment.status)}
                                <span className="capitalize">{payment.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                {new Date(payment.date).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(payment.date).toLocaleTimeString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-2 py-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length} results
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1
                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-8 h-8 p-0"
                              >
                                {page}
                              </Button>
                            )
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PaymentsPage
