import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { isLoggedIn } from "../stores/auth/authSelector";
import { useSelector } from "react-redux";

const Layout = () => {
  const isLoggedInUser = useSelector(isLoggedIn);

  return (
    <div>
      <Header />
      <div className="wrapper">
        {isLoggedInUser && <Sidebar />}
        <main className={isLoggedInUser ? "logged-in" : ""}>
          <Outlet />
        </main>
        {isLoggedInUser && <aside className="ad-banner"></aside>}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
