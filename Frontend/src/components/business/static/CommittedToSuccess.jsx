import React from "react";

const services = [
  {
    title: "Customer success manager",
    desc: "Get dedicated help to maximize your potential on Fresha"
  },
  {
    title: "Migration support",
    desc: "Our team can help bring your data from other platforms"
  },
  {
    title: "Access our network",
    desc: "Use an Enterprise-certified account manager to bring your business to life"
  },
  {
    title: "Tailored solutions",
    desc: "Have something in mind? Just ask us. We will figure it out together."
  },
  {
    title: "24/7 priority support",
    desc: "Talk with our customer care team anytime. We’re here to help."
  },
  {
    title: "Expert consultation",
    desc: "Get direct access to product experts for guidance on all things Fresha"
  }
];

const CommittedToSuccess = () => (
  <section className="tw-bg-[#f6f6fa] tw-py-20">
    <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
      <h3 className="tw-text-6xl tw-font-extrabold tw-text-left tw-mb-2">Committed to your success</h3>
      <p className="tw-text-lg tw-mb-10 tw-text-gray-600">
      Every business has its own needs, and we have got you covered with a range of professional services      </p>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
        {services.map((s, idx) => (
          <div key={idx}>
            <div className="tw-font-bold tw-mb-2">{s.title}</div>
            <div className="tw-text-gray-700 tw-text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CommittedToSuccess;