import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import VideosLayer from "../../../components/business/dashboard/VideosLayer";

const VideosPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Videos" />

        {/* VideosLayer */}
        <VideosLayer />
      </MasterLayout>
    </>
  );
};

export default VideosPage;
