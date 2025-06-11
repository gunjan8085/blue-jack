import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ThemeLayer from "../../../components/business/dashboard/ThemeLayer";

const ThemePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Theme" />

        {/* ThemeLayer */}
        <ThemeLayer />
      </MasterLayout>
    </>
  );
};

export default ThemePage;
