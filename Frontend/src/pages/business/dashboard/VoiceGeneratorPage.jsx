import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import VoiceGeneratorLayer from "../../../components/business/dashboard/VoiceGeneratorLayer";

const VoiceGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Voice Generator" />

        {/* VoiceGeneratorLayer */}
        <VoiceGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default VoiceGeneratorPage;
