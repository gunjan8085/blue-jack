import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CodeGeneratorLayer from "../../../components/business/dashboard/CodeGeneratorLayer";

const CodeGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Code Generator" />

        {/* CodeGeneratorLayer */}
        <CodeGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default CodeGeneratorPage;
