import { useState } from "react";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is ZifyPay's $0 POS Terminal?",
    answer:
      "Our $0 POS Terminal is a mobile solution that transforms your smartphone or tablet into a complete point-of-sale system, eliminating the need for expensive dedicated hardware.",
  },
  {
    question: "How does ZifyPay offer zero credit card processing fees?",
    answer:
      "We use a transparent pricing model where the business can choose to either absorb the fee or pass it on to customers through a small service charge.",
  },
  {
    question: "Are there any hidden fees or contracts?",
    answer:
      "No, ZifyPay is committed to complete transparency. There are no hidden fees, long-term contracts, or cancellation penalties.",
  },
  {
    question: "Who is eligible for the $0 POS Terminal?",
    answer:
      "Any business owner or merchant can sign up for our $0 POS Terminal program. It's designed for businesses of all sizes.",
  },
  {
    question: "What payment methods does the ZifyPay POS Terminal support?",
    answer:
      "Our terminal supports credit/debit cards, contactless payments (NFC), mobile wallets like Apple Pay and Google Pay, and QR code payments.",
  },
  {
    question: "How do I get started with ZifyPay's $0 POS Terminal?",
    answer:
      "Simply download our app, create an account, complete the verification process, and you can start accepting payments immediately.",
  },
  {
    question: "How long does it take to receive and set up the POS terminal?",
    answer:
      "Since it's a BYOD solution, setup can be completed within minutes by downloading our app. If you need a card reader, shipping typically takes 3-5 business days.",
  },
  {
    question: "Is there customer support available if I need help?",
    answer:
      "Yes, we offer 24/7 customer support via phone, email, and live chat to help with any questions or technical issues.",
  },
  {
    question:
      "Can I accept payments from all customers, including contactless payments?",
    answer:
      "Yes, our solution supports all major payment methods including contactless payments, making it convenient for all your customers.",
  },
  {
    question: "Why should I choose ZifyPay over other POS providers?",
    answer:
      "ZifyPay offers a zero-cost hardware solution, competitive processing rates, no contracts, simple setup, and excellent customer support - making it the most cost-effective and flexible solution on the market.",
  },
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          FAQ
        </h2>

        <div className="space-y-4 mb-12">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-900">
                  {item.question}
                </span>
                <Plus
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openFaq === index ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
