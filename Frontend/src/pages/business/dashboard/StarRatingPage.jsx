import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import StarRatingLayer from "../../../components/business/dashboard/StarRatingLayer";

const StarRatingPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Components / Star Ratings" />

        {/* StarRatingLayer */}
        <StarRatingLayer />
      </MasterLayout>
    </>
  );
};

export default StarRatingPage;
