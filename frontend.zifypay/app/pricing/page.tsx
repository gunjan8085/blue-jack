import React from "react";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";
const plans = [
  {
    name: "Basic",
    price: "$0",
    features: [
      "Free processing",
      "Daily payouts",
      "Dashboard access"
    ],
  },
  {
    name: "Business",
    price: "$29",
    features: [
      "POS app",
      "Loyalty programs",
      "Detailed reports"
    ],
  },
  {
    name: "Growth",
    price: "$79",
    features: [
      "Chargeblast feature",
      "Same-day deposits",
      "All Business features"
    ],
  },
  {
    name: "Premium",
    price: "$149",
    features: [
      "Dedicated account rep",
      "Advanced integrations",
      "Full API access"
    ],
  },
];

export  function PricingPage() {
  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-6 lg:px-24">
      <h1 className="text-4xl font-bold text-center mb-12">ZifyPay Pricing</h1>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white text-slate-900 rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}/mo</p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Navbar />  
      <PricingPage />
      <Footer />
    </div>
  );
}

