import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TableDataLayer from "../../../components/business/dashboard/TableDataLayer";

const TableDataPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Basic Table" />

        {/* TableDataLayer */}
        <TableDataLayer />
      </MasterLayout>
    </>
  );
};

export default TableDataPage;
