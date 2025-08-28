import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import ChangePassword from "../Dashboard/ChangePassword";
import Notifications from "../Dashboard/Notifications";
import Profile from "../Dashboard/Profile";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import Subscription from "../Dashboard/Subscription";
import AllCompanies from "../Dashboard/AllCompanies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
            <DashboardLayout />
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "all-companies",
            element: <AllCompanies />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
