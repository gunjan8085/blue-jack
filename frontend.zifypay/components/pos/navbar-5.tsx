"use client";

import { useState } from "react";
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

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition">
        {title}
        <ChevronDown className="w-4 h-4 mt-0.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out animate-fadeIn">
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
      )}
    </div>
  );
};

export const Navbar5 = () => {
  const features = [
    { title: "Fuel Pump Integration", href: "#" },
    { title: "Retail Store POS", href: "#" },
    { title: "Payments & Wallets", href: "#" },
    { title: "Compliance & Reporting", href: "#" },
  ];

  const dashboard = [
    { title: "Sales Analytics", href: "#" },
    { title: "Inventory Control", href: "#" },
    { title: "Role-Based Access", href: "#" },
  ];

  const solutions = [
    { title: "Fuel Stations", href: "#" },
    { title: "C-Stores & Franchises", href: "#" },
    { title: "Highway Retail Chains", href: "#" },
  ];

  const resources = [
    { title: "Documentation", href: "#" },
    { title: "FAQs", href: "#" },
    { title: "Changelog", href: "#" },
  ];

  const company = [
    { title: "About ZifyPay", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Contact Us", href: "#" },
  ];

  return (
    <section className="py-4">
      <div className="container px-4 md:px-24">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
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
              href="#"
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
