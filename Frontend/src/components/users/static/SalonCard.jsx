import React from "react";
import { useNavigate } from "react-router-dom";

const SalonCard = () => {
  const navigate = useNavigate();
  return (
    <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-2xl tw-max-w-md tw-w-full tw-mx-auto">
      {/* Salon Name & Rating Header */}
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <h2 className="text-2xl tw-font-bold tw-text-gray-900">
          White Feather Salon & Academy
        </h2>
        <div className="tw-bg-green-100 tw-text-green-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold">
          5.0 ★
        </div>
      </div>

      {/* Rating Details */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <div className="tw-flex tw-items-center">
          <span className="tw-text-yellow-500 tw-text-2xl">★★★★★</span>
          <span className="tw-text-gray-600 tw-ml-2">5.0</span>
        </div>
        <span className="tw-text-gray-400">(1)</span>
      </div>

      {/* Book Now Button */}
      <button
        className="tw-w-full tw-bg-black tw-text-white tw-py-3 tw-px-4 tw-rounded-lg tw-font-medium hover:tw-bg-gray-800 tw-transition-colors tw-mb-4"
        onClick={() => {
          navigate("/services");
        }}
      >
        Book now
      </button>

      {/* Opening Hours */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <span className="tw-text-green-600 tw-font-medium">Open</span>
        <span className="tw-text-gray-600">until 7:30 pm</span>
      </div>

      {/* Address */}
      <div className="tw-mb-4">
        <p className="tw-text-gray-700">
          Shop-13, Shiv Shankar Tower, 2, Sector 15 Sanpada Rd, beside Suraj
          Hospital, beside Haware koyna CHS, Palm Beach, Sanpada, Shivshankar
          building 2, Thane, Navi Mumbai, Maharashtra
        </p>
      </div>

      {/* Get Directions Button */}
      <button className="tw-text-blue-600 tw-font-medium hover:tw-underline">
        Get directions →
      </button>
    </div>
  );
};

export default SalonCard;
