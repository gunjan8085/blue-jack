import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSectionProps = {
  faqs?: FAQItem[];
  title?: string;
  description?: string;
  moreLink?: string;
  className?: string;
};

const demoFaqs: FAQItem[] = [
  {
    question: "How this work?",
    answer:
      "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "Are there any additional fee?",
    answer:
      "No, there are no hidden or additional fees. Everything is included in your plan.",
  },
  {
    question: "How can I get the app?",
    answer:
      "You can download the app from the App Store or Google Play, or use our web platform.",
  },
  {
    question: "What features do you offer and other not?",
    answer:
      "We offer a full suite of business management tools, including booking, payments, analytics, and more.",
  },
  {
    question: "How can I get the app?",
    answer:
      "You can download the app from the App Store or Google Play, or use our web platform.",
  },
  {
    question: "What features do you offer and other not?",
    answer:
      "We offer a full suite of business management tools, including booking, payments, analytics, and more.",
  },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-2 text-blue-700"
    animate={{ rotate: open ? 90 : 0 }}
    transition={{ duration: 0.2 }}
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = demoFaqs,
  title = "Any questions? We got you.",
  description = "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  moreLink = "#",
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className={`w-full min-h-2screen max-w-6xl mx-auto py-20 px-4 md:px-8 rounded-3xl bg-gradient-to-r from-[#001A39] to-[#001433] ${
        className || ""
      }`}
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-start">
        {/* Left: Heading, description, link */}
        <div className="mb-8 md:mb-0 flex flex-col justify-center h-full">
          <h1 className="text-7xl font-extrabold text-white mb-8 md:mb-4 text-center ">
            FAQ
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-white mb-8 max-w-md">{description}</p>
        </div>
        {/* Right: FAQ Accordion */}
        <div className="w-full md:border-l md:border-blue-200 md:pl-12 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const open = openIndex === idx;
            return (
              <div
                key={idx}
                className={`transition-all duration-200 bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg ${
                  open ? "ring-2 ring-blue-200" : ""
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                  onClick={() => setOpenIndex(open ? -1 : idx)}
                  aria-expanded={open}
                >
                  <span className="text-lg md:text-xl font-semibold text-[#001A39] group-hover:text-blue-700 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronIcon open={open} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-5 bg-[#f0f6ff] text-[#001A39] text-base md:text-lg rounded-b-2xl"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
