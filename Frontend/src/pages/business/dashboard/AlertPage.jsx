import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import AlertLayer from "../../../components/business/dashboard/AlertLayer";

const AlertPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Alerts" />

        {/* AlertLayer */}
        <AlertLayer />
      </MasterLayout>
    </>
  );
};

export default AlertPage;
