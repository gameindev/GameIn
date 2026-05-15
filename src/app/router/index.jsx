import { createHashRouter } from "react-router";
import { lazy, Suspense } from "react";
import routePaths from "./routes";
import { USERTYPES } from "../../shared/enums/userTypesEnum";
import accountsdRoutes from "./accountsRoutes";


const Preloader = lazy(() => import("../../shared/components/Preloader"));
const Layout = lazy(() => import("../layout/Layout"));
const ErrorPage = lazy(() => import("../layout/ErrorPage"));
const WelcomePage = lazy(() => import("../pages/Welcome"));
const HomeAlt = lazy(() => import("../pages/HomeAlt"));
const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("../../features/auth/pages/SignupPage"));
const EmailVerificationPage = lazy(() => import("../../features/auth/pages/verification/EmailVerificationPage"));  
const Accounts = lazy(() => import("../../features/account/index"));
const RequireAuth = lazy(() => import("../../features/auth/guards/RequireAuth"));
const GuestRoute = lazy(() => import("../../features/auth/guards/GuestRoutes"));
const RoleGuard = lazy(() => import("../../features/auth/guards/RoleGuard"));  
const SearchByUserType = lazy(() => import('../../features/search/pages/SearchByUserType'))

const SettingsAccount = lazy(() => import('../../features/settings/account/Account'))
const SettingsIntegrations = lazy(() => import('../../features/settings/integration/pages/Integrations'))
const SettingsNotifications = lazy(() => import('../../features/settings/notifications/Notifications'))
const SettingsPrivacy = lazy(() => import('../../features/settings/privacy/Privacy'))
const SettingsPayments = lazy(() => import('../../features/settings/payment/Payments'))
const SocialCallback = lazy(() => import('../../features/settings/integration/pages/SocialCallback'))
const PaymentSuccess = lazy(() => import('../../features/payments/pages/PaymentSuccess'))
const PaymentCancel = lazy(() => import('../../features/payments/pages/PaymentCancel'))

const FeedbackForm = lazy(() => import('../../features/feedback/pages/FeedbackForm'))


// Suspense wrapper utility for lazy components
export const withSuspense = (element) => (
    <Suspense fallback={<Preloader />}>{element}</Suspense>
);

const wrapRoutes = (routes) =>
    routes.map(({ path, element }) => ({
        path,
        element: withSuspense(element),
    }));

const router = createHashRouter([
    {
        path: routePaths.WELCOMEPAGE,
        element: withSuspense(<Layout />),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: withSuspense(<GuestRoute><WelcomePage /></GuestRoute>),
            },
            {
                path: routePaths.HOME_ALT,
                element: withSuspense(<GuestRoute><HomeAlt /></GuestRoute>),
            },
            {
                path: routePaths.LOGIN,
                element: withSuspense(<GuestRoute> <LoginPage /> </GuestRoute>),
            },
            {
                path: routePaths.REGISTER,
                element: withSuspense(<GuestRoute> <SignupPage /> </GuestRoute>),
            
            },
            {
                path: routePaths.VERIFY_ACCOUNT,
                element: withSuspense(<EmailVerificationPage />),
            },
            {
                element: withSuspense(<RequireAuth />),
                children: [
                    {
                        element: withSuspense(<RoleGuard allowedRoles={[USERTYPES.CREATOR, USERTYPES.BRAND]} />),
                        children: [
                            { element: withSuspense(<Accounts />), children: wrapRoutes(accountsdRoutes) },
                            { path: routePaths.SEARCH, element: withSuspense(<SearchByUserType />), },
                            { path: routePaths.SETTINGS.ACCOUNT, element: <SettingsAccount /> },
                            { path: routePaths.SETTINGS.INTEGRATIONS, element: <SettingsIntegrations /> },
                            { path: routePaths.SETTINGS.NOTIFICATIONS, element: <SettingsNotifications /> },
                            { path: routePaths.SETTINGS.SOCIAL_CALLBACK, element: <SocialCallback /> },
                            { path: routePaths.SETTINGS.PRIVACY, element: <SettingsPrivacy /> },
                            { path: routePaths.SETTINGS.PAYMENTS, element: <SettingsPayments /> },
                            { path: routePaths.PAYMENT.SUCCESS, element: withSuspense(<PaymentSuccess />) },
                            { path: routePaths.PAYMENT.CANCEL, element: withSuspense(<PaymentCancel />) },
                        ],
                    },
                    {
                        path: routePaths.FEEDBACK,
                        element: withSuspense(<RoleGuard allowedRoles={[USERTYPES.BRAND]} />),
                        children: [
                            { index: true, element: withSuspense(<FeedbackForm />) },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router; 


