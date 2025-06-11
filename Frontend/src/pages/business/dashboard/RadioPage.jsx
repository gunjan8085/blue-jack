import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import RadioLayer from "../../../components/business/dashboard/RadioLayer";

const RadioPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Radio" />

        {/* RadioLayer */}
        <RadioLayer />
      </MasterLayout>
    </>
  );
};

export default RadioPage;
