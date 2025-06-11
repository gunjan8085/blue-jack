import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ImageGeneratorLayer from "../../../components/business/dashboard/ImageGeneratorLayer";

const ImageGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Image Generator" />

        {/* ImageGeneratorLayer */}
        <ImageGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default ImageGeneratorPage;
