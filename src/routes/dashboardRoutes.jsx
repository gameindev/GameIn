// brandRoutes.js
import { Navigate } from "react-router";
import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const PageLayout = lazy(() => import("../layouts/PageLayout"));
const BrandDashboard = lazy(() => import("../pages/brand/Dashboard"));
const Profile = lazy(() => import("../pages/brand/Profile"));
const SponsorShips = lazy(() => import("../pages/brand/SponsorShips"));
const Offerings = lazy(() => import("../pages/brand/Offerings"));
const Stats = lazy(() => import("../pages/brand/Stats"));
const NewsFeed = lazy(() => import("../pages/brand/NewsFeed"));
const Inbox = lazy(() => import("../pages/brand/Inbox"));

const { dashboard: {  profile, sponsorships, offerings, stats, newsfeed, inbox} } = routePaths

const dashboardRoutes = [
  {
    element: <PageLayout />,
    children: [
      { index: true, element: <BrandDashboard /> },
      { path: profile, element: <Profile /> },
      { path: sponsorships, element: <SponsorShips /> },
      { path: offerings, element: <Offerings /> },
      { path: stats, element: <Stats /> },
      { path: newsfeed, element: <NewsFeed /> },
      { path: inbox, element: <Inbox /> },
    ],
  },
];

export default dashboardRoutes;
