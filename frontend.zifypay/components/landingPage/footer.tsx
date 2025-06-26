"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

// Easy to configure footer data
const footerConfig = {
  company: {
    name: "⚡ Pyxis",
    description: "The complete commerce platform for modern businesses.",
    contact: {
      email: "hello@pyxis.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Suite 100, San Francisco, CA 94105",
    },
  },
  sections: [
    {
      title: "Solutions",
      links: [
        { label: "Point of Sale", href: "/pos" },
        { label: "Payments", href: "/payments" },
        { label: "Inventory", href: "/inventory" },
        { label: "Analytics", href: "/analytics" },
        { label: "Customer Management", href: "/customers" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Starter Plan", href: "/pricing/starter" },
        { label: "Professional", href: "/pricing/pro" },
        { label: "Enterprise", href: "/pricing/enterprise" },
        { label: "Compare Plans", href: "/pricing/compare" },
        { label: "Request Demo", href: "/demo" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" },
        { label: "Help Center", href: "/help" },
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Partners", href: "/partners" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  newsletter: {
    title: "Stay updated",
    description: "Get the latest product updates and business insights delivered to your inbox.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  social: [
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Instagram", href: "#", icon: "📷" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
  copyright: "© 2024 Pyxis. All rights reserved.",
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors duration-200">
                  {footerConfig.company.name}
                </Link>
                <p className="text-blue-200 mt-4 leading-relaxed">{footerConfig.company.description}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-200">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href={`mailto:${footerConfig.company.contact.email}`} className="hover:underline">
                    {footerConfig.company.contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-200">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${footerConfig.company.contact.phone}`} className="hover:underline">
                    {footerConfig.company.contact.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-blue-200">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{footerConfig.company.contact.address}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {footerConfig.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerConfig.sections.map((section, index) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-semibold text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-blue-200 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-blue-800 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{footerConfig.newsletter.title}</h3>
            <p className="text-blue-200 mb-8">{footerConfig.newsletter.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={footerConfig.newsletter.placeholder}
                className="flex-1 px-4 py-3 rounded-lg bg-blue-800/50 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg px-6">
                {footerConfig.newsletter.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-center md:text-left">{footerConfig.copyright}</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {footerConfig.legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
