"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, Home, CalendarClock, History, User, X } from "lucide-react"
import HeaderForCustomer from "./HeaderForCustomer"

const sidebarLinks = [
  { label: "Dashboard", path: "/customer/home", icon: Home },
  { label: "Appointments", path: "/customer/appointments", icon: CalendarClock },
  { label: "History", path: "/customer/history", icon: History },
  { label: "Profile", path: "/customer/profile", icon: User },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/customer/auth/login"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={closeMobileMenu} />
      )}

      {/* Hoverable Area for Desktop */}
      <div
        className="fixed left-0 top-0 h-full w-4 z-20 hidden lg:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-40",
          // Mobile behavior
          "lg:z-10",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop behavior
          "lg:translate-x-0",
          isHovered || isOpen || isMobileMenuOpen ? "w-64" : "w-20",
          "lg:w-64", // Always expanded on large screens
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col py-6 px-4 space-y-6 overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white p-2 rounded-lg flex-shrink-0">
                <Home className="h-5 w-5" />
              </div>
              {(isHovered || isOpen || isMobileMenuOpen) && (
                <div className="text-lg font-bold text-black whitespace-nowrap">
                  {`Welcome ${user?.firstName}` || "Welcome"}
                </div>
              )}
            </div>

            {/* Close button for mobile */}
            <Button variant="ghost" size="sm" onClick={closeMobileMenu} className="lg:hidden p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link key={link.path} href={link.path} onClick={closeMobileMenu}>
                  <div
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.path
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {(isHovered || isOpen || isMobileMenuOpen) && (
                      <span className="whitespace-nowrap">{link.label}</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Collapse Button - Desktop only */}
          <div className="mt-auto hidden lg:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-8 h-8 ml-auto mr-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <HeaderForCustomer onMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            // Desktop margin
            "lg:ml-64",
            // Mobile - no margin when sidebar is closed
            isHovered || isOpen ? "lg:ml-64" : "lg:ml-20",
          )}
        >
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
