import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TagsLayer from "../../../components/business/dashboard/TagsLayer";

const TagsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Tab & Accordion" />

        {/* TagsLayer */}
        <TagsLayer />
      </MasterLayout>
    </>
  );
};

export default TagsPage;
