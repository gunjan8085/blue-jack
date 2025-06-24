"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Phone,
  Mail,
  Linkedin,
  Instagram,
  MessageCircle,
  Twitter,
  Facebook,
} from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 30,
      });

      // Animation
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:bg-pink-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "#",
      color: "hover:bg-green-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:bg-blue-400" },
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:bg-blue-700" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-slate-900 text-white py-16 px-6 lg:px-12"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo Section */}
         <img src="https://res.cloudinary.com/dhehfjptn/image/upload/v1750750580/footerlog_pkjggc.svg" alt="" />

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links:</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Info:</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+91-91043-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">support@zifypay.com</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ZifyPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
