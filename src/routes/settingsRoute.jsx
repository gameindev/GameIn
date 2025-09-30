import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const Integrations = lazy(() => import("../pages/settings/Integrations"));
const Account = lazy(() => import("../pages/settings/Account"));
const Notifications = lazy(() => import("../pages/settings/Notifications"));
const Privacy = lazy(() => import("../pages/settings/Privacy"));
const Payments = lazy(() => import("../pages/settings/Payments"));

const settingsRoutes = [
  { path: routePaths.SETTINGS.ACCOUNT, element: <Account /> },
  { path: routePaths.SETTINGS.INTEGRATIONS, element: <Integrations /> },
  { path: routePaths.SETTINGS.NOTIFICATIONS, element: <Notifications /> },
  { path: routePaths.SETTINGS.PRIVACY, element: <Privacy /> },
  { path: routePaths.SETTINGS.PAYMENTS, element: <Payments /> },
];

export default settingsRoutes;
