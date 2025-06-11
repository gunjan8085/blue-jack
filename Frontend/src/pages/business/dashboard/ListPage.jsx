import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ListLayer from "../../../components/business/dashboard/ListLayer";

const ListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / List" />

        {/* ListLayer */}
        <ListLayer />
      </MasterLayout>
    </>
  );
};

export default ListPage;
