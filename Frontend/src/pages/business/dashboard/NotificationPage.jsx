import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import NotificationLayer from "../../../components/business/dashboard/NotificationLayer";

const NotificationPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Notification" />

        {/* NotificationLayer */}
        <NotificationLayer />
      </MasterLayout>
    </>
  );
};

export default NotificationPage;
