import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import DropdownLayer from "../../../components/business/dashboard/DropdownLayer";

const DropdownPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Dropdown" />

        {/* DropdownLayer */}
        <DropdownLayer />
      </MasterLayout>
    </>
  );
};

export default DropdownPage;
