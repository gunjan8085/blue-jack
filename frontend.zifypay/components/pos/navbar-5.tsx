"use client";

import { useRef, useState } from "react";
import { MenuIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Dropdown = ({ title, items }: { title: string; items: any[] }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150); // delay to prevent flicker
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition">
        {title}
        <ChevronDown className="w-4 h-4 mt-0.5" />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};



export const Navbar5 = () => {
   const features = [
    { title: "Fuel Pump Integration", href: "/pos/FuelPumpIntegration" },
    { title: "Retail Store POS", href: "/pos/RetailPOSSystem" },
    { title: "Cloud Dashboard", href: "/pos/CloudDashboard" },
    { title: "Payments & Compliance", href: "/pos/Payments&Compliance" },
  ];

  const dashboard = [
    { title: "Sales Analytics", href: "/pos/CloudDashboard" },
    { title: "Inventory Control", href: "/pos/RetailPOSSystem" },
    { title: "Role-Based Access", href: "/pos/CloudDashboard" },
  ];

  const solutions = [
    { title: "Fuel Stations", href: "/pos/FuelPumpIntegration" },
    { title: "C-Stores & Franchises", href: "/pos/RetailPOSSystem" },
    { title: "Highway Retail Chains", href: "/pos/solutions" },
  ];

  const resources = [
    { title: "Help Center", href: "/pos/HelpCenter" },
    { title: "Developer Docs", href: "/pos/developerDocs" },
    { title: "FAQs", href: "/pos/FAQs" },
    { title: "Changelog", href: "/pos/Changelog" },
  ];

  const company = [
    { title: "About ZifyPay", href: "/pos/Company" },
    { title: "Privacy Policy", href: "/pos/PrivacyPolicy" },
    { title: "Terms of Service", href: "/pos/TermsofService" },
  ];
  
  return (
    <section className="py-4">
      <div className="container px-4 md:px-24">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
              className="max-h-8"
              alt="ZifyPay Logo"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Dropdown title="Features" items={features} />
            <Dropdown title="Dashboard" items={dashboard} />
            <Dropdown title="Solutions" items={solutions} />
            <Dropdown title="Resources" items={resources} />
            <Dropdown title="Company" items={company} />
            <a
              href="/pos/pricing"
              className="text-sm font-medium hover:text-primary transition"
            >
              Pricing
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Button>Start for free</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href="#" className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
                      className="max-h-8"
                      alt="ZifyPay Logo"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      ZifyPay POS
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-4">
                {[features, dashboard, solutions, resources, company].map(
                  (group, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      {group.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50"
                        >
                          {item.title}
                        </a>
                      ))}
                      <hr />
                    </div>
                  )
                )}
                <a href="#" className="font-medium mt-2">
                  Pricing
                </a>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  <Button>Start for free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
