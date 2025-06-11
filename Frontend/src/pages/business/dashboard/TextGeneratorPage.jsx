import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TextGeneratorLayer from "../../../components/business/dashboard/TextGeneratorLayer";

const TextGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Text Generator" />

        {/* TextGeneratorLayer */}
        <TextGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default TextGeneratorPage;
