import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import SwitchLayer from "../../../components/business/dashboard/SwitchLayer";

const SwitchPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Switch" />

        {/* SwitchLayer */}
        <SwitchLayer />
      </MasterLayout>
    </>
  );
};

export default SwitchPage;
