"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

const navigationConfig = {
  logo: {
    image: "/logo.png",
    href: "/",
  },
  mainLinks: [
    {
      label: "Solutions",
      href: "#",
      dropdown: [
        {
          label: "Mobile Payments",
          href: "/mobile-payments",
          description: "Accept payments on the go",
        },
        {
          label: "E-commerce Integration",
          href: "/ecommerce",
          description: "Seamless shopping cart integration",
        },
        {
          label: "Recurring Billing",
          href: "/recurring",
          description: "Automated subscription management",
        },
        {
          label: "Multi-currency",
          href: "/multi-currency",
          description: "Global payment acceptance",
        },
      ],
    },
    {
      label: "Use Cases",
      href: "#",
      dropdown: [
        {
          label: "Fuel Pump Integration",
          href: "/Fuel",
          description: "Zero processing fee options",
        },
        {
          label: "Retail (C Store) POS",
          href: "/Cstore",
          description: "Instant settlement, no delays",
        },
        {
          label: "Cloud Dashboard & Analytics",
          href: "/dash",
          description: "Secure insights & analytics",
        },
        {
          label: "Payments & Compliance",
          href: "/payment",
          description: "Integrations made easy",
        },
      ],
    },
    {
      label: "Customers",
      href: "#",
      dropdown: [
        {
          label: "Small Business",
          href: "/businesses",
          description: "For growing businesses",
        },
        {
          label: "E-commerce",
          href: "/ecommerce",
          description: "Online store solutions",
        },
        {
          label: "Enterprise",
          href: "/Enterpris",
          description: "High-volume processing",
        },
        {
          label: "General Store",
          href: "/general-store",
          description: "Quick & simple setup",
        },
      ],
    },
    {
      label: "Careers",
      href: "/careers", // 🔹 Submenu removed, direct link added
    },
  ],
  rightLinks: [{ label: "Pricing", href: "/pricing" }],
  ctaButtons: [
    { label: "Request a demo", href: "/Book-A-Demo", variant: "primary" },
    { label: "Build & Price", href: "/build-price", variant: "secondary" },
  ],
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 transition-all duration-300">
      <div className="w-full px-6 lg:px-24">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <div className="flex items-center min-w-[120px]">
            <a
              href={navigationConfig.logo.href}
              className="flex items-center space-x-3"
            >
              <Image
                src={navigationConfig.logo.image}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-md"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navigationConfig.mainLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {!link.dropdown ? (
                  <a
                    href={link.href}
                    className="text-base text-gray-200 hover:text-white font-semibold px-4 py-2 rounded-xl hover:bg-gray-800"
                  >
                    {link.label}
                  </a>
                ) : (
                  <>
                    <button className="flex items-center gap-2 text-base text-gray-200 hover:text-white py-2 px-4 rounded-xl hover:bg-gray-800 font-semibold">
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all origin-top ${
                        activeDropdown === link.label
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                      }`}
                    >
                      <div className="p-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block p-3 rounded-lg hover:bg-blue-50 text-gray-900 hover:text-blue-600 transition-all group"
                          >
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-sm text-gray-600 group-hover:text-blue-500">
                              {item.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex gap-4 items-center">
            {navigationConfig.rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base text-gray-200 hover:text-white font-medium"
              >
                {link.label}
              </a>
            ))}
            {navigationConfig.ctaButtons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className={`px-4 py-2 rounded-xl font-medium text-base transition-all hover:scale-105 ${
                  btn.variant === "primary"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-blue-500/25"
                    : "border border-gray-600 text-gray-200 hover:text-white hover:border-gray-400 hover:bg-gray-800"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded hover:bg-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2">
            {navigationConfig.mainLinks.map((link) => (
              <div key={link.label}>
                {!link.dropdown ? (
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.label ? null : link.label
                        )
                      }
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>
                    <div
                      className={`ml-4 mt-2 space-y-1 ${
                        activeDropdown === link.label
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="border-t border-gray-700 pt-4 mt-4">
              {navigationConfig.rightLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="px-4 py-2 space-y-2">
                {navigationConfig.ctaButtons.map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-all ${
                      btn.variant === "primary"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
