import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import MarketplaceLayer from "../../../components/business/dashboard/MarketplaceLayer";

const MarketplacePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Marketplace" />

        {/* MarketplaceLayer */}
        <MarketplaceLayer />
      </MasterLayout>
    </>
  );
};

export default MarketplacePage;
