import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ProgressLayer from "../../../components/business/dashboard/ProgressLayer";

const ProgressPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Progress Bar" />

        {/* ProgressLayer */}
        <ProgressLayer />
      </MasterLayout>
    </>
  );
};

export default ProgressPage;
