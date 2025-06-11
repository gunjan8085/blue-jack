import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CompanyLayer from "../../../components/business/dashboard/CompanyLayer";

const CompanyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Company" />

        {/* CompanyLayer */}
        <CompanyLayer />
      </MasterLayout>
    </>
  );
};

export default CompanyPage;
