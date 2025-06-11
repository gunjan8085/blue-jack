import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import StarredLayer from "../../../components/business/dashboard/StarredLayer";

const StarredPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Email" />

        {/* StarredLayer */}
        <StarredLayer />
      </MasterLayout>
    </>
  );
};

export default StarredPage;
