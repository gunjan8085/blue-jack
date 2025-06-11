import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import PaymentGatewayLayer from "../../../components/business/dashboard/PaymentGatewayLayer";

const PaymentGatewayPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Settings - PaymentGateway" />

        {/* PaymentGatewayLayer */}
        <PaymentGatewayLayer />
      </MasterLayout>
    </>
  );
};

export default PaymentGatewayPage;
