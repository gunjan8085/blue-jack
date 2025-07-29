"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { API_URL } from "@/lib/const"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface BusinessStatusCheckerProps {
  showMessage?: boolean
  children?: React.ReactNode
}

const BusinessStatusChecker = ({ showMessage = true, children }: BusinessStatusCheckerProps) => {
  const [isActive, setIsActive] = useState<boolean | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const checkBusinessStatus = async () => {
      try {
        const businessProfile = localStorage.getItem("businessProfile")
        if (!businessProfile) {
          setIsActive(false)
          setStatus(null)
          return
        }

        const businessId = JSON.parse(businessProfile)._id
        const res = await fetch(`${API_URL}/business/active-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId }),
        })

        const data = await res.json()
        const matchedBusiness = data.businesses?.[0]
        const active = matchedBusiness?.isActive ?? false
        const bizStatus = matchedBusiness?.status ?? null

        setIsActive(active)
        setStatus(bizStatus)

        if (!active && showMessage) {
          toast({
            title: "Business not active",
            description: "Payment is required to activate your business.",
            variant: "destructive",
          })
        }

        if (bizStatus === "deactivated" && showMessage) {
          toast({
            title: "Business deactivated",
            description: "Your account has been deactivated by the admin. Contact support.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching business status", error)
        setIsActive(false)
        setStatus(null)
      }
    }

    checkBusinessStatus()
  }, [showMessage, toast])

  if (isActive === null && status === null) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-sm text-gray-600">Checking business status...</span>
      </div>
    )
  }

  return (
    <>
      {/* Check for admin deactivation first */}
      {status === "deactivated" && showMessage && (
        <Alert variant="destructive" className="mx-4 mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your account has been <strong>deactivated</strong> by the admin. Please contact support.
          </AlertDescription>
        </Alert>
      )}

      {/* Check for inactive status */}
      {!isActive && status !== "deactivated" && showMessage && (
        <Alert className="mx-4 mt-4 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Your business is not active. Please go to{" "}
            <Link href="/dashboard/payments" className="underline text-yellow-700 hover:text-yellow-900 font-medium">
              Payments
            </Link>{" "}
            to activate your account.
          </AlertDescription>
        </Alert>
      )}

      {isActive && status === "active" && showMessage && (
        <Alert className="mx-4 mt-4 border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Your business is active and ready to accept payments.
          </AlertDescription>
        </Alert>
      )}

      {children}
    </>
  )
}

export default BusinessStatusChecker
