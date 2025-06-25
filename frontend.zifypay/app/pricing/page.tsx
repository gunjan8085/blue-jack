"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/footer";

interface Plan {
  title: string;
  price: string;
  period: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const pricingContent: Record<string, Plan[]> = {
  Lodgezify: [
    { title: "Starter", price: "$29", period: "/mo", features: ["5 properties", "Basic booking", "Manual payments"], icon: Zap, gradient: "from-[#2B2EFF] to-[#3B82F6]" },
    { title: "Growth", price: "$79", period: "/mo", features: ["20 properties", "OTA integrations", "Analytics"], icon: Star, gradient: "from-[#2B2EFF] to-[#4F46E5]" },
    { title: "Pro", price: "$149", period: "/mo", features: ["Unlimited properties", "AI pricing", "Direct booking site"], icon: Shield, gradient: "from-[#2B2EFF] to-[#1E40AF]" },
    { title: "Enterprise", price: "Custom", period: "", features: ["Custom API", "White-label", "Priority support"], icon: Crown, gradient: "from-[#2B2EFF] to-[#7C3AED]" },
  ],
  ZifyPay: [
    { title: "Basic", price: "$0", period: "/mo", features: ["Free processing", "Daily payouts", "Dashboard"], icon: Zap, gradient: "from-[#2B2EFF] to-[#3B82F6]" },
    { title: "Business", price: "$29", period: "/mo", features: ["POS app", "Loyalty", "Reports"], icon: Star, gradient: "from-[#2B2EFF] to-[#4F46E5]" },
    { title: "Growth", price: "$79", period: "/mo", features: ["Chargeblast", "Same-day deposits"], icon: Shield, gradient: "from-[#2B2EFF] to-[#1E40AF]" },
    { title: "Premium", price: "$149", period: "/mo", features: ["Dedicated rep", "Integrations", "API access"], icon: Crown, gradient: "from-[#2B2EFF] to-[#7C3AED]" },
  ],
  ZifyBot: [
    { title: "Starter", price: "$39", period: "/mo", features: ["AI email", "Lead tracking", "10 calls/month"], icon: Zap, gradient: "from-[#2B2EFF] to-[#3B82F6]" },
    { title: "Pro", price: "$99", period: "/mo", features: ["50 AI calls", "Social automation", "Slack approvals"], icon: Star, gradient: "from-[#2B2EFF] to-[#4F46E5]" },
    { title: "Elite", price: "$199", period: "/mo", features: ["Unlimited calls", "Chatbot + CRM"], icon: Shield, gradient: "from-[#2B2EFF] to-[#1E40AF]" },
    { title: "Agency", price: "$499", period: "/mo", features: ["White-label", "Team controls", "Multi-client"], icon: Crown, gradient: "from-[#2B2EFF] to-[#7C3AED]" },
  ],
  Bundles: [
    { title: "Growth Stack", price: "$149", period: "/mo", features: ["Lodgezify Growth", "ZifyPay Business", "ZifyBot Starter"], icon: Zap, gradient: "from-[#2B2EFF] to-[#3B82F6]" },
    { title: "AI Power Bundle", price: "$299", period: "/mo", features: ["Lodgezify Pro", "ZifyBot Pro", "Chargeblast"], icon: Star, gradient: "from-[#2B2EFF] to-[#4F46E5]" },
    { title: "All-In-One Agency", price: "$599", period: "/mo", features: ["Full access to all 3 platforms"], icon: Crown, gradient: "from-[#2B2EFF] to-[#1E40AF]" },
  ],
};

const PlanCard = ({ title, price, period, features, icon: Icon, gradient }: Plan) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
  >
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
    <div className="text-3xl font-extrabold text-gray-900 mb-4">
      {price}<span className="text-sm text-gray-500">{period}</span>
    </div>
    <ul className="text-sm text-gray-600 space-y-2 mb-4">
      {features.map((feat, i) => (
        <li key={i} className="flex items-center">
          <Check className="w-4 h-4 text-green-500 mr-2" />
          {feat}
        </li>
      ))}
    </ul>
    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm font-semibold transition-all">
      Choose Plan
    </button>
  </motion.div>
);

interface SectionProps {
  title: string;
  subtitle: string;
  plans: Plan[];
}

const Section = ({ title, subtitle, plans }: SectionProps) => (
  <section className="mb-24">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-300 max-w-2xl mx-auto text-base">{subtitle}</p>}
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan, idx) => (
        <PlanCard key={idx} {...plan} />
      ))}
    </div>
  </section>
);

export default function ZifySuitePricingPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen">
      <Navbar />
      <div className="py-20 px-6 lg:px-16">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold mb-4">Zify Suite SaaS Pricing</h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Transparent pricing tailored for every stage of your business. Choose the tools you need — and grow without limits.
          </p>
        </div>

        <Section
          title="Lodgezify PMS"
          subtitle="Powerful hotel property management — from startups to enterprise chains"
          plans={pricingContent.Lodgezify}
        />

        <Section
          title="ZifyPay Payment Solutions"
          subtitle="Zero-fee and feature-rich POS & payment systems for every retail need"
          plans={pricingContent.ZifyPay}
        />

        <Section
          title="ZifyBot AI Automation"
          subtitle="Drive growth with AI-powered calling, CRM, and messaging tools"
          plans={pricingContent.ZifyBot}
        />

        <Section
          title="Suite Bundles"
          subtitle="Best value combinations to power your full-stack business operations"
          plans={pricingContent.Bundles}
        />
      </div>
      <Footer />
    </div>
  );
}
