import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("booking_ui")) || null;
  const business = JSON.parse(localStorage.getItem("booking_ui")) || null;
  const notifications = [];
  const [state, setState] = useState({
    user,
    business, 
    notifications,
  });

  const [notificationCount, setNotificationCount] = useState([]);

  const handleStateChange = (name, value) =>
    setState((prev) => ({ ...prev, [name]: value }));

  const updateUser = (data) => {
    console.log(data);
    localStorage.setItem("booking_ui", JSON.stringify(data));
    handleStateChange("user", data);
  };

  const updateBusiness = (data) => {
    console.log(data);
    localStorage.setItem("booking_ui", JSON.stringify(data));
    handleStateChange("business", data);
  };

  const updateNotifications = (data) => {
    handleStateChange("notifications", data);
  };

  const logOutUser = () => {
    localStorage.removeItem("booking_ui");
    handleStateChange("user", null);
  };

  const logOutBusiness = () => {
    localStorage.removeItem("booking_ui");
    handleStateChange("business", null);
  };

  const updateUserDetails = (data) => {
    handleStateChange("user", { user: data, token: state.user.token });
    localStorage.setItem(
      "booking_ui",
      JSON.stringify({ user: data, token: state.user.token })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateUser,
        logOutUser,
        updateBusiness,
        logOutBusiness,
        updateUserDetails,
        updateNotifications,
        notificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
