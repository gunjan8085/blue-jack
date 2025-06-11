import React from "react";

const features = [
  {
    title: "Manage",
    desc: "Manage everything in one place with smart booking and analytics.",
  },
  {
    title: "Grow",
    desc: "Attract and retain clients on the top marketplace.",
  },
  {
    title: "Get paid",
    desc: "Get paid fast, reduce no-shows, and simplify checkout.",
  },
];

const FeaturesHighlight = () => (
  <section className="tw-bg-[#ecebfc] tw-py-16">
    <div className="tw-max-w-6xl tw-mx-auto">
      <h3 className="tw-text-6xl tw-font-extrabold tw-mb-2">
        Everything you need to run your businesses
      </h3>
      <p className="tw-text-base tw-text-gray-700 tw-mb-8">
        ZifyPay delivers smart features for smoother, faster service—for your
        team and your clients.{" "}
      </p>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
        {features.map((f) => (
          <div key={f.title}>
            <h3 className="tw-font-bold tw-mb-2">{f.title}</h3>
            <p className="tw-text-gray-700">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesHighlight;
