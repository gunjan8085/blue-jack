"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { API_URL } from "../../../lib/const";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isOwner: true,
    authType: "password",
    phoneNumber: "",
    country: "",
    profileImage: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");

  // Autofill email from query or localStorage
  useEffect(() => {
    if (!formData.email) {
      const emailFromQuery = searchParams.get("email");
      if (emailFromQuery) {
        setFormData((prev) => ({ ...prev, email: emailFromQuery }));
      } else if (typeof window !== "undefined") {
        const emailFromStorage = localStorage.getItem("signupEmail");
        if (emailFromStorage) {
          setFormData((prev) => ({ ...prev, email: emailFromStorage }));
        }
      }
    }
  }, [searchParams, formData.email]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      setFormData({ ...formData, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Removed profile image required check
    if (imageUploading) {
      setError("Please wait for image to finish uploading.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let imageUrl = "";
      if (formData.profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.profileImage);
        const uploadResponse = await fetch(
          `${API_URL}/business/upload-thumbnail`,
          {
            method: "POST",
            body: imageFormData,
          }
        );
        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }
      const response = await fetch(`${API_URL}/employee/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          profileImage: imageUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 p-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6">
          <Link
            href="/"
            className="absolute top-3 left-3 text-white hover:text-indigo-200 text-xs font-medium transition-colors duration-200"
          >
            ← Back
          </Link>
          <div className="mb-4 text-center">
            <Link href="/">
              <div className="relative inline-block ">
                <div className="absolute inset-0 bg-blue-700 rounded-full px-6 w-full h-8 flex items-center justify-center"></div>
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
              Sign up for your business account
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
              {/* Profile Image Upload */}

              {/* Name */}
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
              <div className="w-42 rounded-md border-2 px-2 py-2 bg-blue/10">
                <label className="block text-xs font-semibold   mb-1 text-center ">
                  Profile Image{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <div className="flex items-center justify-center gap-2">
                  <div className="relative w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-200 shadow-sm">
                    {imageUploading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                      </div>
                    ) : previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src="/profile.jpg" alt="" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formData.profileImage ? "Change" : "Upload"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    disabled={imageUploading}
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
              />
            </div>

            {/* Phone */}
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
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
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
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || imageUploading}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white text-sm transition-all duration-200 flex justify-center items-center
                ${
                  loading || imageUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg"
                }
              `}
            >
              {loading || imageUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {imageUploading ? "Uploading..." : "Creating..."}
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-3 text-center text-gray-600 text-xs">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <img
          src="/desh2.png"
          alt="Signup Visual"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center"></div>
      </div>
    </div>
  );
}
