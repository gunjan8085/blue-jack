'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from "next/image"; 

// Navigation configuration - easy to modify
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
          label: "Payment Gateway",
          href: "/payment-gateway",
          description: "Secure online payment processing",
        },
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
          label: " 1. Fuel Pump Integration ",
          href: "/Fuel",
          description:
            "Slash your payment costs with zero processing fee options",
        },
        {
          label: "Retail (C Store) POS (/retail-pos)",
          href: "/Cstore",
          description: "Receive your funds instantly, no waiting, no stress",
        },
        {
          label: " 3. Cloud Dashboard & Analytics (/dashboard-analytics)",
          href: "/dash",
          description:
            "End-to-end encryption, PCI compliance, and fraud prevention",
        },
        {
          label: " Payments & Compliance",
          href: "/payment",
          description: "Plug-and-play APIs, SDKs, and platform extensions",
        },
        // {
        //   label: " Offline & Hardware Support",
        //   href: "/coming-soon",
        //   description: "Frictionless payments across web, mobile, and POS",
        // },
      ],
    },
    {
      label: "Customers",
      href: "#",
      dropdown: [
        {
          label: "Small Business",
          href: "/coming-soon",
          description: "Perfect for growing businesses",
        },
        {
          label: "E-commerce",
          href: "/coming-soon",
          description: "Online store solutions",
        },
        {
          label: "Enterprise",
          href: "/coming-soon",
          description: "Large-scale payment processing",
        },
        {
          label: "Startups",
          href: "/coming-soon",
          description: "Get started with minimal setup",
        },
        {
          label: "Non-profits",
          href: "/coming-soon",
          description: "Special rates for good causes",
        },
      ],
    },
  ],
  rightLinks: [{ label: "Pricing", href: "coming-soon" }],
  ctaButtons: [
    {
      label: "Request a demo",
      href: "/demo",
      variant: "primary",
    },
    {
      label: "Build & Price",
      href: "/build-price",
      variant: "secondary",
    },
  ],
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label : any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
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
      <div className="w-full  px-24">
        <div className="flex flex-row items-center justify-between h-28 gap-8"> {/* gap-8 for consistent spacing */}
          {/* Logo */}
          <div className="flex items-center min-w-[140px]">
            <a
              href={navigationConfig.logo.href}
              className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors duration-200"
            >
              <Image
                src={navigationConfig.logo.image}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-md"
              />
              {/* <span className="text-2xl font-semibold">ZifyPay</span> */}
            </a>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row items-center gap-10 xl:gap-14">
            {navigationConfig.mainLinks.map((link) => (
              <div
                key={link.label}
                className="relative flex items-center"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-2 text-lg text-gray-200 hover:text-white transition-all duration-200 py-3 px-5 rounded-xl hover:bg-gray-800 font-semibold">
                  <span>{link.label}</span>
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform origin-top ${
                      activeDropdown === link.label
                        ? "opacity-100 scale-100 translate-y-0 visible"
                        : "opacity-0 scale-95 -translate-y-2 invisible"
                    }`}
                  >
                    <div className="p-2">
                      {link.dropdown.map((item, index) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className={`block p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] group text-gray-900 ${
                            activeDropdown === link.label ? "animate-fade-in-up" : ""
                          }`}
                          style={{ 
                            animationDelay: `${index * 50}ms`,
                            animationFillMode: 'both'
                          }}
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {item.label}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 group-hover:text-blue-500 transition-colors duration-200">
                            {item.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Right Side Links & Buttons */}
          <div className="hidden lg:flex flex-row items-center gap-8 min-w-[420px] justify-end"> {/* gap-8, min-w for spacing, justify-end for right alignment */}
            {navigationConfig.rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg text-gray-200 hover:text-white font-semibold transition-colors duration-200 "
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-row items-center gap-4">
              {navigationConfig.ctaButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href}
                  className={`px-4 py-2 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    button.variant === 'primary'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25'
                      : 'border border-gray-600 text-gray-200 hover:text-white hover:border-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <button
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{link.label}</span>
                    {link.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </button>

                {link.dropdown && (
                  <div
                    className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                      activeDropdown === link.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray-700 pt-4 mt-4">
              {navigationConfig.rightLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              <div className="px-4 py-2 space-y-2">
                {navigationConfig.ctaButtons.map((button) => (
                  <a
                    key={button.label}
                    href={button.href}
                    className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      button.variant === 'primary'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}