"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I register my fuel station on zifypay?",
    answer:
      "You can register your station by signing up and following the onboarding process in the admin dashboard.",
  },
  {
    question: "Is my data secure on zifypay?",
    answer:
      "Yes, we use industry-standard encryption and security practices to keep your data safe.",
  },
  {
    question: "Can I manage multiple stations from one account?",
    answer:
      "Absolutely! zifypay allows you to manage multiple stations and pumps from a single dashboard.",
  },
  {
    question: "How do I add or remove staff members?",
    answer:
      "You can add or remove staff members in the Users section of the admin dashboard.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "zifypay supports cash, credit/debit cards, and digital wallets for customer transactions.",
  },
  {
    question: "Is there customer support available?",
    answer:
      "Yes, our support team is available 24/7 to assist you with any issues or questions.",
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
