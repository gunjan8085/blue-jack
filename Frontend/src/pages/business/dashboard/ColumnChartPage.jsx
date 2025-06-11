import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ColumnChartLayer from "../../../components/business/dashboard/ColumnChartLayer";

const ColumnChartPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chart / Column Chart" />

        {/* ColumnChartLayer */}
        <ColumnChartLayer />
      </MasterLayout>
    </>
  );
};

export default ColumnChartPage;
