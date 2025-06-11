import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import RoleAccessLayer from "../../../components/business/dashboard/RoleAccessLayer";

const RoleAccessPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Role Access" />

        {/* RoleAccessLayer */}
        <RoleAccessLayer />
      </MasterLayout>
    </>
  );
};

export default RoleAccessPage;
