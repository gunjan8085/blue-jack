"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setAuthToken, setUserData } from "@/lib/auth";
import { API_URL } from "@/lib/const";

interface UserData {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    user: UserData;
    token: string;
  };
}

export default function CustomerLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/customer/home";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData: LoginResponse = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      if (
        !responseData.data ||
        !responseData.data.user ||
        !responseData.data.token
      ) {
        throw new Error("Invalid login response structure");
      }

      // Save user data and token
      localStorage.setItem("userData", JSON.stringify(responseData.data.user));
      localStorage.setItem("token", responseData.data.token);
      localStorage.setItem("userId", responseData.data.user._id);
      localStorage.setItem("userEmail", responseData.data.user.email);
      localStorage.setItem("isLoggedIn", "true");

      setAuthToken(responseData.data.token);
      setUserData(responseData.data.user);

      // Redirect to the original URL or fallback
      router.push(redirectUrl);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="absolute ml-5 mt-5 top-4 left-4 text-white hover:underline text-sm">
          ← Back
        </Link>
          {/* Logo */}
          <div className="mb-6">
             <Link href="/">
            <img
              src="https://zifypay.com/logo.png"
              alt="ZifyPay Logo"
              className="h-10 w-auto cursor-pointer mb-4"
            />
          </Link>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-white">Sign in to your customer account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-white">
            Don&apos;t have an account?{" "}
            <Link
              href="/customer/auth/signup"
              className="text-blue-300 hover:text-blue-400 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block w-full md:w-1/2">
        <img
          src="/desh4.png"
          alt="Customer Login Visual"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}