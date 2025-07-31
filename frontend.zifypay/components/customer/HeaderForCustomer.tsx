"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { logout, isAuthenticated, getUserData } from "@/lib/auth"
import { Menu, X } from "lucide-react"

function HeaderForCustomer({
  showView,
  onMenuToggle,
  isMobileMenuOpen,
}: {
  showView?: boolean
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userFirstName, setUserFirstName] = useState("")
  const [profilePicUrl, setProfilePicUrl] = useState("https://placehold.co/150x150?text=Profile+Pic")
  const [businessProfile, setBusinessProfile] = useState<string | null>(null)

  useEffect(() => {
    const businessProfile = localStorage.getItem("businessProfile")
    setBusinessProfile(businessProfile)
    const checkAuth = () => {
      const loggedIn = isAuthenticated()
      setIsLoggedIn(loggedIn)
      if (loggedIn) {
        const userData = getUserData()
        if (userData) {
          setUserFirstName(userData.firstName || "User")
          setProfilePicUrl(userData.profilePicUrl || "")
        }
      }
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [])

  const handleLogout = () => {
    logout()
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    setIsLoggedIn(false)
    window.location.href = "/customer/auth/login"
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Menu button (mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle - only show on mobile */}
            {onMenuToggle && (
              <Button variant="ghost" size="sm" onClick={onMenuToggle} className="lg:hidden p-2">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
                alt="Logo"
                className="h-8 w-auto sm:h-9"
              />
            </Link>
          </div>

          {/* Right side: Navigation and Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isLoggedIn ? (
              <>
                {/* View Businesses Button */}
                <Link href="/customer/home" className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    View Businesses
                  </Button>
                </Link>

                {/* Mobile View Businesses Button */}
                <Link href="/customer/home" className="sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200 px-3 text-xs"
                  >
                    Businesses
                  </Button>
                </Link>

                {!businessProfile && (
                  <>
                    {/* User greeting - hidden on small screens */}
                    <div className="hidden md:flex items-center gap-2">
                      <span className="text-gray-700 font-medium text-sm">Hi, {userFirstName}</span>
                      <img
                        src={profilePicUrl || "/placeholder.svg"}
                        alt="Profile Picture"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>

                    {/* Profile pic only on mobile */}
                    <div className="md:hidden">
                      <img
                        src={profilePicUrl || "/placeholder.svg"}
                        alt="Profile Picture"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>

                    {/* Logout Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 px-3 text-xs sm:text-sm sm:px-4 bg-transparent"
                      onClick={handleLogout}
                    >
                      <span className="hidden sm:inline">Logout</span>
                      <span className="sm:hidden">Out</span>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {/* View Businesses Button - Not logged in */}
                <Link href="/businesses" className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    View Businesses
                  </Button>
                </Link>

                {/* Mobile View Businesses Button */}
                <Link href="/businesses" className="sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200 px-3 text-xs"
                  >
                    Businesses
                  </Button>
                </Link>

                {/* Login Button */}
                <Link href="/customer/auth/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 rounded-full text-blue-800 hover:bg-blue-50 px-3 text-xs sm:text-sm sm:px-4 bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderForCustomer
