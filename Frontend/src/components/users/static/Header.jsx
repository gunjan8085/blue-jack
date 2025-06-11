import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useClickOutside } from "@hook/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Searchbar from "./Searchbar";
import { useAuth } from "@hook/useAuth";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // State for menu visibility
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  const { user, logOutUser } = useAuth();

  const handleLogOut = () => {
    logOutUser();
    toast.success("logout successful");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/user/profile");
  };

  const handleAppointmentClick = () => {
    navigate("/user/appointments");
  };

  return (
    <header className="tw-w-full tw-px-8 tw-py-4 tw-flex tw-justify-between tw-relative tw-items-center tw-top-0 tw-z-50">
      <motion.div
        className="tw-text-xl tw-font-bold"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        viewport={{ once: false }}
        onClick={() => navigate("/")}
      >
        Brand
      </motion.div>
      {(location.pathname.includes("search") ||
        location.pathname.includes("business") ||
        location.pathname.includes("user/appointments") ||
        location.pathname.includes("user/profile")) && <Searchbar />}

      <div className="tw-flex tw-gap-4 tw-items-center">
        {!user && (
          <motion.button
            onClick={() => navigate("/auth")}
            className="tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            viewport={{ once: false }}
          >
            Log In
          </motion.button>
        )}

        {user &&
          user.role == "User" &&
          !location.pathname.includes("user/profile") && (
            <motion.button
              onClick={() => navigate("/user/profile")}
              className="tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
              viewport={{ once: false }}
            >
              Profile
            </motion.button>
          )}

        {(!user || (user && user.role !== "Business")) && (
          <motion.button
            onClick={() => {
              navigate("/for-business")
            }}
            className="tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            viewport={{ once: false }}
          >
            For Business
          </motion.button>
        )}
        {user && user.role == "Business" && (
          <motion.button
            onClick={() => navigate("/booking-dashboard")}
            className="tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            viewport={{ once: false }}
          >
            Dashboard
          </motion.button>
        )}
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="tw-relative tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl tw-flex tw-gap-2 tw-items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.6,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: false }}
        >
          Menu
          <FaCaretDown />
        </motion.button>
        {/* Menu options */}
        {showMenu && (
          <nav
            ref={menuRef}
            className="tw-absolute tw-top-full tw-right-2 tw-bg-white tw-shadow-md tw-rounded-md tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-z-50"
          >
            {user && user.role == "User" && (
              <motion.span className="tw-font-semibold tw-text-lg tw-cursor-pointer hover:tw-text-black/80">
                {user.firstName} {user.lastName}
              </motion.span>
            )}
            {user &&
              user.role == "User" &&
              !location.pathname.includes("user/profile") && (
                <motion.div
                  // ref={menuRef}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleProfileClick}
                  className="tw-cursor-pointer"
                >
                  Profile
                </motion.div>
              )}
            {user &&
              user.role == "user" &&
              !location.pathname.includes("user/appointments") && (
                <motion.div
                  // ref={menuRef}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleAppointmentClick}
                  className="tw-cursor-pointer"
                >
                  Appointments
                </motion.div>
              )}
            {(!user || (user && user.role !== "Business")) && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/for-business")}
                className="tw-cursor-pointer"
                // ref={menuRef}
              >
                For Business
              </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/customer-support")}
              className="tw-cursor-pointer"
              // ref={menuRef}
            >
              Help and Support
            </motion.div>
            {!user && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/auth")}
                className="tw-cursor-pointer"
                // ref={menuRef}
              >
                Log In
              </motion.div>
            )}
            {user && user.role == "User" && (
              <motion.div
                // ref={menuRef}
                onClick={handleLogOut}
                className="tw-cursor-pointer"
              >
                Logout
              </motion.div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
