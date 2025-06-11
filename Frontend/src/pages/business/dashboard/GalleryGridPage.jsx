import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import GalleryGridLayer from "../../../components/business/dashboard/GalleryGridLayer";

const GalleryGridPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Gallery Grid" />

        {/* GalleryLayer */}
        <GalleryGridLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryGridPage;
