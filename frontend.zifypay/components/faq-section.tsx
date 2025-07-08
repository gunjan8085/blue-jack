"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items?: FAQItem[];
}

export function FAQSection({ title = "FAQ", items }: FAQSectionProps) {
  const faqRef = useRef<HTMLDivElement>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const defaultItems = [
    {
      question: "How do I switch from my current solution?",
      answer:
        "It’s easy and quick to sign up for Square. If you currently use Lightspeed Retail, Shopify POS, or another similar clothing store point-of-sale system, Square will likely fit your needs with an easy-to-use interface. Just select your plan, sign up, and import your inventory. You can easily transfer your existing inventory with bulk intake importing.",
    },
    {
      question: "Can I upgrade my plan?",
      answer:
        "You can upgrade your plan from Free to Plus by subscribing here. You’ll be able to utilize all existing features and you’ll only have to set up the added functionality included with your upgrade. After your 30-day free trial of the Plus plan, you’ll be given the option to pick your plan. If you don’t choose one, you’ll automatically be downgraded to the Free plan.",
    },
    {
      question: "Can I downgrade my plan?",
      answer:
        "You can always downgrade your subscription from Plus to in your Dashboard. When you downgrade, you’ll see messaging in your Dashboard letting you know which features you’ll lose, like certain smart inventory management features, cross-location returns, and barcode label printing. You can see and compare plan features on our pricing page.",
    },
  ];
  

  const faqItems = items && items.length > 0 ? items : defaultItems;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (faqRef.current?.children) {
        gsap.fromTo(
          Array.from(faqRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
        {title}
      </h2>
      <div ref={faqRef} className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              id={`faq-toggle-${index}`}
              aria-expanded={expandedFaq === index}
              aria-controls={`faq-content-${index}`}
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-900">
                {item.question}
              </span>
              {expandedFaq === index ? (
                <Minus className="w-5 h-5 text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {expandedFaq === index && (
              <div
                id={`faq-content-${index}`}
                className="px-6 pb-6 text-gray-600"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
    </section>
  );
}
