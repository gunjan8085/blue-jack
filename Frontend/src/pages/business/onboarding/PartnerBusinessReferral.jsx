import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const options = [
  "Recommended by a friend",
  "Search engine (e.g. Google, Bing)",
  "Social media",
  "Advert in the mail",
  "Magazine ad",
  "Ratings website (e.g. Capterra, Trustpilot)",
  "Other",
];

const PartnerBusinessReferral = () => {
  const [selected, setSelected] = useState("");
  const [otherText, setOtherText] = useState("");
  const navigate = useNavigate();

  const handleDone = () => {
    // Submit or finish onboarding
    navigate("/booking-dashboard/");
  };

  return (
    <OnboardingStepLayout
      step={5}
      totalSteps={5}
      onContinue={handleDone}
      continueDisabled={!selected || (selected === "Other" && otherText.trim() === "")}
      continueLabel="Done"
      closeLabel="Close"
      isDoneLabel={true}
    >
      <motion.button
        className="tw-mb-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-absolute tw-left-8 tw-top-8"
        onClick={() => navigate("/business/onboarding/partner_business_location")}
      >
        &#8592;
      </motion.button>
      <div className="tw-text-gray-500 tw-mb-2 tw-font-medium">Account setup</div>
      <h6 className="tw-text-4xl tw-font-extrabold tw-mb-2">How did you hear about Blue Jack?</h6>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mt-8">
        {options.map((option) => (
          <div key={option}>
            <motion.label
              className="tw-flex tw-items-center tw-cursor-pointer tw-text-lg tw-font-normal"
            >
              <motion.input
                type="radio"
                name="referral"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className={`tw-mr-4 tw-w-6 tw-h-6 tw-appearance-none tw-border tw-rounded-full ${
                  selected === option 
                    ? 'tw-border-blue-700 tw-bg-blue-600' 
                    : 'tw-border-gray-300'
                } tw-checked:tw-border-blue-700 tw-checked:tw-bg-blue-700`}
              />
              {option}
            </motion.label>
            {selected === "Other" && option === "Other" && (
              <input 
                type="text"
                placeholder="Please specify"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                maxLength={255}
                className="tw-w-full tw-p-2 tw-mt-2 tw-border tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black"
              />
            )}
          </div>
        ))}
      </div>
    </OnboardingStepLayout>
  );
};

export default PartnerBusinessReferral;