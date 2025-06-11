import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import EmailLayer from "../../../components/business/dashboard/EmailLayer";

const EmailPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Email" />

        {/* EmailLayer */}
        <EmailLayer />
      </MasterLayout>
    </>
  );
};

export default EmailPage;
