import UserProfileBanner from "../../components/userProfileBanner";
import InfoTabs from "./../../components/infoTabs/InfoTabs";

export default function Dashboard() {
  return (
    <>
      <UserProfileBanner />
      <InfoTabs />
      <div className="container">
        <h1>Creators Dashboard</h1>
      </div>
    </>
  );
}
