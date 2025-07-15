"use client";
import React, { useState, useEffect } from "react";
import { Building2, Eye } from "lucide-react";
import { API_URL } from "@/lib/const";

// Business type based on API response
interface Business {
  _id: string;
  brandName: string;
  businessType: string;
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
  isActive: boolean;
  createdAt: string;
}

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  const apiRequest = async (endpoint: string, options: { headers?: Record<string, string>, method?: string } = {}) => {
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
      const data = await apiRequest("/business/getAllBusiness");
      setBusinesses(data.data);
    } catch (err) {
      setError("Failed to fetch businesses");
      console.error(err);
    } finally {
      setLoading(false);
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
          <button onClick={() => setError("")} className="float-right text-red-400 hover:text-red-200">×</button>
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
        <div className="text-center py-12 text-blue-200">No businesses found.</div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-x-auto border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {businesses.map((b) => (
                <tr key={b._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {b.thumbnail && (
                      <img src={b.thumbnail} alt={b.brandName} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                    )}
                    <div>
                      <div className="font-medium text-white">{b.brandName}</div>
                      {b.website && (
                        <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">{b.website}</a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{b.businessType}</td>
                  <td className="px-6 py-4 text-gray-300">
                    <div>{b.contactEmail}</div>
                    <div>{b.contactPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div>{b.address.addressLine1}{b.address.addressLine2 ? `, ${b.address.addressLine2}` : ""}</div>
                    <div>{b.address.city}, {b.address.state}, {b.address.country} - {b.address.pincode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${b.isActive ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border-red-700'}`}>
                      {b.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusinessPage; 