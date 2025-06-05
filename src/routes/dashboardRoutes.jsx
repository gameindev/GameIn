import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const Dashboard = lazy(() => import("../pages/accounts/Dashboard"));
const Profile = lazy(() => import("../pages/accounts/Profile"));
const SponsorShips = lazy(() => import("../pages/accounts/SponsorShips"));
const Offerings = lazy(() => import("../pages/accounts/Offerings"));
const Stats = lazy(() => import("../pages/accounts/Stats"));
const NewsFeed = lazy(() => import("../pages/accounts/NewsFeed"));
const Inbox = lazy(() => import("../pages/accounts/Inbox"));


const accountsdRoutes = [
  { path: routePaths.dashboard, element: <Dashboard /> },
  { path: routePaths.profile, element: <Profile /> },
  { path: routePaths.sponsorships, element: <SponsorShips /> },
  { path: routePaths.offerings, element: <Offerings /> },
  { path: routePaths.stats, element: <Stats /> },
  { path: routePaths.newsfeed, element: <NewsFeed /> },
  { path: routePaths.inbox, element: <Inbox /> },
];

export default accountsdRoutes;
