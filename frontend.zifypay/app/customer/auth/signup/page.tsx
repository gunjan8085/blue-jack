"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthToken, setUserData } from "@/lib/auth";
import { API_URL } from "@/lib/const";
import { UploadCloud, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicUrl: undefined,
    phoneNumber: "",
    country: "",
    favourites: [],
    recentlyViewed: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check for token in localStorage
    const token = localStorage.getItem("customerToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token and user data
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerProfile");
    // Remove cookies if any
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setIsLoggedIn(false);
    router.push("/customer/auth/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          profilePicUrl: formData.profilePicUrl || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed. Please try again.");
      }

      setAuthToken(result.data.token);
      setUserData(result.data.user);

      router.push("/customer/auth/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* Logout Button (top right) */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow hover:bg-red-700 z-50"
        >
          Logout
        </button>
      )}
      {/* Left: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 p-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6">
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-3 left-3 text-white hover:text-indigo-200 text-xs font-medium transition-colors duration-200"
          >
            ← Back
          </Link>

          {/* Logo and Heading */}
          <div className="mb-4 text-center">
            <Link href="/">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-700 rounded-full w-full h-8 flex items-center justify-center"></div>
                <img
                  src="/bluelogo.png"
                  alt="ZifyPay Logo"
                  className="h-8 w-auto relative z-10 transition-transform duration-200 hover:scale-105"
                />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">
              Create Account
            </h1>
            <p className="text-gray-600 text-xs">
              Sign up for your customer account
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-3 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Profile Image and Name Row */}
            <div className="flex flex-row items-start gap-4">
              {/* Profile Picture */}
              <div className="w-42 rounded-xl bordar-2 border-gray-600">
                <label className="block text-xs font-semibold text-gray-700 mb-1 text-center">
                  Profile Picture{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <div className="flex items-center justify-center gap-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm">
                    {uploading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                      </div>
                    ) : formData.profilePicUrl ? (
                      <img
                        src={formData.profilePicUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        {/* <UploadCloud className="w-5 h-5" /> */}
                        <img src="/profile.jpg" alt="" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        {formData.profilePicUrl ? "Change" : "Upload"}
                      </>
                    )}
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);

                      const formDataUpload = new FormData();
                      formDataUpload.append("file", file);

                      try {
                        const res = await fetch(
                          `${API_URL}/business/upload-thumbnail`,
                          {
                            method: "POST",
                            body: formDataUpload,
                          }
                        );
                        const data = await res.json();
                        if (!res.ok || !data.url)
                          throw new Error(data.message || "Upload failed");

                        setFormData((prev) => ({
                          ...prev,
                          profilePicUrl: data.url,
                        }));
                      } catch (err: any) {
                        setError(err.message || "Image upload failed");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </div>
              </div>
              {/* First Name and Last Name */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-semibold text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-semibold text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || uploading}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white text-sm transition-all duration-200 flex justify-center items-center
                ${
                  loading || uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg"
                }
              `}
            >
              {loading || uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {uploading ? "Uploading..." : "Creating..."}
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-3 text-center text-gray-600 text-xs">
            Already have an account?{" "}
            <Link
              href="/customer/auth/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              login
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <img
          src="/desh6.png"
          alt="Signup Visual"
          className="w-full h-full object-cover brightness-75"
        />
      </div>
    </div>
  );
}
