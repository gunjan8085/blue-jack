import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TooltipLayer from "../../../components/business/dashboard/TooltipLayer";

const TooltipPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Tooltip" />

        {/* TooltipLayer */}
        <TooltipLayer />
      </MasterLayout>
    </>
  );
};

export default TooltipPage;
