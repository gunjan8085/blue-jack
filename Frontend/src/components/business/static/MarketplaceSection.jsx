import React from "react";

const MarketplaceSection = () => (
  <section className="tw-bg-[#fafbfc] tw-py-24">
    <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-16 tw-px-4">
      {/* Images */}
      <div className="tw-flex-1 tw-flex tw-justify-center tw-gap-8">
        <img
          src="/assets/images/business-landing-page/BuMarketplace.png"
          alt="Marketplace Card"
          className="tw-w-76 tw-rounded-2xl tw-shadow-lg tw-border-2 tw-border-[#ecebfc]"
        />
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          src="/assets/images/business-landing-page/business-vid-sample2.webm"
          alt="Marketplace Map"
          className="tw-w-56 tw-rounded-2xl tw-shadow-lg tw-border-2 tw-border-[#ecebfc]"
        /> */}
      </div>
      {/* Text Content */}
      <div className="tw-flex-1">
        <h3 className="tw-text-6xl tw-font-extrabold tw-mb-4">
          The most popular <span className="tw-text-pink-400">marketplace</span>{" "}
          to grow your business
        </h3>
        <p className="tw-text-lg tw-mb-6">
          Promote your business and reach new clients on the world’s largest
          beauty and wellness marketplace
        </p>
        <ul className="tw-space-y-4">
          <li className="tw-flex tw-items-start">
            <span className="tw-text-pink-400 tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              Boost your visibility by listing on the ZifyPay marketplace.{" "}
            </span>
          </li>
          <li className="tw-flex tw-items-start">
            <span className="tw-text-pink-400 tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              Connect with millions of clients ready to book their next
              appointment.{" "}
            </span>
          </li>
          <li className="tw-flex tw-items-start">
            <span className="tw-text-pink-400 tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              Free up time and get your clients self-booking online 24/7{" "}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default MarketplaceSection;
