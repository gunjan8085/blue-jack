"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getuserid,
  setAuthToken,
  setUserData,
  checkBusinessProfile,
} from "../../../lib/auth";
import { API_URL } from "../../../lib/const";

interface UserData {
  _id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface LoginResponse {
  data: {
    employee: UserData;
    token: string;
  };
  success: boolean;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/employee/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData: LoginResponse = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      if (!responseData.data?.token || !responseData.data?.employee) {
        throw new Error("Invalid response format");
      }

      setAuthToken(responseData.data.token);
      setUserData(responseData.data.employee);

      const businessProfile = await checkBusinessProfile(
        responseData.data.employee._id
      );

      if (!businessProfile) {
        window.location.href = "/business/create";
      } else {
        localStorage.setItem(
          "businessProfile",
          JSON.stringify(businessProfile)
        );
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row  bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center  p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img
              src="https://zifypay.com/logo.png"
              alt="ZifyPay"
              className="h-10 mb-4"
            />
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white">Sign in to your business account</p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
            
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block w-full md:w-1/2">
        <img
          src="/desh.png"
          alt="Happy Business"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
