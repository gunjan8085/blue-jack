import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AccountType = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === "new") {
      navigate("/business/onboarding/partner_business_name");
    } else {
      //navigate("/business/onboarding/business-details");
    }
  };

  return (
    <motion.div className="tw-min-h-screen tw-flex tw-bg-white tw-relative">
    {/* Left: Content */}
    <motion.div className="tw-flex-1 tw-flex tw-items-center tw-justify-center">
      <motion.div className="tw-w-full tw-max-w-lg tw-px-4">
        <h6 className="tw-text-2xl tw-font-extrabold tw-mb-12 tw-text-center">
          How would you like to set up<br />your professional account?
        </h6>
        <motion.div className="tw-space-y-6">
          <motion.button
            className="tw-w-full tw-bg-white tw-border tw-border-gray-200 tw-rounded-xl tw-p-6 tw-flex tw-items-center tw-justify-between tw-text-lg tw-font-medium tw-shadow-sm tw-transition hover:tw-border-black"
            onClick={() => handleSelect("new")}
          >
            <span>Create a new business account</span>
            <ArrowRight />
          </motion.button>
          <motion.button
            className="tw-w-full tw-bg-white tw-border tw-border-gray-200 tw-rounded-xl tw-p-6 tw-flex tw-items-center tw-justify-between tw-text-lg tw-font-medium tw-shadow-sm tw-transition hover:tw-border-black"
            onClick={() => handleSelect("join")}
          >
            <motion.span>
              Join an existing business on Fresha
              <motion.div className="tw-text-gray-500 tw-text-base tw-font-normal">
                Find the business you want to join
              </motion.div>
            </motion.span>
            <ArrowRight />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
    {/* Right: Image */}
    <motion.div className="tw-flex-1 tw-hidden md:tw-block">
      <img
        src="\assets\images\auth\auth-paper.jpg"
        alt="Onboarding"
        className="tw-w-full tw-h-screen tw-object-cover"
      />
      </motion.div>
    </motion.div>
  );
};

export default AccountType;