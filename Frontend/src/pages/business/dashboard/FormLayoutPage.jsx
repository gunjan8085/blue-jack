import React from "react";
import FormLayoutLayer from "../../../components/business/dashboard/FormLayoutLayer";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";

const FormLayoutPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Input Layout" />

        {/* FormLayoutLayer */}
        <FormLayoutLayer />
      </MasterLayout>
    </>
  );
};

export default FormLayoutPage;
