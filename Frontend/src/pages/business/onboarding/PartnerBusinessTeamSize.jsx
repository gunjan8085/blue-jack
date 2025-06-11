import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const teamSizes = [
  "It's just me",
  "2-5 people",
  "6-10 people",
  "11+ people",
];

const PartnerBusinessTeamSize = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected) {
      navigate("/business/onboarding/partner_business_location");
    }
  };

  return (
    <OnboardingStepLayout
      step={3}
      totalSteps={5}
      onContinue={handleContinue}
      continueDisabled={!selected}
    >
      <motion.button
        className="tw-mb-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-absolute tw-left-8 tw-top-8"
        onClick={() => navigate("/business/onboarding/partner_business_services")}
      >
        &#8592;
      </motion.button>
      <div className="tw-text-gray-500 tw-mb-2 tw-font-medium">Account setup</div>
        <h4 className="tw-text-4xl tw-font-extrabold tw-mb-2">What's your team size?</h4>
      <div className="tw-text-gray-500 tw-mb-8 tw-text-lg">
        This will help us set up your calendar correctly
      </div>
      <motion.div className="tw-flex tw-flex-col tw-gap-2 tw-mb-8">
        {teamSizes.map((size) => (
          <motion.button
            key={size}
            type="button"
            className={`tw-w-full tw-text-left tw-p-1 tw-rounded-xl tw-border-2 tw-bg-white tw-text-lg tw-font-medium tw-transition tw-duration-200 ${
              selected === size
                ? "tw-border-blue-700 tw-bg-blue-50"
                : "tw-border-gray-400 hover:tw-border-blue-700"
            }`}
            onClick={() => setSelected(size)}
          >
            <div className={`tw-border-2 tw-rounded-lg tw-p-3 ${
              selected === size
                ? "tw-border-blue-700"
                : "tw-border-gray-400"
            }`}>
              {size}
            </div>
          </motion.button>
        ))}
      </motion.div>
      {selected !== "It's just me" && (
        <div className="tw-flex tw-items-start tw-bg-blue-50 tw-p-4 tw-rounded-lg tw-gap-3 tw-mt-2">
          <Lightbulb className="tw-text-blue-400 tw-mt-1" size={22} />
          <span className="tw-text-gray-700 tw-text-base">
            We'll add 'Admin' as an example employee so you can see how the system works. You can manage employees later once you're in!
          </span>
        </div>
      )}
    </OnboardingStepLayout>
  );
};

export default PartnerBusinessTeamSize;