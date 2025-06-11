import React, { useRef } from "react";

const stats = [
  {
    value: "26%",
    label: "More clients",
    desc: "Attract clients and build loyalty on the world’s largest beauty marketplace for a fully booked day, every day.",
  },
  {
    value: "89%",
    label: "Fewer no-shows",
    desc: "Reduce no-shows and cancellations by taking a deposit or a full payment upfront.",
  },
  {
    value: "20%",
    label: "More sales",
    desc: "Generate more sales by upselling services when clients book online.",
  },
  {
    value: "290%",
    label: "More tips",
    desc: "Earn more tips when clients book through ZifyPay, your website, Google, or social media.",
  },
];

const BossYourBusiness = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: dir * (width * 0.7),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="tw-bg-white tw-py-20">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
        <h3 className="tw-text-6xl tw-font-extrabold tw-text-left tw-mb-2">
          Boss your business
        </h3>
        <p className="tw-text-lg tw-mb-10 tw-text-gray-600">
          At ZifyPay, we help grow your business, attract clients, and boost
          sales. See how businesses thrive with us.{" "}
        </p>
        <div className="tw-relative">
          {/* Arrows */}
          <button
            className="tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2 tw-bg-white tw-border tw-rounded-full tw-shadow tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-z-10 tw-hidden md:tw-flex"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            type="button"
          >
            &#8592;
          </button>
          <button
            className="tw-absolute tw-right-0 tw-top-1/2 -tw-translate-y-1/2 tw-bg-white tw-border tw-rounded-full tw-shadow tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-z-10 tw-hidden md:tw-flex"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            type="button"
          >
            &#8594;
          </button>
          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="tw-overflow-x-auto tw-flex tw-gap-6 tw-scrollbar-hide tw-py-4 tw-px-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-2xl tw-shadow-sm tw-p-8 tw-min-w-[280px] tw-max-w-xs tw-flex tw-flex-col tw-h-[260px] tw-justify-between"
              >
                <div>
                  <div className="tw-text-3xl tw-font-extrabold tw-text-[#7c3aed] tw-mb-2">
                    {s.value}
                  </div>
                  <div className="tw-font-bold tw-mb-2">{s.label}</div>
                  <div className="tw-text-gray-700 tw-text-sm">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BossYourBusiness;
