import React, { useState } from "react";

const faqs = [
  {
    q: "What makes ZifyPay the leading platform for businesses in beauty and wellness?",
    a: "We’re the world’s largest booking platform for beauty and wellness, trusted by over 120,000 businesses for their operations. Businesses choose us because of our powerful, easy-to-use features, including online booking, payment processing, marketing tools, and team management. Our automation simplifies daily tasks, saves time, and enhances efficiency, so you can focus on what matters most. With our global marketplace, we connect your business to millions of potential customers, providing unmatched opportunities for growth, making us the number one platform in beauty and wellness.",
  },
  {
    q: "How does ZifyPay help my business grow?",
    a: "We help your business grow by providing powerful tools to attract new clients, retain existing ones, and streamline your operations. With our global marketplace, you can reach millions of potential customers searching for beauty and wellness services. Marketing tools like automated campaigns, client referrals, and promotional discounts boost bookings, while features like online booking, online payment processing, inventory management, and team scheduling simplify daily tasks. Additionally, real-time analytics enable you to track performance and optimize your business strategies. By automating time-consuming processes and connecting you with more clients, we empower your business to thrive.",
  },
  {
    q: "Are there any hidden costs?",
    a: "We don’t charge any hidden costs. Powerful features are included in our core offering, and we offer optional add-ons, such as online payment processing and marketing tools, where you only pay for what you use. We’re transparent about our pricing, with all details clearly outlined on our pricing page.",
  },
  {
    q: "Is there a minimum commitment or contract?",
    a: "No, there’s no minimum commitment or long-term contract. We’re free to use for independent professionals. For businesses with multiple bookable team members, we offer a flexible monthly subscription model that you can cancel at any time. Plus, businesses with teams can take advantage of a 14-day free trial—no credit card required—to explore the system and see if it’s the right fit.",
  },
  {
    q: "Does ZifyPay support businesses of all sizes?",
    a: "Yes, we’re designed to support businesses of all sizes, from independent professionals to larger teams and enterprise businesses with multiple locations. Whether you’re a solo entrepreneur or managing a growing team, we offer flexible tools and features to suit your needs, including calendar management, marketing tools, and team-specific functionalities.",
  },
  {
    q: "What types of businesses can use ZifyPay?",
    a: "We’re designed for a wide range of businesses in the beauty, wellness, and healthcare industries. ZifyPay is specifically designed for hair salons, spas, nail salons, barbershops, medspas, and massage therapists can all use us to manage bookings, client information, and payments. It’s also a great tool for fitness studios, physical therapy clinics, health practices, tattoo and piercing artists, and tanning studios, offering easy scheduling, streamlined operations, and marketing features tailored to each business type. We also have a growing number of partners using ZifyPay to manage their pet grooming businesses. Whether you're a solo practitioner or part of a larger team, we provide the tools you need to efficiently run your business.",
  },
  {
    q: "How can ZifyPay help reduce no-shows?",
    a: "We help reduce no-shows by offering several key features designed to improve client engagement and accountability. First, we send automated booking reminders via email and text, which helps keep appointments top of mind for your clients. Additionally, we allow businesses to implement a flexible cancellation policy, including setting up deposit or prepayment options, which can encourage clients to honor their bookings. The platform also provides easy rescheduling, which can help clients manage changes without canceling altogether. Together, these features help minimize no-shows and improve client commitment to appointments.",
  },
  {
    q: "Can I migrate my data from my previous system to ZifyPay?",
    a: "Yes, you can migrate data from your old system to ZifyPay. We support importing key information, such as client details and product inventory. For larger partners with more complex needs, we also offer paid packages that provide additional data migration support.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState([]); // No FAQs open by default

  const toggle = (idx) => {
    setOpen((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="tw-bg-[#f6f6fa] tw-py-20">
      <div className="tw-max-w-6xl tw-mx-auto">
        <h3 className="tw-text-6xl tw-font-extrabold tw-mb-8 tw-text-left">
          Frequently asked questions
        </h3>
        <div className="tw-divide-y tw-divide-gray-300">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="tw-w-full tw-text-left tw-py-5 tw-font-semibold tw-flex tw-justify-between tw-items-center focus:tw-outline-none"
                onClick={() => toggle(idx)}
              >
                <span>{faq.q}</span>
                <span className="tw-text-2xl">
                  {open.includes(idx) ? "−" : "+"}
                </span>
              </button>
              {open.includes(idx) && (
                <div className="tw-pb-5 tw-text-gray-700 tw-text-base">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
