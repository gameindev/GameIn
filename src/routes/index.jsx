import { createHashRouter } from "react-router";
import { lazy, Suspense } from "react";
import routePaths from "./endpoints";
import { USERTYPES } from "../utils/enum";
import accountsdRoutes from "./accountsRoutes";

// --- Lazy-loaded Components ---
const ErrorPage = lazy(() => import("./ErrorPage"));

// Preloader
const Preloader = lazy(()=> import('./../components/shared/ui/Preloader'))

// Layouts
const Layout = lazy(() => import("../layouts/Layout"));
const PageLayout = lazy(() => import("../layouts/PageLayout"));

// Pages
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const Register = lazy(() => import("../pages/auth/Register"));
const Signin = lazy(() => import("../pages/auth/Signin"));
const SearchByUserType = lazy(() => import("../pages/search/SearchByUserType"));
const Settings = lazy(() => import("../pages/settings"));

// Features/Components
const CreateTeam = lazy(() => import("../components/features/createTeam/CreateTeam") );

// Guards
const RoleGuard = lazy(() => import("./auth/RoleGuard"));
const RequiresAuth = lazy(() => import("./auth/RequiresAuth"));
const GuestRoute = lazy(() => import("./auth/GuestRoute"));

// Centralized Suspense HOC
export const withSuspense = (element) => (
  <Suspense fallback={<Preloader />}>{element}</Suspense>
);

const router = createHashRouter([
  {
    path: routePaths.WELCOMEPAGE,
    element: withSuspense(<Layout />),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(<WelcomePage />),
      },
      {
        path: routePaths.LOGIN,
        element: withSuspense( <GuestRoute> <Signin /> </GuestRoute> ),
      },
      {
        path: routePaths.REGISTER,
        element: withSuspense( <GuestRoute> <Register /> </GuestRoute> ),
      },

      // Authenticated Account routes
      {
        element: withSuspense(<RequiresAuth />),
        children: [{
          element: withSuspense( <RoleGuard allowedRoles={[USERTYPES.BRAND, USERTYPES.CREATOR]} /> ),
          children: [
            {
              element: withSuspense(<PageLayout />),
              children: accountsdRoutes.map(
                ({ path, element }) => ({ path, element: withSuspense(element),})
              ),
            },
            { path: routePaths.ACCOUNTS.PROFILE.CREATE_TEAM, element: withSuspense(<CreateTeam />), },
            { path: routePaths.SEARCH, element: withSuspense(<SearchByUserType />), },
            { path: routePaths.SETTINGS.ROOT, element: withSuspense(<Settings />), },
          ],
        }]
      },
    ],
  },
]);

export default router;
