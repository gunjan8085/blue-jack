import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "lucide-react";

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

function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                <Link href="#" className="hover:text-white transition-colors block">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/businesses" className="hover:text-white transition-colors block">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors block">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Business */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Business</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link 
                  href="/for-bussiness" 
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
                <Link href="#" className="hover:text-white transition-colors block">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
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
              </li>
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
