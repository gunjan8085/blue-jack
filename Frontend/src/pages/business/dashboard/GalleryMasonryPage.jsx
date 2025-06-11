import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import GalleryMasonryLayer from "../../../components/business/dashboard/GalleryMasonryLayer";

const GalleryMasonryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Gallery Grid" />

        {/* GalleryLayer */}
        <GalleryMasonryLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryMasonryPage;
