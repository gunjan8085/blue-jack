import React from "react";

const items = [
  {
    title: "FDIC Insurance",
    description:
      "Get up to 20x the industry standard in FDIC insurance through our partner banks and sweep networks.",
    icon: "🛡️",
  },
  {
    title: "Regulated Partners",
    description:
      "Your deposits are held in your name in federally regulated accounts facilitated by our banking partners.",
    icon: "🏦",
  },
  {
    title: "Account Security",
    description:
      "Strong, industry-standard protocols keep your data safe and confidential.",
    icon: "🔒",
  },
];

const SecuritySection = () => (
  <section className="py-20 bg-[#e0e7ff] text-[#0a1d36]">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Bank with complete confidence.
      </h2>
      <div className="grid md:grid-cols-3 gap-8 h-full shadow-3xl">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white h-1/2 rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SecuritySection;
