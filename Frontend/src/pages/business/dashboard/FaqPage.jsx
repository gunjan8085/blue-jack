import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import FaqLayer from "../../../components/business/dashboard/FaqLayer";

const FaqPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Faq" />

        {/* FaqLayer */}
        <FaqLayer />
      </MasterLayout>
    </>
  );
};

export default FaqPage;
