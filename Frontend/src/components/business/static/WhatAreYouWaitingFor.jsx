import React from "react";
import { useNavigate } from "react-router-dom";

const WhatAreYouWaitingFor = () => {
  const navigate = useNavigate();
  return (
    <section className="tw-bg-gradient-to-r tw-from-[#b46cff] tw-to-[#4f46e5] tw-py-24 tw-text-center">
      <h2 className="tw-text-3xl tw-font-extrabold tw-text-white tw-mb-4">
        What are you waiting for?
      </h2>
      <p className="tw-text-lg tw-text-white tw-mb-8">
        Partner with Fresha and start growing your business today
      </p>
      <button
        onClick={() => navigate("/business/signin")}
        className="tw-bg-white tw-text-black tw-font-semibold tw-px-8 tw-py-3 tw-rounded-full tw-text-base tw-shadow hover:tw-bg-gray-100 tw-transition"
      >
        Get started now <span className="tw-ml-2">&#8594;</span>
      </button>
    </section>
  );
};

export default WhatAreYouWaitingFor;
