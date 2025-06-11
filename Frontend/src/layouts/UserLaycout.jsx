import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserLayout = ({ children }) => {
  return (
    <>
      {/* <UserNavbar />  */}
      <Outlet />
      <ToastContainer />

      {/* <Footer /> */}
    </>
  );
};

export default UserLayout;
