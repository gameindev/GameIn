// router.jsx (or router.js)
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Preloader from "../components/shared/Preloader";
import routePaths from "./endpoints";
import { USERTYPES } from "../utils/enum";
import GuestRoute from "./auth/GuestRoute";
import accountsdRoutes from "./dashboardRoutes";

// Lazy pages and auth-related components
const Layout = lazy(() => import("../layouts/Layout"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ErrorPage = lazy(() => import("./ErrorPage"));

const PageLayout = lazy(() => import("../layouts/PageLayout"));

// Guards
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
]);

export default router;
