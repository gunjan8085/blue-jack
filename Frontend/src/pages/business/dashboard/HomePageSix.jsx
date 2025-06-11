import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerSix from "../../../components/business/dashboard/DashBoardLayerSix";

const HomePageSix = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="LMS / Learning System" />

        {/* DashBoardLayerSix */}
        <DashBoardLayerSix />
      </MasterLayout>
    </>
  );
};

export default HomePageSix;
