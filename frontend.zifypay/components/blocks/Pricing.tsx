import React from "react";

const plans = [
  {
    name: "Standard Plan",
    price: "$24",
    description: "Business essentials that make doing it yourself easy",
    features: [
      "Customizable website",
      "Easy, 24/7 online booking",
      "Built-in payment processing",
      "Unlimited appointment reminders",
      "Free same-day business transfers",
      "Free data transfer, training and setup",
      "Free email marketing",
      "Desktop, tablet & mobile access",
      "Client management & inventory management",
      { label: "Packages", badge: "New" },
      { label: "Memberships", badge: "Coming soon" },
      { label: "Invoicing", badge: "Coming Soon" },
      { label: "Buy Now, Pay Later", badge: "New" },
      "& More",
    ],
    cta: "TRY FOR FREE",
    note: "No credit card required.",
    highlight: false,
    secondary: false,
  },
  {
    name: "Gold Plan",
    price: "$48",
    description: "Growth tools for entrepreneurs and teams",
    features: [
      "Everything in Standard",
      "Up to 9 team members at no extra cost",
      "Premium website designs",
      "Forms and waivers",
      "Basic time tracking",
      "Waitlist",
      "Reserve with Google integration",
      "500 free text marketing credits per month",
      "Image upload in marketing campaigns",
      "Auto-generated SMS & email marketing",
      "Rebooking reminders",
      { label: "Packages", badge: "New" },
      { label: "Memberships", badge: "coming soon" },
      { label: "Room & resource management", badge: "Coming Soon" },
      "& More",
    ],
    cta: "TRY FOR FREE",
    note: "No credit card required.",
    highlight: true,
    secondary: false,
    badge: "Most Popular",
  },
  {
    name: "Platinum Plan",
    price: "$148",
    description: "Power features and customizations for scaling growth",
    features: [
      "Everything in Gold",
      "Unlimited team members at no extra cost",
      "Premium customer support",
      "Unlimited team member time tracking",
      "Team scorecards, leaderboards and goal setting for unlimited users",
      "2,500 free text marketing credits per month ($60 value)",
      { label: "Google marketing tracking & analytics" },
      { label: "Customizable commission structures", badge: "New" },
      { label: "Advanced resource management", badge: "Coming soon" },
      "& More",
    ],
    cta: "Talk to sales",
    note: "No credit card required.",
    highlight: false,
    secondary: true,
  },
];

function FeatureItem({
  feature,
}: {
  feature: string | { label: string; badge?: string };
}) {
  if (typeof feature === "string") {
    return (
      <li className="flex items-center gap-2 text-base md:text-lg text-gray-700 mb-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
        {feature}
      </li>
    );
  }
  return (
    <li className="flex items-center gap-2 text-base md:text-lg text-gray-700 mb-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
      {feature.label}
      {feature.badge && (
        <span
          className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
            feature.badge.toLowerCase().includes("new")
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {feature.badge}
        </span>
      )}
    </li>
  );
}

export const Pricing = () => {
  return (
    <section
      className="w-full min-h-screen py-52 px-4 bg-gradient-to-r from-[#001A39] to-[#001433] flex flex-col items-center"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      <h2 className="text-3xl md:text-5xl  mb-4 text-center text-[#ebf8ff]">
        Simple pricing, complete features, major savings
      </h2>
      <p className="text-lg md:text-2xl mb-2 text-center text-[#ebf8ff]">
        Start for free. No credit card required.
      </p>
    
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl shadow-lg p-8 border-2 transition-all duration-300 bg-[#ebf8ff] ${
              plan.highlight
                ? "border-blue-600 scale-105 z-10 shadow-2xl"
                : plan.secondary
                ? "border-gray-300"
                : "border-gray-200"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                {plan.badge}
              </span>
            )}
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#001A39] text-center">
              {plan.name}
            </h3>
            <div className="text-4xl md:text-5xl font-extrabold text-blue-600 text-center mb-2">
              {plan.price}
            </div>
            <div className="text-base md:text-lg text-gray-700 mb-4 text-center">
              {plan.description}
            </div>
            <ul className="mb-6 mt-2">
              {plan.features.map((feature, i) => (
                <FeatureItem key={i} feature={feature} />
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl font-semibold text-lg shadow transition mb-2 ${
                plan.highlight
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : plan.secondary
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {plan.cta}
            </button>
            <div className="text-xs text-gray-500 text-center">{plan.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
