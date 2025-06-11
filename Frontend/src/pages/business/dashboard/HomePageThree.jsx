import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerThree from "../../../components/business/dashboard/DashBoardLayerThree";

const HomePageThree = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="eCommerce" />

        {/* DashBoardLayerThree */}
        <DashBoardLayerThree />
      </MasterLayout>
    </>
  );
};

export default HomePageThree;
