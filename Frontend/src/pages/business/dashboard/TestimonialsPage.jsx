import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import TestimonialsLayer from "../../../components/business/dashboard/TestimonialsLayer";

const TestimonialsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Testimonials" />

        {/* TestimonialsLayer */}
        <TestimonialsLayer />
      </MasterLayout>
    </>
  );
};

export default TestimonialsPage;
