import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import VideoGeneratorLayer from "../../../components/business/dashboard/VideoGeneratorLayer";

const VideoGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Video Generator" />

        {/* VideoGeneratorLayer */}
        <VideoGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default VideoGeneratorPage;
