import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "@hook/useAuth";
import authService from "../../../services/authService";

const UserSignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const countries = [
    { code: "+91", name: "India", phone: "+91" },
    { code: "+1", name: "United States", phone: "+1" },
    { code: "+44", name: "United Kingdom", phone: "+44" },
    { code: "+49", name: "Germany", phone: "+49" },
    { code: "+33", name: "France", phone: "+33" },
    { code: "+31", name: "Netherlands", phone: "+31" },
    { code: "+46", name: "Sweden", phone: "+46" },
    { code: "+41", name: "Switzerland", phone: "+41" },
    { code: "+34", name: "Spain", phone: "+34" },
  ];
  const [country, setCountry] = useState("India");
  const [mobileCode, setMobileCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const location = useLocation();
  const userEmail = location.state?.email || "";
  const userPassword = location.state?.password || "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(userPassword);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    password: false,
    mobile: false,
  });
  const { user, updateUser } = useAuth();

  if (user) return <Navigate to="/" />;

  const handleContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (agree) {
        const payload = {
          firstName: firstName,
          lastName: lastName,
          email: userEmail,
          password: password,
          profilePicUrl: null,
          phoneNumber: mobile,
          country: country,
          favourites: [],
          recentlyViewed: null,
        };

        const response = await authService.createUser(payload);
        console.log(response);
        if (response?.data?.success) {
          const userData = response.data.data.user;
          const token = response.data.data.token;

          await updateUser({
            profilePicUrl: userData.profilePicUrl,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: "User",
            token,
            userId: userData._id,
          });

          toast.success("You're registered successfully");

          navigate("/");
        }
      } else {
        toast.error("Please agree to the terms and conditions");
      }
    } catch (err) {
      console.error(err);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="tw-min-h-screen tw-flex tw-bg-white tw-relative">
      {/* Left: Form */}
      <motion.button
        onClick={() => navigate("/auth")}
        className="tw-absolute tw-top-4 tw-left-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-z-10"
      >
        &#8592;
      </motion.button>
      <div className="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-8">
        <div className="tw-w-full tw-max-w-md tw-mt-16">
          <h6 className="tw-text-6xl tw-font-bold tw-mb-2 tw-text-center">
            Create a professional account
          </h6>
          <p className="tw-text-gray-500 tw-text-center tw-mb-8">
            You're almost there! Create your new account for{" "}
            <span className="tw-font-semibold tw-text-black">{userEmail}</span>{" "}
            by completing these details.
          </p>
          <motion.form onSubmit={handleContinue} className="tw-mb-4">
            <label className="tw-block tw-text-[16px] tw-font-semibold tw-mb-1">
              First name
            </label>
            <motion.input
              type="text"
              className={`tw-w-full tw-text-[16px] tw-p-3 tw-mb-1 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none ${
                errors.firstName ? "tw-border-red-500" : "focus:tw-border-black"
              }`}
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors((prev) => ({ ...prev, firstName: false }));
              }}
            />
            {errors.firstName && (
              <p className="tw-text-red-500 tw-text-sm tw-mb-3">
                First name is required
              </p>
            )}

            <label className="tw-block tw-text-[16px] tw-font-semibold tw-mb-1">
              Last name
            </label>
            <motion.input
              type="text"
              className={`tw-w-full tw-text-[16px] tw-p-3 tw-mb-1 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none ${
                errors.lastName ? "tw-border-red-500" : "focus:tw-border-black"
              }`}
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors((prev) => ({ ...prev, lastName: false }));
              }}
            />
            {errors.lastName && (
              <p className="tw-text-red-500 tw-text-sm tw-mb-3">
                Last name is required
              </p>
            )}

            <label className="tw-block tw-text-[16px] tw-font-semibold tw-mb-1">
              Password
            </label>
            <div className="tw-relative tw-mb-1">
              <motion.input
                type={showPassword ? "text" : "password"}
                className={`tw-w-full tw-text-[16px] tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none ${
                  errors.password
                    ? "tw-border-red-500"
                    : "focus:tw-border-black"
                }`}
                placeholder="Enter a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: false }));
                }}
              />
              <span
                className="tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-cursor-pointer tw-text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="tw-text-red-500 tw-text-sm tw-mb-3">
                Password is required
              </p>
            )}

            <label className="tw-block tw-text-[16px] tw-font-semibold tw-mb-1">
              Mobile number
            </label>
            <div className="tw-flex tw-gap-2 tw-mb-1">
              <select
                className="tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black"
                value={mobileCode}
                onChange={(e) => {
                  const selectedCountry = countries.find(
                    (c) => c.phone === e.target.value
                  );
                  setMobileCode(e.target.value);
                  if (selectedCountry) {
                    setCountry(selectedCountry.code);
                  }
                }}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.phone}>
                    {country.phone}
                  </option>
                ))}
              </select>
              <motion.input
                type="tel"
                className={`tw-flex-1 tw-text-[16px] tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none ${
                  errors.mobile ? "tw-border-red-500" : "focus:tw-border-black"
                }`}
                placeholder="Enter your mobile number"
                value={mobile}
                maxLength={12}
                pattern="[0-9]*"
                inputMode="numeric"
                onChange={(e) => {
                  setMobile(e.target.value);
                  setErrors((prev) => ({ ...prev, mobile: false }));
                }}
              />
            </div>
            {errors.mobile && (
              <p className="tw-text-red-500 tw-text-sm tw-mb-3">
                Mobile number is required
              </p>
            )}

            <div className="form-switch tw-mt-4 tw-mb-4 switch-primary d-flex align-items-center justify-content-center">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                onClick={() => setAgree((a) => !a)}
                defaultChecked=""
              />
              <div className="tw-flex tw-ml-2 tw-items-center tw-cursor-pointer">
                <span className="tw-text-sm">
                  I agree to the{" "}
                  <motion.a
                    href="#"
                    className="tw-text-purple-600 hover:tw-underline"
                  >
                    Privacy Policy
                  </motion.a>
                  ,{" "}
                  <motion.a
                    href="#"
                    className="tw-text-purple-600 hover:tw-underline"
                  >
                    Terms of Service
                  </motion.a>{" "}
                  and{" "}
                  <motion.a
                    href="#"
                    className="tw-text-purple-600 hover:tw-underline"
                  >
                    Terms of Business
                  </motion.a>
                  .
                </span>
              </div>
            </div>

            <motion.button
              onClick={() => {
               // e.preventDefault();

                if (!firstName) {
                  setErrors((prev) => ({ ...prev, firstName: true }));
                  return;
                }

                if (!lastName) {
                  setErrors((prev) => ({ ...prev, lastName: true }));
                  return;
                }

                if (!password) {
                  setErrors((prev) => ({ ...prev, password: true }));
                  return;
                }
                if (!mobile || mobile.length === 0) {
                  setErrors((prev) => ({ ...prev, mobile: true }));
                  return;
                }

                if (!agree) {
                  setErrors((prev) => ({ ...prev, agree: true }));
                  return;
                }

                handleContinue();
              }}
              className="tw-w-full tw-text-center tw-bg-black tw-text-white tw-p-3 tw-rounded-lg tw-font-semibold tw-text-lg tw-mb-4 tw-transition hover:tw-bg-gray-900"
            >
              Create account
            </motion.button>
          </motion.form>
          <motion.div className="tw-text-xs tw-text-gray-400 tw-text-center tw-mt-2">
            This site is protected by reCAPTCHA
            <br />
            Google Privacy Policy and Terms of Service apply
          </motion.div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="tw-flex-1 tw-hidden md:tw-block">
        <img
          src="\assets\images\auth\auth-paper-customer.webp"
          alt="Onboarding"
          className="tw-w-full tw-h-screen tw-object-cover"
        />
      </div>
    </motion.div>
  );
};

export default UserSignUp;
