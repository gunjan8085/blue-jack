import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import InvoiceListLayer from "../../../components/business/dashboard/InvoiceListLayer";

const InvoiceListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Invoice - List" />

        {/* InvoiceListLayer */}
        <InvoiceListLayer />
      </MasterLayout>
    </>
  );
};

export default InvoiceListPage;
