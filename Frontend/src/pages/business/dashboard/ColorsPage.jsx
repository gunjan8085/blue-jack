import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ColorsLayer from "../../../components/business/dashboard/ColorsLayer";

const ColorsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Colors" />

        {/* ColorsLayer */}
        <ColorsLayer />
      </MasterLayout>
    </>
  );
};

export default ColorsPage;
