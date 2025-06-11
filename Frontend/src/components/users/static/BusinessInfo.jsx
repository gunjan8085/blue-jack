import React from "react";

const BusinessInfo = () => {
  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-flex tw-items-center tw-space-x-6">
        <div>
          <p className="tw-text-4xl tw-text-black tw-font-bold">
            You Do You Hair Studio
          </p>
          <div className="tw-flex tw-text-gray-500  tw-gap-6 text-sm tw-mt-2">
            <p>4.9 ⭐️ (566 reviews)</p>
            <p>Open until 8:00 PM</p>
            <p>Link Rose, Linking Road, Santacruz West, Mumbai</p>
          </div>
        </div>
        <button className="tw-bg-black tw-text-white tw-px-4 tw-py-2">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BusinessInfo;
