import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import WizardLayer from "../../../components/business/dashboard/WizardLayer";

const WizardPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Wizard" />

        {/* WizardLayer */}
        <WizardLayer />
      </MasterLayout>
    </>
  );
};

export default WizardPage;
