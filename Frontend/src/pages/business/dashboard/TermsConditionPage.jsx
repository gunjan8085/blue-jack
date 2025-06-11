import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TermsConditionLayer from "../../../components/business/dashboard/TermsConditionLayer";

const TermsConditionPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Terms & Conditions" />

        {/* TermsConditionLayer */}
        <TermsConditionLayer />
      </MasterLayout>
    </>
  );
};

export default TermsConditionPage;
