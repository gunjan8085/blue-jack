"use client";
import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { API_URL } from "@/lib/const";

// Business type based on API response
interface Business {
  _id: string;
  brandName: string;
  businessType?: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  thumbnail?: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  isActive?: boolean;
  status: "activated" | "deactivated";
  createdAt?: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  averageAppointmentValue: number;
  firstAppointmentDate: string | null;
  lastAppointmentDate: string | null;
  mostPopularService: { name: string; count: number; revenue: number } | null;
  totalServices: number;
  totalCustomers: number;
  topCustomer: { email: string; appointments: number; revenue: number } | null;
  repeatCustomerRate: number;
  averageReviewRating: number;
  totalReviews: number;
  recentReview: { text: string; rating: number; date: string } | null;
  totalEmployees: number;
  topEmployee: { name: string; appointments: number } | null;
}

// Toggle Component
const StatusToggle = ({
  isActive,
  onToggle,
  disabled = false,
}: {
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        isActive
          ? "bg-green-600 hover:bg-green-500"
          : "bg-red-600 hover:bg-red-500"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  const apiRequest = async (
    endpoint: string,
    options: {
      headers?: Record<string, string>;
      method?: string;
      body?: any;
    } = {}
  ) => {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/business/with-status");
      setBusinesses(data.businesses || data.data || []);
    } catch (err) {
      setError("Failed to fetch businesses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessStatus = async (
    id: string,
    status: "activated" | "deactivated"
  ) => {
    try {
      setUpdatingStatus(id);
      await apiRequest(`/business/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      setBusinesses((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const fetchAnalytics = async (business: Business) => {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    setAnalyticsData(null);
    setSelectedBusiness(business);
    setShowAnalytics(true);
    try {
      const res = await apiRequest(`/appointments/${business._id}/analytics`);
      setAnalyticsData(res.data);
    } catch (err) {
      setAnalyticsError("Failed to fetch analytics");
      setAnalyticsData(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen rounded-br-4xl">
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right text-red-400 hover:text-red-200"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-7 h-7" /> Business Directory
        </h2>
      </div>
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-blue-200">Loading businesses...</p>
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-12 text-blue-200">
          No businesses found.
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-x-auto border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Toggle Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {businesses.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => fetchAnalytics(b)}
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    {b.thumbnail && (
                      <img
                        src={b.thumbnail}
                        alt={b.brandName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-700"
                      />
                    )}
                    <div>
                      <div className="font-medium text-white">
                        {b.brandName}
                      </div>
                      {b.website && (
                        <a
                          href={b.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          {b.website}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{b.businessType}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <div>{b.contactEmail}</div>
                    <div>{b.contactPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div>
                      {b.address?.addressLine1}
                      {b.address?.addressLine2
                        ? `, ${b.address.addressLine2}`
                        : ""}
                    </div>
                    <div>
                      {b.address?.city}, {b.address?.state},{" "}
                      {b.address?.country} - {b.address?.pincode}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        b.status === "activated"
                          ? "bg-green-900/50 text-green-300 border border-green-700"
                          : "bg-red-900/50 text-red-300 border border-red-700"
                      }`}
                    >
                      {b.status === "activated" ? "Activated" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StatusToggle
                        isActive={b.status === "activated"}
                        disabled={updatingStatus === b._id}
                        onToggle={() =>
                          updateBusinessStatus(
                            b._id,
                            b.status === "activated"
                              ? "deactivated"
                              : "activated"
                          )
                        }
                      />
                      {updatingStatus === b._id && (
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Analytics for {selectedBusiness?.brandName}
              </h3>
              <button
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                onClick={() => setShowAnalytics(false)}
              >
                ×
              </button>
            </div>
            {analyticsLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-blue-200">Loading analytics...</p>
              </div>
            ) : analyticsError ? (
              <div className="p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
                {analyticsError}
              </div>
            ) : analyticsData ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Revenue & Appointments */}
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-2">
                    <div className="font-semibold text-white">
                      Total Revenue
                    </div>
                    <div className="text-lg text-blue-400 font-bold">
                      ${analyticsData.totalRevenue.toLocaleString()}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Total Appointments
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.totalAppointments}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Completed Appointments
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.completedAppointments}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Cancelled Appointments
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.cancelledAppointments}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      No-show Appointments
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.noShowAppointments}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Average Appointment Value
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.averageAppointmentValue.toFixed(2)}
                    </div>
                  </div>
                  {/* Dates & Services */}
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-2">
                    <div className="font-semibold text-white">
                      First Appointment
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.firstAppointmentDate
                        ? new Date(
                            analyticsData.firstAppointmentDate
                          ).toLocaleString()
                        : "-"}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Last Appointment
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.lastAppointmentDate
                        ? new Date(
                            analyticsData.lastAppointmentDate
                          ).toLocaleString()
                        : "-"}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Most Popular Service
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.mostPopularService
                        ? `${analyticsData.mostPopularService.name} (${analyticsData.mostPopularService.count} times, $${analyticsData.mostPopularService.revenue})`
                        : "-"}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Total Services
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.totalServices}
                    </div>
                  </div>
                  {/* Customers */}
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-2">
                    <div className="font-semibold text-white">
                      Total Customers
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.totalCustomers}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Top Customer
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.topCustomer
                        ? `${analyticsData.topCustomer.email} (${analyticsData.topCustomer.appointments} appointments, $${analyticsData.topCustomer.revenue})`
                        : "-"}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Repeat Customer Rate
                    </div>
                    <div className="text-lg text-gray-300">
                      {(analyticsData.repeatCustomerRate * 100).toFixed(1)}%
                    </div>
                  </div>
                  {/* Reviews & Employees */}
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-2">
                    <div className="font-semibold text-white">
                      Average Review Rating
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.averageReviewRating.toFixed(2)} / 5
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Total Reviews
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.totalReviews}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Most Recent Review
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.recentReview
                        ? `"${analyticsData.recentReview.text}" (${
                            analyticsData.recentReview.rating
                          }★ on ${new Date(
                            analyticsData.recentReview.date
                          ).toLocaleString()})`
                        : "-"}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Total Employees
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.totalEmployees}
                    </div>
                    <div className="font-semibold text-white mt-4">
                      Top Employee
                    </div>
                    <div className="text-lg text-gray-300">
                      {analyticsData.topEmployee
                        ? `${analyticsData.topEmployee.name} (${analyticsData.topEmployee.appointments} appointments)`
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPage;
