import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const Dashboard = lazy(() => import("../pages/accounts/Dashboard"));
const Profile = lazy(() => import("../pages/accounts/Profile"));
const SponsorShips = lazy(() => import("../pages/accounts/Sponsorships"));
const Offerings = lazy(() => import("../pages/accounts/Offerings"));
const Stats = lazy(() => import("../pages/accounts/Stats"));
const NewsFeed = lazy(() => import("../pages/accounts/NewsFeed"));
const Inbox = lazy(() => import("../pages/accounts/Inbox"));

const accountsdRoutes = [
  { path: routePaths.DASHBOARD.ROOT, element: <Dashboard /> },
  { path: routePaths.PROFILE.ROOT, element: <Profile /> },
  { path: routePaths.SPONSORSHIPS.ROOT, element: <SponsorShips /> },
  { path: routePaths.OFFERINGS.ROOT, element: <Offerings /> },
  { path: routePaths.STATS.ROOT, element: <Stats /> },
  { path: routePaths.NEWSFEED.ROOT, element: <NewsFeed /> },
  { path: routePaths.INBOX.ROOT, element: <Inbox /> },
];

export default accountsdRoutes;
