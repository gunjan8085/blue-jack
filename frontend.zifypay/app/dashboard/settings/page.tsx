"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import AppSidebar from "@/components/for-bussiness/AppSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { API_URL } from "@/lib/const";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    profilePicUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userDataRaw = localStorage.getItem("userData");
      if (userDataRaw) {
        const userData = JSON.parse(userDataRaw);
        const userId = userData._id;
        const response = await fetch(
          `${API_URL}/users/profile?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        const result = await response.json();
        if (response.ok && result.success) {
          setFormData({
            firstName: result.data.user.firstName || "",
            lastName: result.data.user.lastName || "",
            email: result.data.user.email || "",
            phoneNumber: result.data.user.phoneNumber || "",
            country: result.data.user.country || "",
            profilePicUrl: result.data.user.profilePicUrl || "",
          });
        } else {
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            country: userData.country || "",
            profilePicUrl: userData.profilePicUrl || "",
          });
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load user profile.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userDataRaw = localStorage.getItem("userData");
      if (!userDataRaw)
        throw new Error("No user data found. Please login again.");
      const userData = JSON.parse(userDataRaw);
      const userId = userData._id;
      const response = await fetch(
        `${API_URL}/users/update-profile?userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            country: formData.country,
            profilePicUrl: formData.profilePicUrl,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Update failed");
      if (result.success) {
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        toast({
          title: "Success",
          description: "Profile updated successfully!",
          variant: "default",
        });
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const userDataRaw = localStorage.getItem("userData");
      if (!userDataRaw)
        throw new Error("No user data found. Please login again.");
      const userData = JSON.parse(userDataRaw);
      const userId = userData._id;
      const response = await fetch(
        `${API_URL}/users/delete-profile/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Delete failed");
      if (result.success) {
        toast({
          title: "Deleted",
          description: "Profile deleted successfully!",
          variant: "default",
        });
        localStorage.clear();
        setTimeout(() => {
          router.push("/customer/auth/login");
        }, 1500);
      } else {
        throw new Error(result.message || "Delete failed");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your user profile</p>
            </div>
          </div>
        </header>
        <div className="flex-1 flex justify-center items-start p-6">
          <Card className="w-full max-w-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={
                        formData.profilePicUrl ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                    />
                    <AvatarFallback>
                      {formData.firstName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-semibold mt-2">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-1"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-1"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      value={formData.email}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium mb-1"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mb-1"
                      >
                        Country
                      </label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="profilePicUrl"
                      className="block text-sm font-medium mb-1"
                    >
                      Profile Image URL
                    </label>
                    <Input
                      id="profilePicUrl"
                      value={formData.profilePicUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-fit"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={deleteLoading}
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      {deleteLoading ? "Deleting..." : "Delete Profile"}
                    </Button>
                  </div>
                </form>
              </div>
              {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-6">
                      Are you sure you want to delete your profile? This action
                      cannot be undone.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Deleting..." : "Yes, Delete"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={deleteLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
