import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import BlankPageLayer from "../../../components/business/dashboard/BlankPageLayer";

const BlankPagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blank Page" />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default BlankPagePage;
