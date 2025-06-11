import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TypographyLayer from "../../../components/business/dashboard/TypographyLayer";

const TypographyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Typography" />

        {/* TypographyLayer */}
        <TypographyLayer />
      </MasterLayout>
    </>
  );
};

export default TypographyPage;
