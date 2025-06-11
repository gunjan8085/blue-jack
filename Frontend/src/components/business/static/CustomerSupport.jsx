import React from "react";

const CustomerSupport = () => (
  <section className="tw-bg-white tw-py-20">
    <div className="tw-max-w-6xl tw-mx-auto tw-text-left">
      <h3 className="tw-text-6xl tw-font-extrabold tw-mb-8">
        You are never alone,<br />
        award winning customer support 24/7
      </h3>
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-8 tw-justify-left">
        <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-8 tw-flex-1 tw-text-left">
          <div className="tw-font-bold tw-mb-2">Help Center</div>
          <div className="tw-text-gray-600 tw-mb-4">
            Explore and learn with our help center knowledge base.
          </div>
          <a href="#" className="tw-text-black tw-font-semibold tw-flex tw-items-center hover:tw-underline">
            Go to help center <span className="tw-ml-2">&#8594;</span>
          </a>
        </div>
        <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-8 tw-flex-1 tw-text-left">
          <div className="tw-font-bold tw-mb-2">Contact us</div>
          <div className="tw-text-gray-600 tw-mb-4">
            Contact us via email and phone and one of our team will be there to help.
          </div>
          <a href="#" className="tw-text-black tw-font-semibold tw-flex tw-items-center hover:tw-underline">
            Contact us <span className="tw-ml-2">&#8594;</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CustomerSupport;