import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import routePaths from "./endpoints";
import Preloader from "../components/shared/Preloader";
import dashboardRoutes from "./dashboardRoutes";
import { USERTYPES } from "../utils/enum";

// Lazy imports
const Layout = lazy(() => import("../layouts/Layout"));
const PageLayout = lazy(() => import("../layouts/PageLayout"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const RequiresAuth = lazy(() => import("./auth/RequiresAuth"));
const RoleGuard = lazy(() => import("./auth/RoleGuard"));

export const withSuspense = (element) => (
  <Suspense fallback={<Preloader />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: routePaths.welcomePage,
    element: withSuspense(<Layout />),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(<WelcomePage />) },
      { path: routePaths.login, element: withSuspense(<Signin />) },
      { path: routePaths.register, element: withSuspense(<Register />) },

      {
        element: withSuspense(<RequiresAuth />),
        children: [
          {
            element: withSuspense(
              <RoleGuard allowedRoles={[USERTYPES.BRAND, USERTYPES.CREATOR]} />
            ),
            children: [
              {
                element: withSuspense(<PageLayout />),
                children: dashboardRoutes.map((route) => ({
                  ...route,
                  element: withSuspense(route.element),
                })),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
