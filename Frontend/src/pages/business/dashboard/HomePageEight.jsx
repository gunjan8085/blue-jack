import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerEight from "../../../components/business/dashboard/DashBoardLayerEight";

const HomePageEight = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Medical" />

        {/* DashBoardLayerEight */}
        <DashBoardLayerEight />
      </MasterLayout>
    </>
  );
};

export default HomePageEight;
