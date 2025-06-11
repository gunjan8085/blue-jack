import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import PieChartLayer from "../../../components/business/dashboard/PieChartLayer";

const PieChartPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chart - Pie Chart" />

        {/* PieChartLayer */}
        <PieChartLayer />
      </MasterLayout>
    </>
  );
};

export default PieChartPage;
