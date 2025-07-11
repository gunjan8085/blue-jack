import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQProps = {
  faqs: FAQItem[];
  title?: string;
  className?: string;
};

export const FAQ: React.FC<FAQProps> = ({
  faqs,
  title = "Frequently Asked Questions",
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className={`w-full max-w-3xl mx-auto py-12 px-4 ${className || ""}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#001A39]">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-2xl bg-[#ebf8ff] shadow-md transition border border-blue-100 overflow-hidden`}
          >
            <button
              className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="text-lg md:text-xl font-semibold text-[#094183]">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === idx ? 90 : 0 }}
                className="ml-4 text-blue-700"
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-6 pb-5 text-[#094183] text-base md:text-lg"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
