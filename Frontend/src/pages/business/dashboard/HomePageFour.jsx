import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerFour from "../../../components/business/dashboard/DashBoardLayerFour";

const HomePageFour = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Cryptocracy" />

        {/* DashBoardLayerFour */}
        <DashBoardLayerFour />
      </MasterLayout>
    </>
  );
};

export default HomePageFour;
