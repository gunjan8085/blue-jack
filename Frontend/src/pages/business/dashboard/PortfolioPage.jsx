import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import PortfolioLayer from "../../../components/business/dashboard/PortfolioLayer";

const PortfolioPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Portfolio" />

        {/* PortfolioLayer */}
        <PortfolioLayer />
      </MasterLayout>
    </>
  );
};

export default PortfolioPage;
