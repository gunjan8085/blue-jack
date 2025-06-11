import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import InvoiceEditLayer from "../../../components/business/dashboard/InvoiceEditLayer";

const InvoiceEditPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Invoice - Edit" />

        {/* InvoiceEditLayer */}
        <InvoiceEditLayer />
      </MasterLayout>
    </>
  );
};

export default InvoiceEditPage;
