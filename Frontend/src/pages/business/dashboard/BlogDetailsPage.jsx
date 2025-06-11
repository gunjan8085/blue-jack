import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import BlogDetailsLayer from "../../../components/business/dashboard/BlogDetailsLayer";

const BlogDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blog Details" />

        {/* BlogDetailsLayer */}
        <BlogDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default BlogDetailsPage;
