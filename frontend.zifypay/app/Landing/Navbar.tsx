"use client";

import React, { useState, useEffect } from "react";
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

const UseCaseItem = ({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) => (
  <div className="flex space-x-2 items-start p-2 rounded-lg hover:bg-gray-100 transition">
    <img
      src={imgSrc}
      alt={title}
      className="w-8 h-8 object-cover rounded shadow"
    />
    <div>
      <h4 className="text-sm mb-0.5 text-gray-700 dark:text-white">{title}</h4>
      <p className="text-xs text-gray-700 max-w-xs dark:text-neutral-300">
        {description}
      </p>
    </div>
  </div>
);

function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const controls = useAnimation();

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
      <div className="max-w-full mx-24 flex items-center justify-between px-6 py-1 min-h-[16px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white text-sm">
          <Image src="/logo.png" alt="ZifyPay Logo" width={100} height={80} />
        </Link>

        {/* Center Menu */}
        <div className="flex-1 flex justify-center">
          <Menu setActive={setActive} className="text-sm">
            <MenuItem setActive={setActive} active={active} item="Features">
              <div className="flex flex-col space-y-2 text-sm min-w-[220px]">
                <HoveredLink href="/Landing/feature/appointmentCalendar">
                  Appointment calendar
                </HoveredLink>
                <HoveredLink href="/Landing/feature/pointOfSale">
                  Point of sale
                </HoveredLink>
                <HoveredLink href="/Landing/feature/onlineBookings">
                  Online bookings
                </HoveredLink>
                <HoveredLink href="/Landing/feature/payments">
                  Payments
                </HoveredLink>
                <HoveredLink href="/Landing/feature/checkInApp">
                  Check-in app
                </HoveredLink>
                <HoveredLink href="/Landing/feature/cloudDashboard">
                  Cloud Dashboard
                </HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Use Case">
              <div className="grid grid-cols-2 gap-3 p-3  min-w-[220px]">
                {[
                  {
                    label: "Fuel Pumps",
                    href: "/Landing/usecase/FuelPumps",
                    icon: Fuel,
                  },
                  {
                    label: "Retail POS",
                    href: "/Landing/usecase/RetailPOS",
                    icon: MonitorSmartphone,
                  },
                  {
                    label: " financial Support ",
                    href: "/Landing/usecase/loan",
                    icon: Cloud,
                  },
                  {
                    label: "Secure Payment",
                    href: "/Landing/usecase/SecurePayment",
                    icon: ShieldCheck,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded px-2 py-1  transition-all duration-200 text-[17px] hover:scale-[1.04]"
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
                    "Cstore",
                    "Retail store",
                  ].map((industry) => {
                    const slug = industry.toLowerCase().replace(/ /g, "-");
                    return (
                      <Link
                        key={industry}
                        href={`Landing/${slug}`}
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
                href="/Pricing"
                className="text-white  transition-colors duration-200 px-4 py-2 text-base md:text-lg font-medium"
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

        {/* Right Menu */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/user-flow"
            className="text-white hover:underline transition-colors duration-200 px-2 py-1 text-base md:text-lg font-medium"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            Login
          </Link>
          <a href="#demo" className="block">
            <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm text-white backdrop-blur-3xl">
                Request a Demo
              </span>
            </button>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
