import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const General = lazy(() => import("../pages/settings/General"));
const Account = lazy(() => import("../pages/settings/Account"));
const Contact = lazy(() => import("../pages/settings/Contact"));
const Privacy = lazy(() => import("../pages/settings/Privacy"));

const settingsRoutes = [
  { path: routePaths.SETTINGS.ROOT, element: <General /> },
  { path: routePaths.SETTINGS.ACCOUNT, element: <Account /> },
  { path: routePaths.SETTINGS.CONTACT, element: <Contact /> },
  { path: routePaths.SETTINGS.PRIVACY, element: <Privacy /> },
];

export default settingsRoutes;
