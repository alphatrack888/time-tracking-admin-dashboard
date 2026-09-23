import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ProtectedRoute from "../../utils/ProtectedRoute";
import RouteError from "./RouteError";

const SignIn = lazy(() => import("../../pages/SignIn"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const VerifyOtp = lazy(() => import("../../pages/VeryfiOTP"));
const UpdatePassword = lazy(() => import("../../pages/UpdatePassword"));
const ChangePassword = lazy(() => import("../Dashboard/ChangePassword"));
const Notifications = lazy(() => import("../Dashboard/Notifications"));
const Profile = lazy(() => import("../Dashboard/Profile"));
const PrivacyPolicy = lazy(() => import("../Dashboard/PrivacyPolicy"));
const Subscription = lazy(() => import("../Dashboard/Subscription"));
const AllCompanies = lazy(() => import("../Dashboard/AllCompanies"));
const Reports = lazy(() => import("../Dashboard/Reports"));

const RouteLoading = () => (
  <div className="flex items-center justify-center h-screen">
    <CircularProgress />
  </div>
);

const withSuspense = element => <Suspense fallback={<RouteLoading />}>{element}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        path: "sign-in",
        element: withSuspense(<SignIn />),
      },
      {
        path: "forgot-password",
        element: withSuspense(<ForgotPassword />),
      },
      {
        path: "/verify-otp",
        element: withSuspense(<VerifyOtp />),
      },
      {
        path: "/update-password",
        element: withSuspense(<UpdatePassword />),
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: withSuspense(<Dashboard />),
          },
          {
            path: "dashboard",
            element: withSuspense(<Dashboard />),
          },
          {
            path: "all-companies",
            element: withSuspense(<AllCompanies />),
          },
          {
            path: "reports",
            element: withSuspense(<Reports />),
          },
          {
            path: "change-password",
            element: withSuspense(<ChangePassword />),
          },
          {
            path: "privacy-policy",
            element: withSuspense(<PrivacyPolicy />),
          },
          {
            path: "subscription",
            element: withSuspense(<Subscription />),
          },
          {
            path: "notifications",
            element: withSuspense(<Notifications />),
          },
          {
            path: "profile",
            element: withSuspense(<Profile />),
          },
        ],
      },
    ],
  },
]);

export default router;
