import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TextGeneratorNewLayer from "../../../components/business/dashboard/TextGeneratorNewLayer";

const TextGeneratorNewPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Text Generator" />

        {/* TextGeneratorNewLayer */}
        <TextGeneratorNewLayer />
      </MasterLayout>
    </>
  );
};

export default TextGeneratorNewPage;
