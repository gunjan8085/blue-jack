import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ButtonLayer from "../../../components/business/dashboard/ButtonLayer";

const ButtonPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Button" />

        {/* ButtonLayer */}
        <ButtonLayer />
      </MasterLayout>
    </>
  );
};

export default ButtonPage;
