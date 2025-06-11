import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CarouselLayer from "../../../components/business/dashboard/CarouselLayer";

const ChatEmptyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chat Empty" />

        {/* CarouselLayer */}
        <CarouselLayer />
      </MasterLayout>
    </>
  );
};

export default ChatEmptyPage;
