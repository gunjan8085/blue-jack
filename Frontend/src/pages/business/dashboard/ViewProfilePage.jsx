import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ViewProfileLayer from "../../../components/business/dashboard/ViewProfileLayer";

const ViewProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="View Profile" />

        {/* ViewProfileLayer */}
        <ViewProfileLayer />
      </MasterLayout>
    </>
  );
};

export default ViewProfilePage;
