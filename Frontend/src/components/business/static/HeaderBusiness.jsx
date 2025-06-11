import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useClickOutside } from "@hook/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@hook/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // State for menu visibility
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  const { user, logOutUser } = useAuth();

  return (
    <header className="tw-w-full tw-px-8 tw-py-4 tw-flex tw-justify-between tw-relative tw-items-center tw-top-0 tw-z-50 tw-bg-white tw-border-b tw-border-white">
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

      <div className="tw-flex tw-gap-4 tw-items-center">
        <motion.button
          onClick={() => navigate("/")}
          className="tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl tw-border tw-border-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: false }}
        >
          Marketplace
        </motion.button>
        {!user && (
          <motion.button
            onClick={() => navigate("/business/signin")}
            className="tw-bg-black tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-full tw-text-base tw-shadow"
          >
            Sign Up
          </motion.button>
        )}
        {user && (
          <motion.button
            onClick={() => navigate("/booking-dashboard")}
            className="tw-bg-black tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-full tw-text-base tw-shadow"
          >
            Dashboard
          </motion.button>
        )}
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="tw-relative tw-cursor-pointer focus:tw-outline-none tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl tw-flex tw-gap-2 tw-items-center tw-border tw-border-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: false }}
        >
          Menu
          <FaCaretDown />
        </motion.button>
        {/* Menu options */}
        {showMenu && (
          <nav className="tw-absolute tw-top-full tw-right-2 tw-bg-white tw-shadow-md tw-rounded-md tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-z-50">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/")}
              className="tw-cursor-pointer"
              ref={menuRef}
            >
              For Customers
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/customer-support")}
              className="tw-cursor-pointer"
            >
              Help and Support
            </motion.div>

            {!user && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/business/signin")}
                className="tw-cursor-pointer"
                ref={menuRef}
              >
                Log In
              </motion.div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
