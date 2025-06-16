"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "./ui/use-toast";
import { API_URL } from "@/lib/const";
import { getuserid } from "@/lib/auth";

const businessProfileSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  website: z.string().url("Please enter a valid website URL"),
  thumbnail: z.string().url("Please enter a valid thumbnail URL"),
  about: z.string().min(10, "About must be at least 10 characters"),
  serviceCategories: z.array(z.string()).min(1, "Please select at least one service category"),
  teamSize: z.object({
    min: z.number().min(1, "Minimum team size must be at least 1"),
    max: z.number().min(1, "Maximum team size must be at least 1"),
  }),
  address: z.object({
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),
  isOnlineOnly: z.boolean(),
  existingSoftware: z.string().min(1, "Please specify your existing software"),
  foundUsAt: z.string().min(1, "Please tell us how you found us"),
});

type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

const SERVICE_CATEGORIES = [
  "Hair & Styling",
  "Nail services",
  "Eyebrow & lashes",
  "Facial & skincare",
  "Injectables & fillers",
  "Makeup",
  "Barbering",
  "Massage",
  "Hair extensions",
  "Hair removal",
  "Tattoo & piercing",
  "Fitness",
  "Other",
];

export function BusinessProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      isOnlineOnly: false,
      teamSize: { min: 1, max: 10 },
    },
  });

  const onSubmit = async (data: BusinessProfileFormData) => {
    console.log('Form submitted with data:', data);
    try {
      setIsSubmitting(true);
      const userId = getuserid();
      console.log('User ID from getuserid():', userId);
      console.log('User data from localStorage:', localStorage.getItem('userData'));
      
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const payload = {
        ...data,
        owner: userId,
        media: [],
        timings: [
          {
            days: [1, 2, 3, 4, 5],
            time: [
              {
                open: { hour: 9, minute: 0 },
                close: { hour: 17, minute: 0 },
              },
            ],
          },
        ],
      };

      console.log('Sending payload:', payload);
      console.log('API URL:', `${API_URL}/business/signup`);

      const response = await fetch(`${API_URL}/business/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create business profile");
      }
      
      // Store the business profile data
      localStorage.setItem('businessProfile', JSON.stringify(responseData.data));

      toast({
        title: "Success!",
        description: "Business profile created successfully.",
      });

      // Redirect to dashboard after successful creation
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Error creating business profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create business profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Your Business Profile</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  {...register("brandName")}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.brandName && (
                  <p className="text-red-500 text-sm">{errors.brandName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceCategories">Service Categories</Label>
                <Select
                  onValueChange={(value) => {
                    const currentCategories = watch("serviceCategories") || [];
                    if (!currentCategories.includes(value)) {
                      setValue("serviceCategories", [...currentCategories, value]);
                    }
                  }}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select service categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watch("serviceCategories")?.map((category) => (
                    <div
                      key={category}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => {
                          const currentCategories = watch("serviceCategories") || [];
                          setValue(
                            "serviceCategories",
                            currentCategories.filter((c) => c !== category)
                          );
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {errors.serviceCategories && (
                  <p className="text-red-500 text-sm">{errors.serviceCategories.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  {...register("website")}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm">{errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  {...register("thumbnail")}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingSoftware">Existing Software</Label>
                <Input
                  id="existingSoftware"
                  {...register("existingSoftware")}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.existingSoftware && (
                  <p className="text-red-500 text-sm">{errors.existingSoftware.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About Your Business</Label>
              <Textarea
                id="about"
                {...register("about")}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              />
              {errors.about && (
                <p className="text-red-500 text-sm">{errors.about.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamSizeMin">Minimum Team Size</Label>
                <Input
                  id="teamSizeMin"
                  type="number"
                  {...register("teamSize.min", { valueAsNumber: true })}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSizeMax">Maximum Team Size</Label>
                <Input
                  id="teamSizeMax"
                  type="number"
                  {...register("teamSize.max", { valueAsNumber: true })}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    {...register("address.addressLine1")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input
                    id="addressLine2"
                    {...register("address.addressLine2")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("address.city")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register("address.state")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("address.country")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    {...register("address.pincode")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isOnlineOnly"
                  checked={watch("isOnlineOnly")}
                  onCheckedChange={(checked) => setValue("isOnlineOnly", checked)}
                />
                <Label htmlFor="isOnlineOnly">Online Only Business</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundUsAt">How did you find us?</Label>
                <Select
                  onValueChange={(value) => setValue("foundUsAt", value)}
                  defaultValue={watch("foundUsAt")}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google Search">Google Search</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Advertisement">Advertisement</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => console.log('Button clicked')}
              >
                {isSubmitting ? "Creating Profile..." : "Create Business Profile"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 