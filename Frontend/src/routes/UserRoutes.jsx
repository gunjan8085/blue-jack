import UserProfile from "@pages/users/profile/UserProfile";
import UserLayout from "../layouts/UserLaycout";
import UserAppointment from "@pages/users/appoitments/appointment";

const UserRoutes = [
  {
    element: <UserLayout />,
    children: [
      { path: "/user/profile", element: <UserProfile /> },
      { path: "/user/appointments", element: <UserAppointment /> },
    ],
  },
];

export default UserRoutes;
