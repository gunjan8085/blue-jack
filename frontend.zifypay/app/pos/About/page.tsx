import React from "react";
import { Navbar5 } from "@/components/pos/navbar-5";
import Footer from "@/components/pos/Footer";

function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center">About ZifyPay</h1>
        <p className="text-lg text-center">
          ZifyPay is a next-generation platform powering modern fuel stations and retail outlets with intelligent automation, seamless payments, and real-time operational control.
        </p>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Why ZifyPay?</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            <li><strong>End-to-End Automation:</strong> From fuel pump control to POS to inventory, everything is centralized and streamlined.</li>
            <li><strong>Zero-Fee Payments:</strong> Enjoy 0% processing fees on card and digital payments via our ZifyPay gateway.</li>
            <li><strong>Built for Compliance:</strong> Integrated tax, audit, and age verification systems ensure you're always on the right side of the law.</li>
            <li><strong>Cloud-Powered:</strong> Access your business data, sales, and staff activity from anywhere, in real time.</li>
            <li><strong>Offline-Ready:</strong> ZifyPay works even when the internet doesn't—with automatic sync once you're back online.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Vision</h2>
          <p className="text-lg">
            To become the digital backbone of every independent gas station and retail store across North America—equipping them with enterprise-grade tools without the enterprise price tag.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            <li><strong>Fuel Pump Integration:</strong> Start/stop and monitor Gilbarco, Wayne, and more directly from your POS.</li>
            <li><strong>Retail POS System:</strong> Barcode scanning, dual-screen interface, discounts, and loyalty programs.</li>
            <li><strong>Smart Dashboard:</strong> Role-based access, advanced analytics, and centralized controls.</li>
            <li><strong>Secure Transactions:</strong> PCI-DSS compliance, encrypted data, and detailed audit logs.</li>
            <li><strong>Hardware Support:</strong> Full integration with pumps, scanners, printers, and touch displays.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Team</h2>
          <p className="text-lg">
            We're a dedicated team of engineers, designers, and retail experts committed to transforming the everyday operations of C-stores and gas stations. At ZifyPay, innovation meets reliability.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <ul className="text-lg space-y-1">
            <li><strong>Email:</strong> <a href="mailto:Support@ZifyPay.com" className="underline text-blue-400">Support@ZifyPay.com</a></li>
            <li><strong>Phone:</strong> (980) 256-0131</li>
            <li><strong>Address:</strong> 1309 Coffeen Avenue, Ste 1200, Sheridan, WY 82801</li>
          </ul>
        </section>

        <p className="text-center text-md text-slate-300 pt-10">
          ZifyPay is here to simplify your operations, grow your margins, and modernize your business—one smart transaction at a time.
        </p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Navbar5 />
      <AboutPage />
      <Footer />
    </>
  );
}