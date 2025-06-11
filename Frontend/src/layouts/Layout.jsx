import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
// import BusinessFooter from "../components/business/static/footer/BusinessFooter";
// import Footer from "../components/users/static/footer/Footer";
// import Header from "../components/users/static/header/Header";
// import BusinessNavbar from "../components/business/static/navbar/BusinessNavbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  // Check if the path belongs to business routes
  const isBusinessRoute = location.pathname.startsWith("/business");

  return (
    <div className="tw-font-poppins">
      <ToastContainer />
      {/* Conditional Header */}
      {/* {isBusinessRoute ? <BusinessNavbar /> : <Header light={true} />} */}
      {/* Page Content */}
      <Outlet /> {/* ✅ This will render the child components */}
      {/* Conditional Footer */}
      {/* {isBusinessRoute ? <BusinessFooter /> : <Footer />} */}
    </div>
  );
};

export default Layout;
