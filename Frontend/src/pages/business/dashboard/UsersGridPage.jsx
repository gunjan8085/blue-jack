import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import UsersGridLayer from "../../../components/business/dashboard/UsersGridLayer";

const UsersGridPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Users Grid" />

        {/* UsersGridLayer */}
        <UsersGridLayer />
      </MasterLayout>
    </>
  );
};

export default UsersGridPage;
