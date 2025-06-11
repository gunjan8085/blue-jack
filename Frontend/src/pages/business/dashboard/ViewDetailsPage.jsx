import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ViewDetailsLayer from "../../../components/business/dashboard/ViewDetailsLayer";

const ViewDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Email" />

        {/* ViewDetailsLayer */}
        <ViewDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default ViewDetailsPage;
