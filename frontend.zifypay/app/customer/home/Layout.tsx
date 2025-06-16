// components/customer/Layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", path: "/customer/home" },
  { label: "Appointments", path: "/customer/appointments" },
  { label: "History", path: "/customer/history" },
  { label: "Profile", path: "/customer/profile" },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/customer/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg py-6 px-4 space-y-6 sticky top-0 h-screen">
        <div className="text-xl font-bold text-purple-700 mb-6">Welcome {user?.firstName || "User"}</div>
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <div
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  pathname === link.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full text-red-600 border-red-200" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
