"use client";

import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/customer/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/const";
import { UploadCloud, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    userId:"",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    profilePicUrl: "",
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userDataRaw = localStorage.getItem("userData");
      if (userDataRaw) {
        const userData = JSON.parse(userDataRaw);
        const uid = userData._id;
        setUserId(uid);

        const response = await fetch(`${API_URL}/users/profile?userId=${uid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        const result = await response.json();
        const user = result?.data?.user || userData;

        setFormData({
          userId:user._id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          country: user.country || "",
          profilePicUrl: user.profilePicUrl || "",
        });
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/business/upload-thumbnail`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.message || "Upload failed");
      }

      setFormData((prev) => ({
        ...prev,
        profilePicUrl: data.url,
      }));
    } catch (err: any) {
      setErrorMsg(err.message || "Image upload failed");
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      if (!userId) throw new Error("User ID not found");

      const response = await fetch(`${API_URL}/users/update-profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          userId:formData.userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          profilePicUrl: formData.profilePicUrl || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      localStorage.setItem("userData", JSON.stringify(result.data.user));
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Profile Image Upload & Preview */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-48 w-48 rounded-full overflow-hidden border shadow-lg">
            {formData.profilePicUrl ? (
              <img
                src={formData.profilePicUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <UploadCloud className="w-10 h-10" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageUpload}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 mr-2" />
                {formData.profilePicUrl ? "Change" : "Upload"} Picture
              </>
            )}
          </Button>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-xl shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input id="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input id="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input id="email" value={formData.email} readOnly className="bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                Country
              </label>
              <Input id="country" value={formData.country} onChange={handleChange} />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full md:w-fit">
            {loading ? "Saving..." : "Save Changes"}
          </Button>

          {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
        </form>
      </div>
    </Layout>
  );
}
