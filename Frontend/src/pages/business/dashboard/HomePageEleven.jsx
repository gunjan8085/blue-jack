import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerEleven from "../../../components/business/dashboard/DashBoardLayerEleven";

const HomePageEleven = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Finance & Banking" />

        {/* DashBoardLayerEleven */}
        <DashBoardLayerEleven />
      </MasterLayout>
    </>
  );
};

export default HomePageEleven;
