import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import WidgetsLayer from "../../../components/business/dashboard/WidgetsLayer";

const WidgetsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Wallet" />

        {/* WidgetsLayer */}
        <WidgetsLayer />
      </MasterLayout>
    </>
  );
};

export default WidgetsPage;
