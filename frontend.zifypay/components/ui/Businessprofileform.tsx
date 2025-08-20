"use client";

import { useState, useEffect, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Card } from "./card";
import { Label } from "./label";
import { Switch } from "./switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { toast } from "./use-toast";
import { API_URL } from "@/lib/const";
import { getuserid } from "@/lib/auth";
import { Progress } from "./progress";
import {
  Loader2,
  UploadCloud,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddressContactPicker, {
  AddressContactValue,
} from "./AddressContactPicker";
import { log } from "console";

/** -----------------------------
 * Zod schema (unchanged)
 * ------------------------------*/
const businessProfileSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  thumbnail: z
    .string()
    .url("Please enter a valid thumbnail URL")
    .optional()
    .or(z.literal("")),
  about: z.string().min(10, "About must be at least 10 characters"),
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
  businessType: z.enum(["SALON", "SPA", "CLINIC", "STUDIO", "OTHER"]),
  contactEmail: z.string().email("Please enter a valid email"),
  contactPhone: z.string().min(8, "Phone number must be at least 8 characters"),
});

type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

/** IMPORTANT: Match allowed enum values exactly */
const BUSINESS_TYPES = [
  { value: "SALON", label: "Salon" },
  { value: "SPA", label: "Spa" },
  { value: "CLINIC", label: "Clinic" },
  { value: "STUDIO", label: "Studio" },
  { value: "OTHER", label: "Other" },
];

const FOUND_US_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral",
  "Advertisement",
  "Word of Mouth",
  "Business Partner",
  "Trade Show",
  "Other",
];

const POPULAR_SOFTWARE_OPTIONS = [
  "Fresha",
  "Mindbody",
  "Booker",
  "Vagaro",
  "Square Appointments",
  "Acuity Scheduling",
  "Timely",
  "Phorest",
  "None",
  "Other",
];

/** -----------------------------
 * Helper: naive formatted-address parser
 * Parses "Line 1, City, State 12345, Country"
 * Works well enough, user can still edit fields below.
 * ------------------------------*/
function naiveSplitAddress(addr: string) {
  const parts = addr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const country = parts.pop() || "";
  const stateZip = parts.pop() || ""; // "State 12345"
  const city = parts.pop() || "";
  const line1 = parts.join(", ");

  let state = "";
  let pincode = "";
  const m = stateZip.match(/(.+)\s+(\d{4,10})$/); // State + Zip
  if (m) {
    state = m[1].trim();
    pincode = m[2].trim();
  } else {
    state = stateZip;
  }

  return { line1, city, state, country, pincode };
}

