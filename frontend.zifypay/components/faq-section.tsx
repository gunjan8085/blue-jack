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
      <section className="bg-[#f3f9fb] text-gray-600 text-xs py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p>
              ¹Square, the Square logo, Square Financial Services, Square
              Capital, and others are trademarks of Block, Inc. and/or its
              subsidiaries. Square Financial Services, Inc. is a wholly owned
              subsidiary of Block, Inc.
            </p>
            <p>
              All loans are issued by Square Financial Services, Inc. Actual fee
              depends upon payment card processing history, loan amount and
              other eligibility factors. A minimum payment of 1/18th of the
              initial loan balance is required every 60 days and full loan
              repayment is required within 18 months. Loan eligibility is not
              guaranteed. All loans are subject to credit approval.
            </p>
            <p>
              ²Block, Inc. is a financial services platform and not an
              FDIC-insured bank. FDIC deposit insurance coverage only protects
              against the failure of an FDIC-insured deposit institution. If you
              have a Square Checking account, up to $250,000 of your balance may
              be covered by FDIC insurance on a pass-through basis through
              Sutton Bank, Member FDIC, subject to aggregation of the account
              holder’s funds held at Sutton Bank and if certain conditions have
              been met.
            </p>
            <p>
              Instant availability of Square payments. Funds generated through
              Square payment processing services are generally available in the
              Square Checking account balance immediately after a payment is
              processed. Fund availability times may vary due to technical
              issues.
            </p>
          </div>

          <div className="space-y-4">
            <p>
              ACH transfer fund availability: Instant availability does not
              apply to funds added to the Square Checking account via ACH
              transfer. ACH credit transfers to your account may take 1–2
              business days.
            </p>
            <p>
              ³Savings accounts are provided by Square Financial Services, Inc.
              Member FDIC. Accrue annual percentage yield (APY) of 1.00% per
              folder on folder balances over $10. APY subject to change, current
              as of 2/18/2025. No minimum deposit is required to open an
              account. Accounts will not be charged monthly fees. Accounts are
              FDIC-insured up to $2,500,000. Pending balances are not subject to
              FDIC insurance.
            </p>
            <p>
              The rate of our savings account is more than 3x the national
              average of 0.45% APY, based on the national average of savings
              accounts rates published in the FDIC Weekly National Rates and
              Rate Caps accurate as of 5/20/2024.
            </p>
            <p>
              © 2024 Square, Inc. and/or Square Financial Services, Inc. All
              rights reserved.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
