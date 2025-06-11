import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import ChatMessageLayer from "../../../components/business/dashboard/ChatMessageLayer";

const ChatMessagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chat Message" />

        {/* ChatMessageLayer */}
        <ChatMessageLayer />
      </MasterLayout>
    </>
  );
};

export default ChatMessagePage;
