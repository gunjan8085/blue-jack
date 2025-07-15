"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/lib/const";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface LoanApplication {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  mobile: string;
  industry: string;
  timeInBusiness: string;
  annualSales: string;
  product: string;
  agreedToTerms: boolean;
  createdAt: string;
}

export default function LoanApplicationsPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/loan`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch loans");

        setApplications(data);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen rounded-br-4xl">
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right text-red-400 hover:text-red-200">
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Loan Applications</h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-blue-400" />
          <p className="mt-2 text-blue-200">Loading applications...</p>
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-x-auto border border-gray-700">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-800">
              <tr>
                {[
                  "Date",
                  "Name",
                  "Email",
                  "Business",
                  "Phone",
                  "Industry",
                  "Experience",
                  "Sales",
                  "Product",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-sm font-medium text-blue-300 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-white">{new Date(app.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white">{app.firstName} {app.lastName}</td>
                  <td className="px-4 py-3 text-blue-300">{app.email}</td>
                  <td className="px-4 py-3 text-gray-300">{app.businessName}</td>
                  <td className="px-4 py-3 text-gray-300">{app.phone}</td>
                  <td className="px-4 py-3 text-gray-300">{app.industry}</td>
                  <td className="px-4 py-3 text-gray-300">{app.timeInBusiness}</td>
                  <td className="px-4 py-3 text-gray-300">{app.annualSales}</td>
                  <td className="px-4 py-3 text-gray-300">{app.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
