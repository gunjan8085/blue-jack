import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/business/dashboard/Breadcrumb";
import WalletLayer from "../../../components/business/dashboard/WalletLayer";

const WalletPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Wallet" />

        {/* WalletLayer */}
        <WalletLayer />
      </MasterLayout>
    </>
  );
};

export default WalletPage;
