import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TableBasicLayer from "../../../components/business/dashboard/TableBasicLayer";

const TableBasicPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Basic Table" />

        {/* TableBasicLayer */}
        <TableBasicLayer />
      </MasterLayout>
    </>
  );
};

export default TableBasicPage;
