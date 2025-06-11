import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// import { useAuth } from "../hooks/useAuth";

const BusinessLayout = () => {
  // const location = useLocation();
  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/business/login" state={{ location }} />;
  // }
  return (
    <div className="tw-bg-white">
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default BusinessLayout;
