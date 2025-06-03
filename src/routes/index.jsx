import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";

import Preloader from "../components/shared/Preloader";

// Lazy pages
const Layout = lazy(() => import("../layouts/Layout"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ErrorPage = lazy(() => import("./ErrorPage"));

const BrandDashboard = lazy(() => import("../pages/brand/Dashboard"));
const CreatorDashboard = lazy(() => import("../pages/creator/Dashboard"));
const PageLayout = lazy(() => import("../layouts/PageLayout"));
const Profile = lazy(() => import("../pages/brand/Profile"));
const SponsorShips = lazy(() => import("../pages/brand/SponsorShips"));
const Offerings = lazy(() => import("../pages/brand/Offerings"));
const Stats = lazy(() => import("../pages/brand/Stats"));
const NewsFeed = lazy(() => import("../pages/brand/NewsFeed"));
const Inbox = lazy(() => import("../pages/brand/Inbox"));

// Guards
const RequiresAuth = lazy(() => import("./auth/RequiresAuth"));
const RoleGuard = lazy(() => import("./auth/RoleGuard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Preloader />}>
        <Layout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Preloader />}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Preloader />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Preloader />}>
            <Register />
          </Suspense>
        ),
      },
      // Brand Dashboard (protected & role-specific)
      {
        path: "brand",
        element: (
          <Suspense fallback={<Preloader />}>
            <RequiresAuth />
          </Suspense>
        ),
        children: [
          {
            element: (
              <Suspense fallback={<Preloader />}>
                <RoleGuard allowedRoles={["BRAND"]} />
              </Suspense>
            ),
            children: [
              {
                element: (
                  <Suspense fallback={<Preloader />}>
                    <PageLayout />
                  </Suspense>
                ),
                children: [
                  { index: true, element: <Navigate to="dashboard" replace /> },
                  { path: "dashboard", element: <BrandDashboard /> },
                  { path: "profile", element: <Profile /> },
                  { path: "sponsorships", element: <SponsorShips /> },
                  { path: "offerings", element: <Offerings /> },
                  { path: "stats", element: <Stats /> },
                  { path: "newsfeed", element: <NewsFeed /> },
                  { path: "inbox", element: <Inbox /> },
                ],
              },
            ],
          },
        ],
      },
      // Creator Dashboard (protected & role-specific)
      {
        path: "creator",
        element: (
          <Suspense fallback={<Preloader />}>
            <RequiresAuth />
          </Suspense>
        ),
        children: [
          {
            element: (
              <Suspense fallback={<Preloader />}>
                <RoleGuard allowedRoles={["CREATOR"]} />
              </Suspense>
            ),
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: "dashboard", element: <CreatorDashboard /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
