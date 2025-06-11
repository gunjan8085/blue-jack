import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CalendarMainLayer from "../../../components/business/dashboard/CalendarMainLayer";

const CalendarMainPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Calendar" />

        {/* CalendarMainLayer */}
        <CalendarMainLayer />
      </MasterLayout>
    </>
  );
};

export default CalendarMainPage;
