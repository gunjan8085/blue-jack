import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import AvatarLayer from "../../../components/business/dashboard/AvatarLayer";

const AvatarPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Avatars" />

        {/* AvatarLayer */}
        <AvatarLayer />
      </MasterLayout>
    </>
  );
};

export default AvatarPage;
