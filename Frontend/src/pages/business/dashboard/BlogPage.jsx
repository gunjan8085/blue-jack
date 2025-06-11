import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import BlogLayer from "../../../components/business/dashboard/BlogLayer";

const BlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Blog" />

        {/* BlogLayer */}
        <BlogLayer />
      </MasterLayout>
    </>
  );
};

export default BlogPage;
