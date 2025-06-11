import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import InvoicePreviewLayer from "../../../components/business/dashboard/InvoicePreviewLayer";

const InvoicePreviewPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Invoice - Preview" />

        {/* InvoicePreviewLayer */}
        <InvoicePreviewLayer />
      </MasterLayout>
    </>
  );
};

export default InvoicePreviewPage;
