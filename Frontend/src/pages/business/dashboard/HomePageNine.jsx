import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerNine from "../../../components/business/dashboard/DashBoardLayerNine";

const HomePageNine = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Analytics" />

        {/* DashBoardLayerNine */}
        <DashBoardLayerNine />
      </MasterLayout>
    </>
  );
};

export default HomePageNine;
