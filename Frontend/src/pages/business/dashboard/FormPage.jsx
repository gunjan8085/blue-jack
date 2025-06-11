import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import FormPageLayer from "../../../components/business/dashboard/FormPageLayer";

const FormPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Input Form" />

        {/* FormPageLayer */}
        <FormPageLayer />
      </MasterLayout>
    </>
  );
};

export default FormPage;
