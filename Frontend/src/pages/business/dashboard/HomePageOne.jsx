import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerOne from "../../../components/business/dashboard/DashBoardLayerOne";

const HomePageOne = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="AI" />

        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />
      </MasterLayout>
    </>
  );
};

export default HomePageOne;
