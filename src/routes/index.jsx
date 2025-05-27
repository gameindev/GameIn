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
                            { index: true, element: <Navigate to="dashboard" replace /> },
                            {path: "dashboard", element: <BrandDashboard />},
                        ]
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
                        ]
                    },
                ],
            },
        ],
    },
]);

export default router;
