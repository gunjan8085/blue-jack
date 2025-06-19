"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

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
          `http://localhost:5001/api/v1/appointments/user?userId=${userId}`
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
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600 text-center">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <Card
              key={appt.id}
              className="p-5 shadow-md border border-gray-200 flex flex-col sm:flex-row items-start gap-4"
            >
              {appt.logo && (
                <Image
                  src={appt.logo}
                  alt="Business logo"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}

              <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {appt.businessName}
                  </h2>
                  <Badge variant="outline" className="capitalize">
                    {appt.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Staff:</strong> {appt.staffName || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Service:</strong>{" "}
                  {appt.serviceName?.trim() || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {appt.date} at {appt.time}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {appt.location || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment:</strong>{" "}
                  <span className="capitalize">{appt.paymentStatus}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
