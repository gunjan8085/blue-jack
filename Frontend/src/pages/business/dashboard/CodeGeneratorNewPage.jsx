import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CodeGeneratorNewLayer from "../../../components/business/dashboard/CodeGeneratorNewLayer";

const CodeGeneratorNewPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Code Generator New" />

        {/* CodeGeneratorNewLayer */}
        <CodeGeneratorNewLayer />
      </MasterLayout>
    </>
  );
};

export default CodeGeneratorNewPage;
