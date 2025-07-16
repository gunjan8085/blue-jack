"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Fuel, MonitorSmartphone, Cloud, ShieldCheck } from "lucide-react";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-[0.9] px-4 py-2 transition-colors duration-300 text-base md:text-lg font-medium"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  <div style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className = "",
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={`relative flex justify-center space-x-2 px-8 py-4 ${className}`}
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-gray-500 dark:text-neutral-200 hover:text-blue-600 hover:bg-blue-50 rounded px-2 py-1 block transition-all duration-200 text-[17px] hover:scale-[1.04]"
    >
      {children}
    </Link>
  );
};

function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Trap focus in mobile menu and close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusableEls =
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a, button, summary, [tabindex]:not([tabindex="-1"])'
          );
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setHidden(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      width: scrolled ? "80%" : "100%",
      borderRadius: scrolled ? "1rem" : "0rem",
      marginLeft: scrolled ? "auto" : "0",
      marginRight: scrolled ? "auto" : "0",
      transition: { duration: scrolled ? 0.35 : 0.45, ease: "easeInOut" },
    });
  }, [scrolled, controls]);

  return (
    <>
      <motion.header
        initial={{
          y: 0,
          opacity: 1,
          width: "100%",
          borderRadius: "0rem",
          scale: 1,
        }}
        animate={{
          y: hidden ? "-100%" : 0,
          opacity: hidden ? 0 : 1,
          width: scrolled ? "80%" : "100%",
          borderRadius: scrolled ? "1rem" : "0rem",
          scale: scrolled ? 0.96 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 mx-auto z-50 text-sm transition-colors duration-300 ${
          scrolled ? "bg-blue-500/10 shadow-md rounded-xl" : "bg-transparent"
        }`}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          transformOrigin: "center",
          fontFamily: "'Proxima Nova', sans-serif",
        }}
      >
        <div className="max-w-full mx-4 md:mx-24 flex items-center justify-between px-4 ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white text-sm">
            <Image src="/logo.png" alt="ZifyPay Logo" width={100} height={80} />
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <Menu setActive={setActive} className="text-sm">
              <MenuItem setActive={setActive} active={active} item="Features">
                <div className="flex flex-col  text-sm min-w-[220px]">
                  <HoveredLink href="/list-your-business/feature/appointmentCalendar">
                    Appointment calendar
                  </HoveredLink>
                  <HoveredLink href="/list-your-business/feature/pointOfSale">
                    Point of sale
                  </HoveredLink>
                  {/* <HoveredLink href="/list-your-business/feature/onlineBookings">
                    Online bookings
                  </HoveredLink> */}
                  <HoveredLink href="/list-your-business/feature/payments">
                    Payments
                  </HoveredLink>
                  {/* <HoveredLink href="/list-your-business/feature/checkInApp">
                    Check-in app
                  </HoveredLink> */}
                  <HoveredLink href="/list-your-business/feature/cloudDashboard">
                    Cloud Dashboard
                  </HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Use Case">
                <div className="grid grid-cols-2 gap-3 p-3 min-w-[220px]">
                  {[
                    {
                      label: "Fuel Pumps",
                      href: "/list-your-business/usecase/FuelPumps",
                      icon: Fuel,
                    },
                    {
                      label: "Retail POS",
                      href: "/list-your-business/usecase/RetailPOS",
                      icon: MonitorSmartphone,
                    },
                    {
                      label: "Financial Support",
                      href: "/list-your-business/usecase/loan",
                      icon: Cloud,
                    },
                    {
                      label: "Secure Payment",
                      href: "/list-your-business/usecase/SecurePayment",
                      icon: ShieldCheck,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded px-2 py-1 text-[17px] hover:scale-[1.04] transition-all duration-200"
                      >
                        <Icon size={20} color="#2563EB" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Industries">
                <div className="flex flex-row min-w-[800px] max-h-[340px] p-6">
                  <div className="w-1/2 grid grid-cols-2 gap-y-4 text-left">
                    {[
                      "Salons",
                      "Hair salons",
                      "Barbershops",
                      "Beauty salons",
                      "Nail salons",
                      "Tanning salons",
                      "Spas",
                      "Clinics",
                      "Dental clinics",
                      "Auto shops",
                      "Pet care",
                      "Bike shops",
                      "Personal trainers",
                      "Photographers",
                      "Optical stores",
                      "Fuel pump",
                    
                      "Retail store",
                    ].map((industry) => {
                      const slug = industry.toLowerCase().replace(/ /g, "-");
                      return (
                        <Link
                          key={industry}
                          href={`/list-your-business/${slug}`}
                          className="text-gray-500 hover:text-blue-600 hover:text-[18px] rounded px-2 mx-3 transition-all duration-200 text-[17px] hover:scale-[1.04]"
                        >
                          {industry}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center">
                    <video
                      className="rounded-lg shadow w-[500px] h-[500px] object-cover"
                      controls
                      poster="/video-thumb.png"
                      autoPlay
                      muted
                    >
                      <source src="/pay.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition mt-4 w-full">
                      Contact for Custom Business
                    </button>
                  </div>
                </div>
              </MenuItem>

              <div className="flex items-center px-4 gap-2">
                <Link
                  href="/list-your-business/Pricing"
                  className="text-white transition-colors duration-200 px-4 py-2 text-base md:text-lg font-medium"
                  style={{ fontFamily: "'Proxima Nova', sans-serif" }}
                >
                  Pricing
                </Link>
                <Link
                  href="/careers"
                  className="bg-[#001F4D] text-white font- px-4 py-2 rounded-full shadow hover:bg-[#0a1d36] transition text-sm md:text-base"
                >
                  Careers
                </Link>
              </div>
            </Menu>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            <Link
              href="/user-flow"
              className="text-white hover:underline transition-colors duration-200 px-2 py-1 text-base md:text-lg font-medium"
            >
              Login
            </Link>
            <a href="/booking-engine" className="block">
              <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm text-white backdrop-blur-3xl">
                  Booking engine
                </span>
              </button>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
            style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
          />
          {/* Animated Mobile Menu */}
          <motion.div
            ref={mobileMenuRef}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-[#001A39] to-[#001433] z-50 py-6 px-6 md:hidden shadow-2xl rounded-b-2xl"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col space-y-6 text-white pt-2">
              <Link
                href="/list-your-business/Pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/careers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                Careers
              </Link>
              <Link
                href="/user-flow"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                Login
              </Link>
              <Link
                href="/booking-engine"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                Booking Engine
              </Link>

              <details className="group">
                <summary className="cursor-pointer text-lg font-semibold">
                  Features
                </summary>
                <div className="flex flex-col space-y-2 pl-4 mt-2 text-base">
                  <Link
                    href="/list-your-business/feature/appointmentCalendar"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Appointment calendar
                  </Link>
                  <Link
                    href="/list-your-business/feature/pointOfSale"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Point of sale
                  </Link>
                  <Link
                    href="/list-your-business/feature/onlineBookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Online bookings
                  </Link>
                  <Link
                    href="/list-your-business/feature/payments"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Payments
                  </Link>
                  <Link
                    href="/list-your-business/feature/checkInApp"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Check-in app
                  </Link>
                  <Link
                    href="/list-your-business/feature/cloudDashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cloud Dashboard
                  </Link>
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-semibold">
                  Use Case
                </summary>
                <div className="flex flex-col space-y-2 pl-4 mt-2 text-base">
                  <Link
                    href="/list-your-business/usecase/FuelPumps"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Fuel Pumps
                  </Link>
                  <Link
                    href="/list-your-business/usecase/RetailPOS"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Retail POS
                  </Link>
                  <Link
                    href="/list-your-business/usecase/loan"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Financial Support
                  </Link>
                  <Link
                    href="/list-your-business/usecase/SecurePayment"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Secure Payment
                  </Link>
                </div>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-lg font-semibold">
                  Industries
                </summary>
                <div className="flex flex-col space-y-2 pl-4 mt-2 text-base max-h-[200px] overflow-y-auto">
                  {[
                    "Salons",
                    "Hair salons",
                    "Barbershops",
                    "Beauty salons",
                    "Nail salons",
                    "Tanning salons",
                    "Spas",
                    "Clinics",
                    "Dental clinics",
                    "Auto shops",
                    "Pet care",
                    "Bike shops",
                    "Personal trainers",
                    "Photographers",
                    "Optical stores",
                    "Fuel pump",
                    "Cstore",
                    "Retail store",
                  ].map((industry) => {
                    const slug = industry.toLowerCase().replace(/ /g, "-");
                    return (
                      <Link
                        key={industry}
                        href={`/list-your-business/${slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {industry}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default Navbar;
