import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { isLoggedIn } from "../stores/auth/authSelector";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isLoggedInUser = useSelector(isLoggedIn);

  const showSidebar = isLoggedInUser && !isDashboard;

  return (
    <div>
      <Header />
      <div className="wrapper">
        {showSidebar && <Sidebar />}
        <main className={showSidebar ? "logged-in" : ""}>
          <Outlet />
        </main>
        {showSidebar && <aside className="ad-banner"></aside>}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
