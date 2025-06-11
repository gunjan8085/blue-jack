import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import BadgesLayer from "../../../components/business/dashboard/BadgesLayer";

const BadgesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Badges" />

        {/* BadgesLayer */}
        <BadgesLayer />
      </MasterLayout>
    </>
  );
};

export default BadgesPage;
