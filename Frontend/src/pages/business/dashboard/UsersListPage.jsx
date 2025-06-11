import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import UsersListLayer from "../../../components/business/dashboard/UsersListLayer";

const UsersListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Users Grid" />

        {/* UsersListLayer */}
        <UsersListLayer />
      </MasterLayout>
    </>
  );
};

export default UsersListPage;
