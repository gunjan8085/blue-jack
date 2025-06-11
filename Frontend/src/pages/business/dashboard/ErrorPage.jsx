import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ErrorLayer from "../../../components/business/dashboard/ErrorLayer";

const ErrorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="404" />

        {/* ErrorLayer */}
        <ErrorLayer />
      </MasterLayout>
    </>
  );
};

export default ErrorPage;
