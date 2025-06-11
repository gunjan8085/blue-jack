import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import GalleryLayer from "../../../components/business/dashboard/GalleryLayer";

const GalleryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Gallery Grid Desc" />

        {/* GalleryLayer */}
        <GalleryLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryPage;
