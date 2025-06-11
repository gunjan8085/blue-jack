import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerFive from "../../../components/business/dashboard/DashBoardLayerFive";

const HomePageFive = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Investment" />

        {/* DashBoardLayerFive */}
        <DashBoardLayerFive />
      </MasterLayout>
    </>
  );
};

export default HomePageFive;
