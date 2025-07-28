"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/const";
import { useToast } from "@/components/ui/use-toast";

interface BusinessStatusCheckerProps {
  showMessage?: boolean;
  children?: React.ReactNode;
}

const BusinessStatusChecker = ({
  showMessage = true,
  children,
}: BusinessStatusCheckerProps) => {
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkBusinessStatus = async () => {
      try {
        const businessProfile = localStorage.getItem("businessProfile");
        if (!businessProfile) {
          setIsActive(false);
          setStatus(null);
          return;
        }

        const businessId = JSON.parse(businessProfile)._id;

        const res = await fetch(`${API_URL}/business/active-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId }),
        });

        const data = await res.json();
        const matchedBusiness = data.businesses?.[0];

        const active = matchedBusiness?.isActive ?? false;
        const bizStatus = matchedBusiness?.status ?? null;

        setIsActive(active);
        setStatus(bizStatus);

        if (!active && showMessage) {
          toast({
            title: "Business not active",
            description: "Payment is required to activate your business.",
            variant: "destructive",
          });
        }

        if (bizStatus === "deactivated" && showMessage) {
          toast({
            title: "Business deactivated",
            description:
              "Your account has been deactivated by the admin. Contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching business status", error);
        setIsActive(false);
        setStatus(null);
      }
    };

    checkBusinessStatus();
  }, [showMessage, toast]);

  if (isActive === null && status === null) {
    return <p>Checking business status...</p>;
  }

  return (
    <>
      {/* Check for admin deactivation first */}
      {status === "deactivated" && showMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          Your account has been <strong>deactivated</strong> by the admin.
          Please contact support.
        </div>
      )}

      {/* Check for inactive status */}
      {!isActive && status !== "deactivated" && showMessage && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
          Your business is not active. Please go to{" "}
          <a href="/dashboard/payments" className="underline text-yellow-600">
            Payments
          </a>{" "}
          to activate your account.
        </div>
      )}

      {children}
    </>
  );
};

export default BusinessStatusChecker;
