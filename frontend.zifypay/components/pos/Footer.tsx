"use client";
import React from "react";
import {
  FacebookIcon,
  FrameIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}
const footerLinks: FooterSection[] = [
  {
    label: "Solutions",
    links: [
      { title: "Fuel Pump Integration", href: "/pos/FuelPumpIntegration" },
      { title: "Retail POS System", href: "/pos/RetailPOSSystem" },
      { title: "Cloud Dashboard", href: "/pos/CloudDashboard" },
      { title: "Payments & Compliance", href: "/pos/Payments&Compliance" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About ZifyPay", href: "/pos/Company" },
      { title: "FAQs", href: "/pos/FAQs" },
      { title: "Privacy Policy", href: "/pos/PrivacyPolicy" },
      { title: "Terms of Service", href: "/pos/TermsofService" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/pos/blog" },
      { title: "Changelog", href: "/pos/Changelog" },
      { title: "Help Center", href: "/pos/HelpCenter" },
      { title: "Developer Docs", href: "/pos/developerDocs" },
    ],
  },
  {
    label: "Connect With Us",
    links: [
      { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61573019611246", icon: FacebookIcon },
      { title: "Instagram", href: "https://www.instagram.com/zifypay?igsh=MTFkZmM0M20zYjV2Zw==", icon: InstagramIcon },
      { title: "Youtube", href: "https://www.youtube.com/watch?v=qjCH13g3wqY", icon: YoutubeIcon },
      { title: "LinkedIn", href: "https://www.linkedin.com/company/zifypay/posts/?feedView=all", icon: LinkedinIcon },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative w-full mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        {/* Logo and Contact Info */}
        <div className="space-y-4">
 <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
              className="max-h-8"
              alt="ZifyPay Logo"
            />          <p className="text-muted-foreground mt-4 text-sm">
            ZifyPay POS
          </p>
          <p className="text-muted-foreground text-sm">
            📧 Support@ZifyPay.com
            <br />
            📞 (980) 256-0131
            <br />
            📍 1309 Coffeen Avenue, Ste 1200, Sheridan, WY 82801
          </p>
          <p className="text-muted-foreground text-sm mt-6">
            © {new Date().getFullYear()} ZifyPay. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section) => (
            <div key={section.label}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  {section.label}
                </h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
