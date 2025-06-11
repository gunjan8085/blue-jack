import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DashBoardLayerTwo from "../../../components/business/dashboard/DashBoardLayerTwo";

const HomePageTwo = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="CRM" />

        {/* DashBoardLayerTwo */}
        <DashBoardLayerTwo />
      </MasterLayout>
    </>
  );
};

export default HomePageTwo;
