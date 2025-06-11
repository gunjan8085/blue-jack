import React from "react";
import { useNavigate } from "react-router-dom";
const stats = [
  { value: "120,000+", label: "Partner businesses" },
  { value: "450,000+", label: "Professionals" },
  { value: "1 Billion+", label: "Appointments booked" },
  { value: "120+", label: "Countries" },
];

const features = [
  {
    label: "Online Booking and Scheduling",
    top: "28%",
    left: "50%",
    translate: "-50%, -50%",
  },
  {
    label: "Built-in Marketing Tools",
    top: "54%",
    left: "32%",
    translate: "-50%, -50%",
  },
  {
    label: "Fast, Easy and Secure Payments",
    top: "54%",
    left: "68%",
    translate: "-50%, -50%",
  },
  {
    label: "All in one marketplace",
    top: "78%",
    left: "25%",
    translate: "-50%, -50%",
  },
  {
    label: "POS Integration",
    top: "78%",
    left: "50%",
    translate: "-50%, -50%",
  },
  {
    label: "Review and Rating",
    top: "78%",
    left: "75%",
    translate: "-50%, -50%",
  },
];

const HeroBusiness = () => {
  const navigate = useNavigate();
  return (
    <section className="tw-relative tw-bg-white tw-pb-24 tw-overflow-hidden">
      {/* Heading, Subtitle, Buttons */}
      <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-items-center tw-pt-12 tw-px-4">
        <div className="tw-max-w-5xl tw-text-center tw-mb-8">
          <h4 className="tw-text-6xl tw-font-extrabold tw-mb-4 tw-text-gray-900 tw-leading-tight">
            The #1 software for all types of{" "}
            <span className="tw-text-black">Business</span>
          </h4>
          <p className="tw-text-base tw-mb-10 tw-text-gray-700 tw-font-medium">
            Smart booking software with built-in payments — simple, flexible,
            and ready to grow with your business.
          </p>
          <div className="tw-flex tw-gap-4 tw-justify-center tw-mb-8">
            <button
              onClick={() => navigate("/business/signin")}
              className="tw-bg-black tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-full tw-text-base tw-shadow-lg tw-transition hover:tw-bg-gray-900"
            >
              Get started now
            </button>
            <button className="tw-bg-white tw-text-black tw-font-semibold tw-px-6 tw-py-3 tw-rounded-full tw-border tw-border-black tw-text-base tw-shadow-lg tw-transition hover:tw-bg-gray-100">
              <span className="tw-mr-2">&#9654;</span> Watch an overview
            </button>
          </div>
        </div>

        {/* Triangle + Circles + Features */}
        <div
          className="tw-relative tw-w-full tw-flex tw-justify-center tw-items-center tw-mb-12"
          style={{ minHeight: 420 }}
        >
          {/* Concentric Circles */}
          <svg
            className="tw-absolute tw-inset-0 tw-mx-auto"
            width="520"
            height="420"
            viewBox="0 0 520 420"
            fill="none"
            style={{ zIndex: 1 }}
          >
            <circle
              cx="260"
              cy="320"
              r="200"
              stroke="#a259ff33"
              strokeWidth="2"
            />
            <circle
              cx="260"
              cy="320"
              r="140"
              stroke="#a259ff33"
              strokeWidth="2"
            />
            <circle
              cx="260"
              cy="320"
              r="80"
              stroke="#a259ff33"
              strokeWidth="2"
            />
          </svg>
          {/* Triangle */}
          <svg
            width="420"
            height="360"
            viewBox="0 0 420 360"
            fill="none"
            className="tw-absolute"
            style={{ zIndex: 2 }}
          >
            <defs>
              <linearGradient id="triangleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a259ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6a82fb" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <polygon
              points="210,20 400,340 20,340"
              fill="url(#triangleGradient)"
            />
          </svg>
          {/* Up Arrow Icon */}
          <div
            className="tw-absolute"
            style={{
              top: "8%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          >
            <div className="tw-bg-white tw-rounded-full tw-shadow-lg tw-p-3 tw-flex tw-items-center tw-justify-center tw-w-14 tw-h-14">
              <span className="tw-text-3xl tw-text-purple-500 tw-font-bold">
                &#8593;
              </span>
            </div>
          </div>
          {/* Feature Bubbles */}
          {features.map((f, i) => (
            <div
              key={f.label}
              className="tw-absolute tw-bg-white tw-bg-opacity-80 tw-backdrop-blur-md tw-rounded-full tw-shadow-md tw-px-5 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-border tw-border-gray-200 tw-transition hover:tw-bg-opacity-100"
              style={{
                top: f.top,
                left: f.left,
                transform: `translate(${f.translate})`,
                zIndex: 4,
              }}
            >
              {f.label}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="tw-w-full tw-flex tw-flex-col tw-items-center">
          <div className="tw-text-center tw-mb-2 tw-text-gray-700 tw-text-sm">
            Most recommended <span className="tw-font-bold">5/5</span>{" "}
            <span className="tw-text-yellow-400">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>{" "}
            on Capterra
          </div>
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-12 tw-mt-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="tw-text-center">
                <div className="tw-text-3xl tw-font-extrabold tw-text-black tw-drop-shadow-lg tw-mb-1">
                  {stat.value}
                </div>
                <div className="tw-text-base tw-text-gray-700 tw-opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBusiness;
