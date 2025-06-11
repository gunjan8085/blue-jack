import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import PaginationLayer from "../../../components/business/dashboard/PaginationLayer";

const PaginationPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Pagination" />

        {/* PaginationLayer */}
        <PaginationLayer />
      </MasterLayout>
    </>
  );
};

export default PaginationPage;
