import Home from "@pages/users/static/Home";
import Layout from "../layouts/Layout";
import Search from "@pages/users/static/Search";
import BusinessDetails from "@pages/users/static/BusinessDetails";
import BusinessPage from "@components/users/static/BusinessPage";
import BusinessLandingPage from "@pages/business/static/BusinessLandingPage";
import BusinessSignIn from "@pages/business/businessAuth/BusinessSignIn";
import BusinessSignUp from "@pages/business/businessAuth/BusinessSignUp";
import AccountType from "@pages/business/onboarding/AccountType";
import PartnerBusinessName from "@pages/business/onboarding/PartnerBusinessName";
import PartnerBusinessServices from "@pages/business/onboarding/PartnerBusinessServices ";
import PartnerBusinessTeamSize from "@pages/business/onboarding/PartnerBusinessTeamSize";
import PartnerBusinessLocation from "@pages/business/onboarding/PartnerBusinessLocation";
import PartnerBusinessReferral from "@pages/business/onboarding/PartnerBusinessReferral";
import UserSignIn from "@pages/users/usersAuth/UserSignIn";
import UserSignUp from "@pages/users/usersAuth/UserSignUp";
import UserProfile from "@pages/users/profile/UserProfile";

const PublicRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/search", element: <Search /> },

      // User Public Routes
      { path: "/auth", element: <UserSignIn /> },
      { path: "/auth/signup", element: <UserSignUp /> },

      // Business Public Routes
      { path: "/for-business", index: true, element: <BusinessLandingPage /> },
      { path: "/business/:id", element: <BusinessPage /> },
      { path: "/services", element: <BusinessDetails /> },
      { path: "/business/signin", element: <BusinessSignIn /> },
      { path: "/business/signup", element: <BusinessSignUp /> },
      { path: "/business/account-type", element: <AccountType /> },
      {
        path: "/business/onboarding/partner_business_name",
        element: <PartnerBusinessName />,
      },
      {
        path: "/business/onboarding/partner_business_services",
        element: <PartnerBusinessServices />,
      },
      {
        path: "/business/onboarding/partner_business_team_size",
        element: <PartnerBusinessTeamSize />,
      },
      {
        path: "/business/onboarding/partner_business_location",
        element: <PartnerBusinessLocation />,
      },
      {
        path: "/business/onboarding/partner_business_referral",
        element: <PartnerBusinessReferral />,
      },
    ],
  },
];

export default PublicRoutes;
