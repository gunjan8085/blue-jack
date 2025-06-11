import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CardLayer from "../../../components/business/dashboard/CardLayer";

const CardPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Card" />

        {/* CardLayer */}
        <CardLayer />
      </MasterLayout>
    </>
  );
};

export default CardPage;
