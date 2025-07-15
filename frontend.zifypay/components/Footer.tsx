import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "lucide-react";
import { Button } from "./ui/button";

const socialLinks = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61573019611246",
    icon: FacebookIcon,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/zifypay?igsh=MTFkZmM0M20zYjV2Zw==",
    icon: InstagramIcon,
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/watch?v=qjCH13g3wqY",
    icon: YoutubeIcon,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/zifypay/posts/?feedView=all",
    icon: LinkedinIcon,
  },
];

const industries = [
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
];

const features = [
  { name: "Appointment calendar", href: "/list-your-business/feature/appointmentCalendar" },
  { name: "Point of sale", href: "/list-your-business/feature/pointOfSale" },
  { name: "Online bookings", href: "/list-your-business/feature/onlineBookings" },
  { name: "Payments", href: "/list-your-business/feature/payments" },
  { name: "Cloud Dashboard", href: "/list-your-business/feature/cloudDashboard" },
];

const useCases = [
  { name: "Fuel Pumps", href: "/list-your-business/usecase/FuelPumps" },
  { name: "Retail POS", href: "/list-your-business/usecase/RetailPOS" },
  { name: "Financial Support", href: "/list-your-business/usecase/loan" },
  { name: "Secure Payment", href: "/list-your-business/usecase/SecurePayment" },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="ZifyPay logo"
                className="h-10 w-auto"
              />
            </div>
          </div>
          
          {/* For Customers */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Customers</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors block">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors block">
                  Book Appointment
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.scroll({ top: 2900, left: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors block"
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>
          
          {/* For Business */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Business</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link 
                  href="/auth/signup" 
                  className="hover:text-white transition-colors block"
                >
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors block">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/list-your-business/Pricing" className="hover:text-white transition-colors block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors block">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-3 text-gray-400">
              {features.map((feature) => (
                <li key={feature.name}>
                  <Link
                    href={feature.href}
                    className="hover:text-white transition-colors block text-sm"
                  >
                    {feature.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Use Cases */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Use Cases</h4>
            <ul className="space-y-3 text-gray-400">
              {useCases.map((useCase) => (
                <li key={useCase.name}>
                  <Link
                    href={useCase.href}
                    className="hover:text-white transition-colors block text-sm"
                  >
                    {useCase.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Industries */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Industries</h4>
            <div className="max-h-[200px] overflow-y-auto">
              <ul className="space-y-2 text-gray-400">
                {industries.map((industry) => {
                  const slug = industry.toLowerCase().replace(/ /g, "-");
                  return (
                    <li key={industry}>
                      <Link
                        href={`/list-your-business/${slug}`}
                        className="hover:text-white transition-colors block text-sm"
                      >
                        {industry}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Support */}
          <div>
            {/* <h4 className="font-semibold text-lg mb-4">Support</h4> */}
            <ul className="space-y-3 text-gray-400">
              {/* <li>
                <Link href="#" className="hover:text-white transition-colors block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        
        {/* Social Links and Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map(({ title, href, icon: Icon }) => (
                <Link 
                  key={title} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={title} 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-gray-400 text-sm">&copy; 2025 zifypay.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;