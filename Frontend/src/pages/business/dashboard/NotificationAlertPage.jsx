import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import NotificationAlertLayer from "../../../components/business/dashboard/NotificationAlertLayer";

const NotificationAlertPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Notification Alert" />

        {/* NotificationAlertLayer */}
        <NotificationAlertLayer />
      </MasterLayout>
    </>
  );
};

export default NotificationAlertPage;
