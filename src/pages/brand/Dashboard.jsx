import UserProfileBanner from "../../components/userProfileBanner/index";

export default function Dashboard() {

  return (
    <>
        <UserProfileBanner />
        <div className="dashboard-content">
          <h1>Brand Dashboard</h1>
          <p>
            Welcome to your dashboard. Here you can manage your brand, view
            analytics, and more.
          </p>
          {/* Add more components or content as needed */}
        </div>
    </>
  );
}
