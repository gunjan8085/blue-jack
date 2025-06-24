"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { API_URL } from "@/lib/const";

interface Appointment {
  id: string;
  businessName: string;
  logo: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  status: string;
  location: string;
  userReview: string;
  userRating: number;
  paymentStatus: string;
}

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-700 border border-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "cancelled":
      return "bg-red-100 text-red-600 border border-red-300";
    case "completed":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const userDataRaw = localStorage.getItem("userData");
      const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
      const userId = userData?._id;

      if (!userId) {
        toast({
          title: "Error",
          description: "User not found in local storage.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/v1/appointments/user?userId=${userId}`
        );
        const data = await res.json();

        if (data.success) {
          setAppointments(data.data);
        } else {
          toast({
            title: "Failed to fetch appointments",
            description: data.message || "Something went wrong.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description: "Unable to fetch appointments.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        My Appointments
      </h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600 text-center">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <Card
              key={appt.id}
              className="p-5 shadow-md border border-gray-200 rounded-xl flex flex-col sm:flex-row items-start gap-6 hover:shadow-lg transition"
            >
              {appt.logo ? (
                <Image
                  src={appt.logo}
                  alt="Business logo"
                  width={90}
                  height={90}
                  className="rounded-md object-cover border border-gray-200"
                />
              ) : (
                <div className="w-[90px] h-[90px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                  No Logo
                </div>
              )}

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {appt.businessName}
                  </h2>
                  <span
                    className={`text-sm px-2 py-1 rounded-md capitalize ${getStatusBadgeColor(
                      appt.status
                    )}`}
                  >
                    {appt.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Staff:</strong> {appt.staffName || "N/A"}
                  </p>
                  <p>
                    <strong>Service:</strong>{" "}
                    {appt.serviceName?.trim() || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {appt.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {appt.location || "N/A"}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    <span className="capitalize">{appt.paymentStatus}</span>
                  </p>
                </div>

                {appt.userReview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      <strong>Review:</strong> {appt.userReview}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
