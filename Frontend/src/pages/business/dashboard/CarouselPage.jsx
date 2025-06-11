import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import CarouselLayer from "../../../components/business/dashboard/CarouselLayer";

const CarouselPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Carousel" />

        {/* CarouselLayer */}
        <CarouselLayer />
      </MasterLayout>
    </>
  );
};

export default CarouselPage;
