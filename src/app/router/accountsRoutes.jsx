import { lazy } from "react";
import routePaths from "./routes";
import { withRoleAccess } from "../../features/offerings/utils/withRoleAccess";




const Dashboard = lazy(() => import("../../features/account/dashboard/pages/Dashboard"));
const ProfilePage = lazy(() => import("../../features/account/profile/pages/ProfilePage"))
const SponsorShips = lazy(() => import("../../features/sponsorships/pages/Sponsorships"))
const Offerings = lazy(() => import("../../features/offerings/pages/OfferingsPage"))
const NewsFeed = lazy(() => import("../../features/newsfeed/pages/NewsFeed"))
const Inbox = lazy(() => import("../../features/inbox/pages/Inbox"))
const EditBio = lazy(() => import("../../features/account/profile/pages/edit-profile/EditBio"))
const Faq = lazy(() => import("../../features/account/profile/pages/faq/Faq"))
const CreateOpportunity = lazy(() => import("../../features/offerings/pages/CreateOpportunity"))
const EditOpportunity = lazy(() => import("../../features/offerings/pages/EditOpportunity"))

const EditOpportunityWithAccess = withRoleAccess(EditOpportunity);


const { DASHBOARD, PROFILE, SPONSORSHIPS, OFFERINGS, NEWSFEED, INBOX } =
    routePaths.ACCOUNTS;

const accountsdRoutes = [
    // Dashboard
    { path: DASHBOARD.ROOT, element: <Dashboard /> },

    // Profile
    { path: PROFILE.ROOT, element: <ProfilePage /> },
    { path: PROFILE.VIEW, element: <ProfilePage /> },
    { path: PROFILE.BIO, element: <EditBio /> },
    { path: PROFILE.FAQ, element: <Faq /> },

    // Sponsorships
    { path: SPONSORSHIPS.ROOT, element: <SponsorShips /> },
    { path: SPONSORSHIPS.VIEW, element: <SponsorShips /> },

    // Offerings
    { path: OFFERINGS.ROOT, element: <Offerings /> },
    { path: OFFERINGS.CREATE_OFFERING, element: <CreateOpportunity /> },
    { path: OFFERINGS.TPP_EDIT_OFFERING, element: <EditOpportunityWithAccess /> },
    { path: OFFERINGS.FPP_EDIT_OFFERING, element: <EditOpportunityWithAccess /> },
    // { path: OFFERINGS.EDIT_PRICEPOOLEVENT, element: <EditPricePoolEvent /> },
    { path: OFFERINGS.VIEW, element: <Offerings /> },

    // Others (/stats is SPONSORSHIPS.ROOT — analytics live on Sponsorships page)
    { path: NEWSFEED.ROOT, element: <NewsFeed /> },
    { path: INBOX.ROOT, element: <Inbox /> },
    { path: INBOX.CONVERSATION, element: <Inbox /> },
    // { path: INBOX.VIEW, element: <Inbox /> },
];
export default accountsdRoutes;
