import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import KanbanLayer from "../../../components/business/dashboard/KanbanLayer";

const KanbanPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Kanban" />

        {/* KanbanLayer */}
        <KanbanLayer />
      </MasterLayout>
    </>
  );
};

export default KanbanPage;
