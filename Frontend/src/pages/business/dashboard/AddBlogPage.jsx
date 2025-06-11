import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import AddBlogLayer from "../../../components/business/dashboard/AddBlogLayer";

const AddBlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blog Details" />

        {/* AddBlogLayer */}
        <AddBlogLayer />
      </MasterLayout>
    </>
  );
};

export default AddBlogPage;
