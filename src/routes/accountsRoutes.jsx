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

const  { DASHBOARD, PROFILE, SPONSORSHIPS, OFFERINGS, STATS, NEWSFEED, INBOX } = routePaths.ACCOUNTS;

const accountsdRoutes = [
  { path: DASHBOARD.ROOT, element: <Dashboard /> },
  { path: PROFILE.ROOT, element: <Profile /> },
  { path: SPONSORSHIPS.ROOT, element: <SponsorShips /> },
  { path: OFFERINGS.ROOT, element: <Offerings /> },
  { path: STATS.ROOT, element: <Stats /> },
  { path: NEWSFEED.ROOT, element: <NewsFeed /> },
  { path: INBOX.ROOT, element: <Inbox /> },
];

export default accountsdRoutes;
