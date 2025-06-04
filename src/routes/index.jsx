// router.jsx (or router.js)
import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import dashboardRoutes from "./dashboardRoutes";
import Preloader from "../components/shared/Preloader";
import routePaths from "./endpoints";
import { USERTYPES } from "../utils/enum";

// Lazy pages and auth-related components
const Layout = lazy(() => import("../layouts/Layout"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const CreatorDashboard = lazy(() => import("../pages/creator/Dashboard"));

// Guards
const RequiresAuth = lazy(() => import("./auth/RequiresAuth"));
const RoleGuard = lazy(() => import("./auth/RoleGuard"));

export const withSuspense = (element) => (
  <Suspense fallback={<Preloader />}>
    {element}
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: routePaths.welcomePage,
    element: withSuspense(<Layout />),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(<WelcomePage />),
      },
      {
        path: routePaths.login,
        element: withSuspense(<Signin />),
      },
      {
        path: routePaths.register,
        element: withSuspense(<Register />),
      },
      {
        path: routePaths.dashboard.base,
        element: withSuspense(<RequiresAuth />),
        children: [
          {
            element: withSuspense(<RoleGuard allowedRoles={[USERTYPES.BRAND, USERTYPES.CREATOR]} />),
            children: dashboardRoutes.map((route) => ({
              ...route,
              element: withSuspense(route.element),
              children: route.children?.map((child) => ({
                ...child,
                element: withSuspense(child.element),
              })),
            })),
          },
        ],
      },
    ],
  },
]);

export default router;
