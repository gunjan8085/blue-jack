import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import GalleryHoverLayer from "../../../components/business/dashboard/GalleryHoverLayer";

const GalleryHoverPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Gallery Hover" />

        {/* GalleryHoverLayer */}
        <GalleryHoverLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryHoverPage;
