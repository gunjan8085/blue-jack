"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
const faqs = [
  {
    question: "How can I register my fuel station with ZifyPay?",
    answer:
      "Getting started is simple. Just sign up on our platform and follow the guided onboarding steps to register your fuel station and connect your pumps.",
  },
  {
    question: "Is my business data safe with ZifyPay?",
    answer:
      "Absolutely. We prioritize your security using advanced encryption, PCI-DSS compliance, and regular system audits to ensure your data is fully protected.",
  },
  {
    question: "Can I manage multiple outlets from a single account?",
    answer:
      "Yes. ZifyPay's centralized dashboard lets you manage multiple fuel stations, C-stores, and terminals from one powerful interface.",
  },
  {
    question: "How do I add or manage staff access?",
    answer:
      "You can easily add, remove, or assign role-based permissions to staff under the 'User Management' section in your admin dashboard.",
  },
  {
    question: "What payment options does ZifyPay support?",
    answer:
      "ZifyPay supports cash, card payments, UPI, and popular mobile wallets—all integrated with our zero-fee processing engine.",
  },
  {
    question: "Is customer support available if I need help?",
    answer:
      "Yes, our dedicated support team is available 24/7 via chat, email, and phone to help you resolve issues and keep operations smooth.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full px-14 py-16 flex flex-col md:flex-row gap-12 ">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h2 className="text-5xl font-bold mb-4 text-gray-900">FAQ</h2>
        <p className="text-lg text-gray-600">
          Find answers to the most common questions about zifypay's digital
          fuel station management platform.
        </p>
        <img
          src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/image-420.png"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={faq.question}
            className={`bg-white rounded-xl shadow-sm border transition-colors ${
              openIndex === idx ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-6 text-left focus:outline-none group rounded-xl"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {faq.question}
              </span>
              {openIndex === idx ? (
                <Minus className="text-blue-600 transition-transform" />
              ) : (
                <Plus className="text-blue-600 transition-transform" />
              )}
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`overflow-hidden transition-all duration-300 px-6 ${
                openIndex === idx
                  ? "max-h-40 opacity-100 pb-6"
                  : "max-h-0 opacity-0 pb-0"
              }`}
            >
              <div className="text-gray-700 text-base leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Optional: Add a simple fade-in animation for the answer
// In your global CSS or Tailwind config, add:
// .animate-fade-in { animation: fadeIn 0.2s ease-in; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
