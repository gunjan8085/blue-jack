import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import LanguageLayer from "../../../components/business/dashboard/LanguageLayer";

const LanguagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Languages" />

        {/* LanguageLayer */}
        <LanguageLayer />
      </MasterLayout>
    </>
  );
};

export default LanguagePage;
