import React from "react";

const AllInOneSoftware = () => (
  <section className="tw-bg-white tw-py-24">
    <div className="tw-max-w-6xl tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-16">
      {/* Text Content */}
      <div className="tw-flex-1">
        <h3 className="tw-text-6xl tw-font-extrabold tw-mb-4">
          All-in-one <span className="tw-text-[#b46cff]">software</span> to run
          your business
        </h3>
        <p className="tw-text-lg tw-mb-6">
          The most loved and top-rated booking software trusted by businesses of
          all kinds.{" "}
        </p>
        <ul className="tw-space-y-4 tw-mb-2">
          <li className="tw-flex tw-items-start">
            <span className="tw-text-[#b46cff] tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              <b>Powerful calendar</b> with unlimited bookings, clients,
              locations, and much more
            </span>
          </li>
          <li className="tw-flex tw-items-start">
            <span className="tw-text-[#b46cff] tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              <b>Get a 360°</b> client view with insights on bookings,
              preferences, payments, and more.
            </span>
          </li>
          <li className="tw-flex tw-items-start">
            <span className="tw-text-[#b46cff] tw-mr-2 tw-mt-1">&#10003;</span>
            <span>
              Crafted to deliver a smooth experience that enhances your business
              and elevates your brand
            </span>
          </li>
        </ul>
      </div>
      {/* Images */}
      <div className="tw-flex-1 tw-flex tw-justify-center tw-gap-8">
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          src="/assets/images/business-landing-page/BuAllinOne.png"
          alt="Profile"
          className="tw-w-44 tw-h-80 tw-rounded-2xl tw-shadow-lg tw-border-2 tw-border-[#ecebfc]"
        /> */}
        <img
          src="/assets/images/business-landing-page/BuAllinOne.png"
          alt="AllInOne"
          className="tw-w-76 tw-rounded-2xl tw-shadow-lg tw-border-2 tw-border-[#ecebfc]"
        />
      </div>
    </div>
  </section>
);

export default AllInOneSoftware;
