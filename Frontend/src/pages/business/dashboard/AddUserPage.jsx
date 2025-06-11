import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import AddUserLayer from "../../../components/business/dashboard/AddUserLayer";

const AddUserPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Add User" />

        {/* AddUserLayer */}
        <AddUserLayer />
      </MasterLayout>
    </>
  );
};

export default AddUserPage;
