import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";
import { useNavigate } from "react-router-dom";
const PartnerBusinessName = () => {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (businessName !== "") {
      navigate("/business/onboarding/partner_business_services");
    }
  };

  return (
    <OnboardingStepLayout
      step={1}
      totalSteps={5}
      onContinue={handleContinue}
      continueDisabled={businessName === ""}
    >
      <div className="tw-text-gray-500 tw-mb-2 tw-font-medium">Account setup</div>
      <h4 className="tw-text-4xl tw-font-extrabold tw-mb-2">What's your business name?</h4>
      <div className="tw-text-gray-500 tw-mb-8 tw-text-lg">
        This is the brand name your clients will see. Your billing and legal name can be added later.
      </div>
      <form>
        <label className="tw-block tw-font-semibold tw-mb-1">Business name</label>
        <div className="tw-flex tw-flex-col">
          <input
            type="text"
            className={`tw-w-full tw-p-3 tw-mb-1 tw-border tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black ${
              businessName === "" ? "tw-border-red-500" : "tw-border-gray-500"
            }`}
            placeholder=""
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
          />
          {businessName === "" && (
            <span className="tw-text-red-500 tw-text-sm tw-mb-6">
              Business name is required
            </span>
          )}
        </div>
        <label className="tw-block tw-font-semibold tw-mb-1">Website <span className="tw-font-normal tw-text-gray-400">(Optional)</span></label>
        <input
          type="text"
          className="tw-w-full tw-p-3 tw-mb-6 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black"
          placeholder="www.yoursite.com"
          value={website}
          onChange={e => setWebsite(e.target.value)}
        />
      </form>
    </OnboardingStepLayout>
  );
};

export default PartnerBusinessName; 