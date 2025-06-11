import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ChatProfileLayer from "../../../components/business/dashboard/ChatProfileLayer";

const ChatProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chat" />

        {/* ChatProfileLayer */}
        <ChatProfileLayer />
      </MasterLayout>
    </>
  );
};

export default ChatProfilePage;
