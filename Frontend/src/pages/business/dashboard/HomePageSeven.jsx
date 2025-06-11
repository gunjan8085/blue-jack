import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerSeven from "../../../components/business/dashboard/DashBoardLayerSeven";

const HomePageSeven = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="NFT & Gaming" />

        {/* DashBoardLayerSeven */}
        <DashBoardLayerSeven />
      </MasterLayout>
    </>
  );
};

export default HomePageSeven;
