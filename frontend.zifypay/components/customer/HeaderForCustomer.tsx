'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { logout, isAuthenticated, getUserData } from '@/lib/auth'; // Import auth functions

function HeaderForCustomer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const userData = getUserData();
        if (userData) {
          setUserFirstName(userData.firstName || 'User');
          setProfilePicUrl(userData.profilePicUrl || '');
          setIsCustomer(userData.isCustomer || false);
        }
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth); // Listen for storage changes

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Use the centralized logout function
    // Clear all cookies
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setIsLoggedIn(false);
    window.location.href = '/customer/auth/login';
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
              alt="Logo"
              className="w-min h-10"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/businesses" className="text-gray-600 hover:text-blue-600 transition-colors">
            View Businesses
          </Link>

          {isCustomer && (
            <Link href="/for-bussiness" className="text-gray-600 hover:text-blue-600 transition-colors">
              For Business
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={profilePicUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover border border-gray-300"
                />
                <span className="text-gray-600">Hi, {userFirstName}</span>
              </div>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/customer/auth/login">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/customer/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default HeaderForCustomer;