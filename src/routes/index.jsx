// router.jsx (or router.js)
import { createHashRouter } from "react-router";
import { lazy, Suspense } from "react";
import Preloader from "../components/shared/Preloader";
import routePaths from "./endpoints";
import { USERTYPES } from "../utils/enum";
import GuestRoute from "./auth/GuestRoute";
import accountsdRoutes from "./dashboardRoutes";

// Lazy imports
const Layout = lazy(() => import("../layouts/Layout"));
const PageLayout = lazy(() => import("../layouts/PageLayout"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ErrorPage = lazy(() => import("./ErrorPage"));


// Guards
const RoleGuard = lazy(() => import("./auth/RoleGuard"));

export const withSuspense = (element) => (
  <Suspense fallback={<Preloader />}>{element}</Suspense>
);

const router = createHashRouter([
  {
    path: routePaths.welcomePage,
    element: withSuspense(<Layout />),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(<WelcomePage />) },
      { path: routePaths.login, element: withSuspense(<Signin />) },
      { path: routePaths.register, element: withSuspense(<Register />) },

      {
        index: true,
        element: withSuspense(<WelcomePage />),
      },
      {
        path: routePaths.login,
        element: withSuspense(<GuestRoute><Signin /></GuestRoute>),
      },
      {
        path: routePaths.register,
        element: withSuspense(<GuestRoute><Register /></GuestRoute>),
      },

      // Authenticated Account routes
      {
        element: withSuspense(<RoleGuard allowedRoles={[USERTYPES.BRAND, USERTYPES.CREATOR]} />),
        children: [
          {
            element: withSuspense(<PageLayout />),
            children: accountsdRoutes.map(({ path, element }) => ({
              path,
              element: withSuspense(element),
            })),
          },
        ],
      },
    ],
  },
],{
  basename: '/GameIn', // ✅ Set basename here
});

export default router;
