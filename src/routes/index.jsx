import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";

// Auth and role based routes
const AuthGuard = lazy(() => import("./AuthGuard"));
const RoleGuard = lazy(() => import("./RoleGuard"));
const ErrorPage = lazy(() => import("./ErrorPage"));

// common layout
const Layout = lazy(() => import("../layouts/Layout"));

// pages with lazy loaded
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading WelcomePage...</div>}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading WelcomePage...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthGuard
            element={
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <>Dashboard</>
              </Suspense>
            }
          />
        ),
        children: [
          { path: "", element: <>Dashboard</> }, // Default child route
          { path: "profile", element: <>Profile</> },
        ],
      },
      {
        path: "/admin",
        element: <RoleGuard element={<>Admin</>} allowedRoles={["admin"]} />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
