import React, { useState } from "react";
import { API_URL } from "../../../lib/const";
import { useRouter } from "next/navigation";

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Step 1: Request OTP
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      setSuccess("OTP sent to your email.");
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      setSuccess("OTP verified. Enter your new password.");
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      setSuccess("Password reset successful. You can now log in.");
      setStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Forgot Password</h2>
        {error && error === "User not found" ? (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-2 text-center">
            No account with this email. Kindly sign up.<br />
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => {
                onClose();
                router.push("/auth/signup");
              }}
            >
              Go to Signup
            </button>
          </div>
        ) : (
          error && <div className="bg-red-100 text-red-600 p-2 rounded mb-2">{error}</div>
        )}
        {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{success}</div>}
        {step === 1 && (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label htmlFor="fp-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="fp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label htmlFor="fp-otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
              <input
                id="fp-otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="fp-new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                id="fp-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        {step === 4 && (
          <div className="text-center">
            <p className="text-green-700 font-semibold mb-4">Password reset successful!</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
