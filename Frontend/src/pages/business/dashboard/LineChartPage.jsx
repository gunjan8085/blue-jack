import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import LineChartLayer from "../../../components/business/dashboard/LineChartLayer";

const LineChartPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chart - Line Chart" />

        {/* LineChartLayer */}
        <LineChartLayer />
      </MasterLayout>
    </>
  );
};

export default LineChartPage;
