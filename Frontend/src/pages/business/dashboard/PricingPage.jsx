import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import PricingLayer from "../../../components/business/dashboard/PricingLayer";

const PricingPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Pricing" />

        {/* PricingLayer */}
        <PricingLayer />
      </MasterLayout>
    </>
  );
};

export default PricingPage;
