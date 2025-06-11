import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import AssignRoleLayer from "../../../components/business/dashboard/AssignRoleLayer";

const AssignRolePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Assign Role" />

        {/* AssignRoleLayer */}
        <AssignRoleLayer />
      </MasterLayout>
    </>
  );
};

export default AssignRolePage;
