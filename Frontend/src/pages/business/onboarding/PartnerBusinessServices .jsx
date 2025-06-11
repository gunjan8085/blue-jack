import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";
// Import your icons here, or use placeholders
import { Scissors, User, Eye, SprayCan, Heart, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const servicesList = [
  { label: "Haircuts & styling", icon: <Scissors /> },
  { label: "Nail services", icon: <User /> },
  { label: "Eyebrows & lashes", icon: <Eye /> },
  { label: "Facials & skincare", icon: <SprayCan /> },
  { label: "Injectables & fillers", icon: <Heart /> },
  { label: "Makeup", icon: <User /> },
  { label: "Barbering", icon: <Scissors /> },
  { label: "Massage", icon: <Heart /> },
  { label: "Hair extensions", icon: <User /> },
  { label: "Hair removal", icon: <SprayCan /> },
  { label: "Tattoo & piercing", icon: <Heart /> },
  { label: "Fitness", icon: <Dumbbell /> },
  { label: "Other", icon: <User /> },
];

const PartnerBusinessServices = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  
  const toggleService = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : prev.length < 4
        ? [...prev, label]
        : prev
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      navigate("/business/onboarding/partner_business_team_size");
    } else {
      toast.error("Please select at least one service");
    }
  };
  


  return (
    <OnboardingStepLayout
      step={2}
      totalSteps={5}
      onContinue={handleContinue}
      continueDisabled={selected.length === 0}
    >
      <motion.button
        className="tw-mb-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-absolute tw-left-8 tw-top-8"
        onClick={() => navigate("/business/onboarding/partner_business_name")}
      >
        &#8592;
      </motion.button>
      <h4 className="tw-text-4xl tw-font-extrabold tw-mb-2">What services do you offer?</h4>
      <div className="tw-text-gray-500 tw-mb-8 tw-text-lg">
        Choose your primary and up to 3 related service types
      </div>
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6">
        {servicesList.map((service) => (
          <motion.button
            key={service.label}
            type="button"
            className={`tw-flex tw-items-center tw-gap-4 tw-p-6 tw-border tw-rounded-xl tw-shadow-sm tw-text-lg tw-font-medium tw-transition tw-duration-200 ${
              selected.includes(service.label)
                ? "tw-border-blue-700 tw-bg-blue-50 tw-text-blue-700"
                : selected.length >= 4 && !selected.includes(service.label)
                ? "tw-border-gray-200 tw-opacity-50 tw-cursor-not-allowed tw-bg-white"
                : "tw-border-gray-200 hover:tw-border-black tw-bg-white"
            }`}
            onClick={() => toggleService(service.label)}
            disabled={selected.length >= 4 && !selected.includes(service.label)}
          >
            <span className={`tw-text-2xl ${selected.includes(service.label) ? "tw-text-blue-700" : ""}`}>
              {service.icon}
            </span>
            <span>{service.label}</span>
          </motion.button>
        ))}
      </div>
    </OnboardingStepLayout>
  );
};

export default PartnerBusinessServices;