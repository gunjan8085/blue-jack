import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import MarketplaceDetailsLayer from "../../../components/business/dashboard/MarketplaceDetailsLayer";

const MarketplaceDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Marketplace Details" />

        {/* MarketplaceDetailsLayer */}
        <MarketplaceDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default MarketplaceDetailsPage;
