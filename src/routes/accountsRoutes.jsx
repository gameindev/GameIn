import { lazy } from "react";
import routePaths from "./endpoints";

// Lazy load brand-related components
const Dashboard = lazy(() => import("../pages/accounts/Dashboard"));
const Profile = lazy(() => import("../pages/accounts/profile/Profile"));
const SponsorShips = lazy(() =>
  import("../pages/accounts/sponsorships/Sponsorships")
);
const Offerings = lazy(() => import("../pages/accounts/offerings/Offerings"));
const Stats = lazy(() => import("../pages/accounts/Stats"));
const NewsFeed = lazy(() => import("../pages/accounts/NewsFeed"));
const Inbox = lazy(() => import("../pages/accounts/Inbox"));
const EditBio = lazy(() => import("./../pages/accounts/profile/EditBio"));
const Faq = lazy(() => import("./../pages/accounts/profile/Faq"));
const CreateOpportunity = lazy(() =>
  import("../components/accounts/offerings/CreateOpportunity")
);
const EditOpportunity = lazy(() =>
  import("../components/accounts/offerings/EditOpportunity")
);

const { DASHBOARD, PROFILE, SPONSORSHIPS, OFFERINGS, STATS, NEWSFEED, INBOX } =
  routePaths.ACCOUNTS;

const accountsdRoutes = [
  { path: DASHBOARD.ROOT, element: <Dashboard /> },
  { path: PROFILE.ROOT, element: <Profile /> },
  { path: PROFILE.BIO, element: <EditBio /> },
  { path: PROFILE.FAQ, element: <Faq /> },
  { path: SPONSORSHIPS.ROOT, element: <SponsorShips /> },
  { path: OFFERINGS.ROOT, element: <Offerings /> },
  { path: OFFERINGS.CREATE_OFFERING, element: <CreateOpportunity /> },
  { path: OFFERINGS.EDIT_OFFERING, element: <EditOpportunity /> },
  { path: STATS.ROOT, element: <Stats /> },
  { path: NEWSFEED.ROOT, element: <NewsFeed /> },
  { path: INBOX.ROOT, element: <Inbox /> },
];

export default accountsdRoutes;
