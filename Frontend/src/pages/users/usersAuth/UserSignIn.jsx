import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "@hook/useAuth";
import authService from "../../../services/authService";

const UserSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, updateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: false,
  });

  if (user) return <Navigate to="/" />;

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include a lowercase, uppercase, and number."
      );
      return;
    } else {
      navigate("/auth/signup", { state: { email, password } });
    }
  };

  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        const payload = {
          email: email,
          password: password,
        };

        const response = await authService.loginUser(payload);
        console.log("response", response);

        if (response.status === 201) {
          validatePassword();
          return;
        }

        if (response.message === "Invalid email or password.") {
          toast.error("Invalid email or password. Please try again.");
          return;
        }

        if (response?.data?.success) {
          const userData = response.data.data.user;
          const token = response.data.data.token;

          await updateUser({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: "User",
            token,
            userId: userData._id,
          });

          toast.success("Logged in successfully");

          navigate("/");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } else {
        toast.error("Please enter your email");
      }
    } catch (err) {
      // if (err.response?.data?.message === 'Invalid email or password.') {
      //   toast.error(err.response.data.message);
      // } else 
      
      if (err.response?.status === 401 || err.response?.data?.message === 'Invalid email or password.') {
        validatePassword();
      } else {
        toast.error("Something went wrong");

        console.error(err);
      }
    }
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-bg-white tw-relative">
      {/* Left: Form */}
      <motion.button
        onClick={() => navigate("/")}
        className="tw-absolute tw-top-4 tw-left-4 tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-gray-700 tw-z-10"
      >
        &#8592;
      </motion.button>
      <div className="tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-8">
        <div className="tw-w-full tw-max-w-md">
          <h6 className="tw-text-6xl tw-font-bold tw-mb-2 tw-text-center">
            Blue Jack for customers
          </h6>
          <p className="tw-text-gray-500 tw-text-center tw-mb-8">
            Create an account or log in to manage your appointments.
          </p>
          <motion.input
            type="email"
            className="tw-w-full tw-text-[16px] tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />
          {email &&
            !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i) && (
              <p className="tw-text-red-500 tw-text-sm">
                Please enter a valid email address
              </p>
            )}

          <div className="tw-relative tw-mb-3 tw-mt-5">
            <motion.input
              type={showPassword ? "text" : "password"}
              className={`tw-w-full tw-text-[16px] tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none ${
                errors.password ? "tw-border-red-500" : "focus:tw-border-black"
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

          {/* <div className="tw-w-full mt-3 tw-text-[16px] tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-lg tw-outline-none focus:tw-border-black tw-flex tw-items-center tw-justify-between">
            <motion.input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="tw-flex-1 tw-bg-transparent tw-outline-none tw-border-none tw-text-[18px]"
              // onBlur={validatePassword}
            />
            <motion.button
              type="button"
              onClick={togglePasswordVisibility}
              className="tw-ml-3 tw-text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.button>
          </div> */}

          <motion.button
            type="button"
            onClick={handleContinue}
            className="tw-w-full tw-mt-4 tw-text-center tw-bg-black tw-text-white tw-p-3 tw-rounded-lg tw-font-semibold tw-text-lg tw-mb-6 tw-transition hover:tw-bg-gray-900"
          >
            Continue
          </motion.button>
          <div className="tw-flex tw-items-center tw-my-6">
            <div className="tw-flex-1 tw-h-px tw-bg-gray-200" />
            <span className="tw-mx-4 tw-text-gray-400">OR</span>
            <div className="tw-flex-1 tw-h-px tw-bg-gray-200" />
          </div>
          {/* <motion.button className="tw-w-full tw-flex tw-items-center tw-gap-3 tw-bg-white tw-border tw-border-gray-300 tw-p-3 tw-rounded-lg tw-mb-3 tw-font-medium hover:tw-bg-gray-50">
            <FaFacebookF className="tw-text-blue-600 tw-text-xl" /> Continue with Facebook
          </motion.button> */}
          <motion.button className="tw-w-full tw-flex tw-items-center tw-gap-3 tw-bg-white tw-border tw-border-gray-300 tw-p-3 tw-rounded-lg tw-mb-3 tw-font-medium hover:tw-bg-gray-50">
            <FcGoogle className="tw-text-xl" /> Continue with Google
          </motion.button>
          {/* <motion.button className="tw-w-full tw-flex tw-items-center tw-gap-3 tw-bg-white tw-border tw-border-gray-300 tw-p-3 tw-rounded-lg tw-mb-6 tw-font-medium hover:tw-bg-gray-50">
            <FaApple className="tw-text-xl" /> Continue with Apple
          </motion.button> */}
          <div className="tw-text-center tw-mb-4">
            <span className="tw-text-gray-700">
              Are you a customer looking to book an appointment?
            </span>
            <br />
            <a
              onClick={() => navigate("/for-business")}
              className="tw-text-purple-600 hover:tw-underline"
            >
              Go to Blue Jack for business
            </a>
          </div>
          <div className="tw-text-xs tw-text-gray-400 tw-text-center tw-mb-2">
            This site is protected by reCAPTCHA
            <br />
            Google Privacy Policy and Terms of Service apply
          </div>
          <div className="tw-flex tw-justify-center tw-gap-4 tw-text-xs tw-text-gray-500">
            <a href="#" className="hover:tw-underline">
              🌐 English
            </a>
            <a href="#" className="hover:tw-underline">
              Support
            </a>
            <a href="#" className="hover:tw-underline">
              Privacy Policy
            </a>
          </div>
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
    </div>
  );
};

export default UserSignIn;
