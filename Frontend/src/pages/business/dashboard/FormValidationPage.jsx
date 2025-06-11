import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import FormValidationLayer from "../../../components/business/dashboard/FormValidationLayer";

const FormValidationPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Form Validation" />

        {/* FormValidationLayer */}
        <FormValidationLayer />
      </MasterLayout>
    </>
  );
};

export default FormValidationPage;
