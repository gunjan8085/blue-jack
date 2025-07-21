"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { logout, isAuthenticated, getUserData } from "@/lib/auth";

function HeaderForCustomer({ showView }: { showView?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://placehold.co/150x150?text=Profile+Pic"
  );
  const [businessProfile, setBusinessProfile] = useState<string | null>(null);

  useEffect(() => {
    const businessProfile = localStorage.getItem("businessProfile");
    setBusinessProfile(businessProfile);
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const userData = getUserData();
        if (userData) {
          setUserFirstName(userData.firstName || "User");
          setProfilePicUrl(userData.profilePicUrl || "");
        }
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    logout();
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setIsLoggedIn(false);
    window.location.href = "/customer/auth/login";
  };

  return (
    <header className=" top-0 z-50  bg-[#fff] ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
            alt="Logo"
            className="h-9 w-auto"
          />
        </Link>
        {/* Right side: View Businesses + Auth Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/customer/home">
                <Button
                  variant="outline"
                  className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200"
                >
                  View Businesses
                </Button>
              </Link>
              {!businessProfile && (
                <>
                  <span className="text-gray-700 font-medium">
                    Hi, {userFirstName}
                    <img
                      src={profilePicUrl}
                      alt="Profile Picture"
                      className="inline-block h-10 w-10 rounded-full ml-2"
                    />
                  </span>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/businesses">
                <Button
                  variant="outline"
                  className="text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-colors duration-200"
                >
                  View Businesses
                </Button>
              </Link>

              <Link href="/customer/auth/login">
                <Button
                  variant="outline"
                  className="border-blue-200 rounded-full text-blue-800 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderForCustomer;
