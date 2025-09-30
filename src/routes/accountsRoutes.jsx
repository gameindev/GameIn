import { lazy } from "react";
import routePaths from "./endpoints";
import DisplayOfferings from "../pages/accounts/offerings/DisplayOfferings";

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
  import("../features/offerings/components/editOffering")
);

const EditPricePoolEvent = lazy(() =>
  import("../components/accounts/offerings/EditPricePoolEvent")
);

const { DASHBOARD, PROFILE, SPONSORSHIPS, OFFERINGS, STATS, NEWSFEED, INBOX } =
  routePaths.ACCOUNTS;

const accountsdRoutes = [
  // Dashboard
  { path: DASHBOARD.ROOT, element: <Dashboard /> },

  // Profile
  { path: PROFILE.ROOT, element: <Profile /> },
  { path: PROFILE.VIEW, element: <Profile /> },
  { path: PROFILE.BIO, element: <EditBio /> },
  { path: PROFILE.FAQ, element: <Faq /> },

  // Sponsorships
  { path: SPONSORSHIPS.ROOT, element: <SponsorShips /> },
  { path: SPONSORSHIPS.VIEW, element: <SponsorShips /> },

  // Offerings
  { path: OFFERINGS.ROOT, element: <Offerings /> },
  { path: OFFERINGS.CREATE_OFFERING, element: <CreateOpportunity /> },
  { path: OFFERINGS.EDIT_OFFERING, element: <EditOpportunity /> },
  { path: OFFERINGS.EDIT_PRICEPOOLEVENT, element: <EditPricePoolEvent /> },
  { path: OFFERINGS.VIEW, element: <Offerings /> },

  // Others
  { path: STATS.ROOT, element: <Stats /> },
  { path: NEWSFEED.ROOT, element: <NewsFeed /> },
  { path: INBOX.ROOT, element: <Inbox /> },
  { path: INBOX.VIEW, element: <Inbox /> },
];
export default accountsdRoutes;
