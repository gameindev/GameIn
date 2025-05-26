import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import Signin from "../pages/auth/Signin";
import Preloader from "../components/shared/Preloader";

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
      <Suspense fallback={<>{<Preloader />}</>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<>{<Preloader />}</>}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<>{<Preloader />}</>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<>{<Preloader />}</>}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthGuard
            element={
              <Suspense fallback={<>{<Preloader />}</>}>
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
