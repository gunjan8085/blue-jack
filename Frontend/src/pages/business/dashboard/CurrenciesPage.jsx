import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CurrenciesLayer from "../../../components/business/dashboard/CurrenciesLayer";

const CurrenciesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Currencies" />

        {/* CurrenciesLayer */}
        <CurrenciesLayer />
      </MasterLayout>
    </>
  );
};

export default CurrenciesPage;
