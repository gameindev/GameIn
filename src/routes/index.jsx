// router.jsx (or router.js)
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Preloader from './../components/shared/ui/Preloader';
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
const CreateTeam = lazy(() =>
    import("../components/features/createTeam/CreateTeam")
);

// Guards
const RoleGuard = lazy(() => import("./auth/RoleGuard"));

export const withSuspense = (element) => (
    <Suspense fallback={<Preloader />}>{element}</Suspense>
);

const router = createBrowserRouter([
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
                element: withSuspense(
                    <GuestRoute>
                        <Signin />
                    </GuestRoute>
                ),
            },
            {
                path: routePaths.REGISTER,
                element: withSuspense(
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                ),
            },

            // Authenticated Account routes
            {
                element: withSuspense(
                    <RoleGuard allowedRoles={[USERTYPES.BRAND, USERTYPES.CREATOR]} />
                ),
                children: [
                    {
                        element: withSuspense(<PageLayout />),
                        children: accountsdRoutes.map(({ path, element }) => ({
                            path,
                            element: withSuspense(element),
                        })),
                    },
                    {
                        path: routePaths.PROFILE.CREATE_TEAM,
                        element: withSuspense(<CreateTeam />),
                    },
                ],
            },
        ],
    },
],
    {
        basename: import.meta.env.VITE_BASE_URL,
    }
);

export default router;
