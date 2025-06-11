import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Pencil, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const PartnerBusinessLocation = () => {
  const [address, setAddress] = useState("");
  const [noAddress, setNoAddress] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    apt: "",
    district: "",
    city: "",
    county: "",
    state: "",
    postcode: "",
    country: "",
    directions: ""
  });
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/business/onboarding/partner_business_referral");
  };

  const handleEditClick = () => setShowDialog(true);

  const handleDialogClose = () => setShowDialog(false);

  const handleDialogSave = (e) => {
    e.preventDefault();
    setAddress(location.address);
    setShowDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showDialog, setShowDialog] = useState(false);

  return (
    <OnboardingStepLayout
      step={4}
      totalSteps={5}
      onContinue={handleContinue}
      continueDisabled={!noAddress && !address.trim()}
    >
      <motion.button
        className="tw-mb-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-absolute tw-left-8 tw-top-8"
        onClick={() => navigate("/business/onboarding/partner_business_team_size")}
      >
        &#8592;
      </motion.button>
      <div className="tw-text-gray-500 tw-mb-2 tw-font-medium">Account setup</div>
      <h4 className="tw-text-4xl tw-font-extrabold tw-mb-2">Set your location address</h4>
      <div className="tw-text-gray-500 tw-mb-8 tw-text-lg">
        Add your business location so your clients can easily find you.
      </div>
      <form>
        <label className="tw-block tw-font-semibold tw-mb-1">
          Where's your business located?
        </label>
        <div className="tw-relative tw-mb-6">
          <div className="tw-flex tw-items-center">
            <span className="tw-absolute tw-left-4 tw-text-gray-400">
              <MapPin size={20} />
            </span>
            <input
              type="text"
              className={`tw-w-full tw-p-3 tw-pl-12 tw-border tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black`}
              placeholder="Enter your business address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={noAddress}
              autoCapitalize="words"

            />
            <button
              type="button"
              className="tw-absolute tw-right-4 tw-text-gray-400 hover:tw-text-black"
              onClick={handleEditClick}
            >
              <Pencil size={20} />
            </button>
          </div>
          
        </div>
        <div className="tw-flex tw-items-center tw-mb-2">
          <div className="tw-relative tw-w-5 tw-h-5 tw-mr-2">
            <input
              type="checkbox"
              id="no-address"
              className="tw-w-full tw-h-full tw-rounded tw-border-gray-300 tw-text-white focus:tw-ring-blue-500 tw-appearance-none tw-bg-white checked:tw-bg-blue-700 checked:tw-border-blue-700"
              checked={noAddress}
              onChange={() => setNoAddress((v) => !v)}
            />
            {noAddress && (
              <Check
                size={16}
                className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-pointer-events-none tw-text-white"
              />
            )}
          </div>

          <label
            htmlFor="no-address"
            className="tw-text-base tw-text-gray-700 tw-flex tw-items-center"
          >
            I don't have a business address (mobile and online services only)
          </label>
        </div>
      </form>

      {/* Edit Location Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="tw-bg-white tw-rounded-xl tw-shadow-xl tw-p-8 tw-w-full tw-max-w-lg tw-relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                className="tw-absolute tw-top-4 tw-right-4 tw-bg-transparent tw-border-none tw-cursor-pointer"
                onClick={handleDialogClose}
                aria-label="Close"
              >
                <X size={22} className="tw-text-gray-400 hover:tw-text-black" />
              </button>
              <h6 className="tw-text-2xl tw-font-bold tw-mb-6">Edit business location</h6>
              <form onSubmit={handleDialogSave}>
                <div className="tw-flex tw-gap-4 tw-mb-4">
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      maxLength={100}
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded tw-mb-0"
                      value={location.address}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      Apt./Suite etc
                    </label>
                    <input
                      type="text"
                      name="apt"
                      maxLength={100}
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.apt}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-4 tw-mb-4">
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.district}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.city}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-4 tw-mb-4">
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      County
                    </label>
                    <input
                      type="text"
                      name="county"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.county}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.state}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-4 tw-mb-4">
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.postcode}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.country}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-4 tw-mb-4">
                  <div className="tw-flex-1">
                    <label className="tw-block tw-text-gray-700 tw-mb-1 tw-font-medium">
                      Directions
                    </label>
                    <input
                      type="text"
                      name="directions"
                      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
                      value={location.directions}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="tw-flex tw-justify-end tw-gap-2">
                  <button
                    type="button"
                    onClick={handleDialogClose}
                    className="tw-px-4 tw-py-2 tw-text-gray-600 tw-bg-gray-100 tw-rounded tw-font-medium hover:tw-bg-gray-200 focus:tw-outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="tw-px-4 tw-py-2 tw-bg-black tw-text-white tw-rounded tw-font-medium hover:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingStepLayout>
  );
};

export default PartnerBusinessLocation;