export function BusinessProfileForm1({
  initialData,
  onSubmit: onSubmitProp,
  onCancel,
  isEditMode,
}: {
  initialData?: Partial<BusinessProfileFormData>;
  onSubmit?: (data: BusinessProfileFormData) => void | Promise<void>;
  onCancel?: () => void;
  isEditMode?: boolean;
} = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<number>(0);
  const steps = [
    "Business Details",
    "Services & Team",
    "Contact & Location",
    "Preferences",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    reset,
  } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      isOnlineOnly: false,
      teamSize: { min: 1, max: 10 },
      businessType: "SALON",
      existingSoftware: "",
      foundUsAt: "",
      website: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      contactEmail: "",
      contactPhone: "",
      ...initialData,
    },
  });

  /** AddressContactPicker controlled value */
  const [mapAddress, setMapAddress] = useState<AddressContactValue>({
    address:
      [
        initialData?.address?.addressLine1,
        initialData?.address?.city,
        initialData?.address?.state,
        initialData?.address?.pincode,
        initialData?.address?.country,
      ]
        .filter(Boolean)
        .join(", ") || "",
    location: { type: "Point", coordinates: [0, 0] },
    contactInfo: {
      phone: initialData?.contactPhone || "",
      email: initialData?.contactEmail || "",
    },
  });

  /** Keep form in sync when mapAddress changes */
  useEffect(() => {
    // Always set phone/email from picker (since you showContactFields=true there)
    setValue("contactPhone", mapAddress.contactInfo.phone || "");
    setValue("contactEmail", mapAddress.contactInfo.email || "");

    if (mapAddress.address?.trim()) {
      const { line1, city, state, country, pincode } = naiveSplitAddress(
        mapAddress.address
      );
      setValue("address.addressLine1", line1 || "");
      setValue("address.city", city || "");
      setValue("address.state", state || "");
      setValue("address.country", country || "");
      setValue("address.pincode", pincode || "");
    }
  }, [mapAddress, setValue]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [media, setMedia] = useState<{ url: string; type: "photo" }[]>([]);
  const [mediaUploading, setMediaUploading] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  /** Fields to validate per step */
  const stepFields: string[][] = [
    ["brandName", "businessType", "thumbnail", "about"],
    ["teamSize.min", "teamSize.max", "existingSoftware"],
    [
      "address.addressLine1",
      "address.addressLine2",
      "address.city",
      "address.state",
      "address.country",
      "address.pincode",
      "contactEmail",
      "contactPhone",
      "website",
    ],
    ["isOnlineOnly", "foundUsAt"],
  ];

  const handleNext = async () => {
    const valid = await trigger(stepFields[step] as any);
    if (valid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  useEffect(() => {
    if (initialData) {
      reset({
        isOnlineOnly: false,
        teamSize: { min: 1, max: 10 },
        businessType: "SALON",
        existingSoftware: "",
        foundUsAt: "",
        website: "",
        ...initialData,
      });
      if (initialData.thumbnail) setThumbnailPreview(initialData.thumbnail);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: BusinessProfileFormData) => {
    if (onSubmitProp) {
      await onSubmitProp(data);
      return;
    }
    try {
      setIsSubmitting(true);
      const userId = getuserid();
      if (!userId) throw new Error("User not authenticated");

      const payload = {
        ...data,
        owner: userId,
        media,
        timings: [
          {
            days: [1, 2, 3, 4, 5],
            time: [
              { open: { hour: 9, minute: 0 }, close: { hour: 17, minute: 0 } },
            ],
          },
        ],
        location: mapAddress.location,
        formattedAddress: mapAddress.address,
      };

      const response = await fetch(`${API_URL}/business/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(
          responseData.message || "Failed to create business profile"
        );

      // --- ✅ Save all 4 to localStorage ---
      const token = localStorage.getItem("token") || ""; // set during login
      const userData = JSON.parse(localStorage.getItem("userData") || "{}"); // set during login
      const businessProfile = responseData.data; // from API
      const businessId = businessProfile?._id || businessProfile?.id || "";

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("businessProfile", JSON.stringify(businessProfile));
      localStorage.setItem("businessId", businessId);
      // cookie.set("businessId"
      {
        const maxAge = 60 * 60 * 24 * 30; // 30 days
        const secure =
          typeof window !== "undefined" && window.location.protocol === "https:"
            ? "; Secure"
            : "";
        // Note: middleware reads cookies from the request, so this makes it available to it
        document.cookie = `businessProfile=true; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
      }

      toast({
        title: "Success!",
        description: "Business profile created successfully.",
      });

      // Redirect (change this path if you want a different page)
      window.location.href = `/dashboard`;
      // e.g. window.location.href = `/business/${businessId}`;
      // or use router.push('/dashboard') if you prefer SPA navigation
    } catch (error: any) {
      console.error("Error creating business profile:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to create business profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const progressValue = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
              Setup Your Business Profile
            </h1>
            <p className="text-gray-500 text-center mt-2">
              Complete your profile to start managing your business
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progressValue)}%
              </span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          {/* Stepper */}
          <div className="hidden sm:flex justify-between mb-8 px-4">
            {steps.map((label, idx) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center font-medium ${
                    idx === step
                      ? "bg-blue-600 text-white"
                      : idx < step
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {idx < step ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    idx === step
                      ? "text-blue-600"
                      : idx < step
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Business Details */}
            {step === 0 && (
              <Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Business Name *</Label>
                    <Input
                      id="brandName"
                      {...register("brandName")}
                      placeholder="e.g. Glamour Salon"
                      className={`${
                        errors.brandName ? "border-red-500" : "border-gray-300"
                      } focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.brandName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.brandName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("businessType", value as any)
                      }
                      defaultValue={watch("businessType")}
                    >
                      <SelectTrigger
                        className={`${
                          errors.businessType
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500`}
                      >
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="thumbnail">Business Logo *</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {thumbnailPreview || watch("thumbnail") ? (
                          <img
                            src={thumbnailPreview || watch("thumbnail")}
                            alt="Thumbnail Preview"
                            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploading(true);
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const token = localStorage.getItem("token");
                              const res = await fetch(
                                `${API_URL}/business/upload-thumbnail`,
                                {
                                  method: "POST",
                                  headers: token
                                    ? { Authorization: `Bearer ${token}` }
                                    : undefined,
                                  body: formData,
                                }
                              );
                              const data = await res.json();
                              if (!res.ok || !data.url)
                                throw new Error(
                                  data.message || "Upload failed"
                                );
                              setValue("thumbnail", data.url);
                              setThumbnailPreview(data.url);
                            } catch (err) {
                              toast({
                                title: "Error",
                                description:
                                  "Image upload failed. Please try again.",
                                variant: "destructive",
                              });
                            } finally {
                              setUploading(false);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          variant="outline"
                          className="gap-2"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-4 h-4" />
                              {thumbnailPreview || watch("thumbnail")
                                ? "Change Logo"
                                : "Upload Logo"}
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          Recommended size: 500x500px, JPG or PNG
                        </p>
                      </div>
                    </div>
                    {errors.thumbnail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.thumbnail.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="about">About Your Business *</Label>
                    <Textarea
                      id="about"
                      {...register("about")}
                      placeholder="Tell us about your business, your specialties, and what makes you unique"
                      rows={4}
                      className={`${
                        errors.about ? "border-red-500" : "border-gray-300"
                      } focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.about && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.about.message}
                      </p>
                    )}
                  </div>

                  {/* Gallery (unchanged) */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Business Images (Gallery)</Label>
                    <div className="flex flex-wrap gap-4 mb-2">
                      {media.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img.url}
                            alt="Business Media"
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-gray-700 hover:text-red-600"
                            onClick={() =>
                              setMedia(media.filter((_, i) => i !== idx))
                            }
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={mediaInputRef}
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (!files.length) return;
                        setMediaUploading(true);
                        try {
                          const token = localStorage.getItem("token");
                          for (const file of files) {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch(
                              `${API_URL}/business/upload-thumbnail`,
                              {
                                method: "POST",
                                headers: token
                                  ? { Authorization: `Bearer ${token}` }
                                  : undefined,
                                body: formData,
                              }
                            );
                            const data = await res.json();
                            if (!res.ok || !data.url)
                              throw new Error(data.message || "Upload failed");
                            setMedia((prev) => [
                              ...prev,
                              { url: data.url, type: "photo" },
                            ]);
                          }
                        } catch (err) {
                          toast({
                            title: "Error",
                            description:
                              "One or more images failed to upload. Please try again.",
                            variant: "destructive",
                          });
                        } finally {
                          setMediaUploading(false);
                          if (mediaInputRef.current)
                            mediaInputRef.current.value = "";
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => mediaInputRef.current?.click()}
                      disabled={mediaUploading}
                      variant="outline"
                      className="gap-2"
                    >
                      {mediaUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4" />
                          {media.length ? "Add More Images" : "Upload Images"}
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      You can upload multiple images (JPG or PNG).
                    </p>
                  </div>
                </div>
              </Fragment>
            )}

            {/* Step 2: Services & Team */}
            {step === 1 && (
              <Fragment>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="teamSizeMin">Team Size (Minimum) *</Label>
                      <Input
                        id="teamSizeMin"
                        type="number"
                        {...register("teamSize.min", { valueAsNumber: true })}
                        placeholder="1"
                        className={`${
                          errors.teamSize?.min
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.teamSize?.min && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.teamSize.min.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSizeMax">Team Size (Maximum) *</Label>
                      <Input
                        id="teamSizeMax"
                        type="number"
                        {...register("teamSize.max", { valueAsNumber: true })}
                        placeholder="10"
                        className={`${
                          errors.teamSize?.max
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.teamSize?.max && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.teamSize.max.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="existingSoftware">
                      Current Software/System *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("existingSoftware", value)
                      }
                      defaultValue={watch("existingSoftware")}
                    >
                      <SelectTrigger
                        className={`${
                          errors.existingSoftware
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500`}
                      >
                        <SelectValue placeholder="What software do you currently use?" />
                      </SelectTrigger>
                      <SelectContent>
                        {POPULAR_SOFTWARE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.existingSoftware && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.existingSoftware.message}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      This helps us understand your current setup and provide
                      better onboarding.
                    </p>
                  </div>
                </div>
              </Fragment>
            )}

            {/* Step 3: Contact & Location */}
            {step === 2 && (
              <Fragment>
                <div className="space-y-6">
                  <AddressContactPicker
                    apiKey="AIzaSyD6R6cRTzjXV-QDOVy9VIp_kytIpZmBUzs" // <-- use env key
                    value={mapAddress}
                    onChange={setMapAddress}
                    showContactFields={true} // users can change phone/email inside picker
                  />

                  {/* Editable address details (ensures Zod validation can pass) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="addressLine1">Street Address *</Label>
                      <Input
                        id="addressLine1"
                        {...register("address.addressLine1")}
                        placeholder="123 Main St"
                        className={`${
                          errors.address?.addressLine1
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.address?.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.addressLine1.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">
                        Apartment, suite, etc. (Optional)
                      </Label>
                      <Input
                        id="addressLine2"
                        {...register("address.addressLine2")}
                        placeholder="Apt 2B"
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register("address.city")}
                        placeholder="City"
                        className={`${
                          errors.address?.city
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.address?.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        {...register("address.state")}
                        placeholder="State"
                        className={`${
                          errors.address?.state
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.address?.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.state.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        {...register("address.country")}
                        placeholder="Country"
                        className={`${
                          errors.address?.country
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.address?.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.country.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Postal Code *</Label>
                      <Input
                        id="pincode"
                        {...register("address.pincode")}
                        placeholder="Postal Code"
                        className={`${
                          errors.address?.pincode
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.address?.pincode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.pincode.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...register("contactEmail")}
                        placeholder="business@example.com"
                        className={`${
                          errors.contactEmail
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.contactEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactEmail.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        {...register("contactPhone")}
                        placeholder="+1 (555) 123-4567"
                        className={`${
                          errors.contactPhone
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.contactPhone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactPhone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        {...register("website")}
                        placeholder="https://yourbusiness.com"
                        className={`${
                          errors.website ? "border-red-500" : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.website && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.website.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}

            {/* Step 4: Preferences */}
            {step === 3 && (
              <Fragment>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Business Preferences
                    </h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <Label
                          htmlFor="isOnlineOnly"
                          className="font-medium text-gray-900"
                        >
                          Online Only Business
                        </Label>
                        <p className="text-sm text-gray-500">
                          Check this if you don't have a physical location
                        </p>
                      </div>
                      <Switch
                        id="isOnlineOnly"
                        checked={watch("isOnlineOnly")}
                        onCheckedChange={(checked) =>
                          setValue("isOnlineOnly", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundUsAt">
                      How did you hear about us? *
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("foundUsAt", value)}
                      defaultValue={watch("foundUsAt")}
                    >
                      <SelectTrigger
                        className={`${
                          errors.foundUsAt
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-blue-500`}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {FOUND_US_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.foundUsAt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.foundUsAt.message}
                      </p>
                    )}
                  </div>
                </div>
              </Fragment>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <Button type="button" onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  {isEditMode && onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isEditMode ? "Saving..." : "Creating Profile..."}
                      </>
                    ) : (
                      <>{isEditMode ? "Save Changes" : "Complete Setup"}</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
