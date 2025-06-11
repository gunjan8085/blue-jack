import React from "react";
import { ArrowRight } from "lucide-react";

const OnboardingStepLayout = ({
  step = 1,
  totalSteps = 5,
  onContinue,
  onClose,  
  isDoneLabel = false,
  children,
  continueDisabled = false,
}) => (
  <div className="tw-min-h-screen tw-bg-white tw-flex tw-flex-col">
    {/* Progress Tabs */}
    <div className="tw-flex tw-flex-col tw-gap-4 tw-pt-6 tw-px-8 tw-mb-12">
      <div className="tw-flex tw-flex-1 tw-gap-4">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`tw-h-1 tw-rounded-full ${
              idx < step ? "tw-bg-blue-700" : "tw-bg-gray-200"
            } tw-w-1/${totalSteps}`}
            style={{ flex: 1 }}
          />
        ))}
      </div>
      <button
        className="tw-bg-black tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-shadow tw-self-end disabled:tw-bg-gray-400"
        style={isDoneLabel ? { minWidth: 100 } : { minWidth: 120 }}
        onClick={onContinue}
        disabled={continueDisabled}
      >
        {isDoneLabel ? "Done" : "Continue"}
        {!isDoneLabel && <ArrowRight size={20} />}
      </button>
      {onClose && (
        <button
          className="tw-bg-black tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-semibold tw-flex tw-items-center tw-gap-2 tw-shadow tw-self-end disabled:tw-bg-gray-400"
          style={{ minWidth: 120 }}
          onClick={onClose}
        >
          Close <X size={20} />
        </button>
      )}
    </div>
    {/* Centered Content */}
    <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-start">
      <div className="tw-w-full tw-max-w-4xl tw-mt-2">{children}</div>
    </div>
  </div>
);

export default OnboardingStepLayout;