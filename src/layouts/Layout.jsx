import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/brand/dashboard");

  return (
    <div>
      <Header />
      <div className="wrapper">
        {isDashboard && <Sidebar />}
        <main className={isDashboard && 'logged-in'}>
          <Outlet /> 
        </main>
        {isDashboard && <aside className="ad-banner"></aside> }
      </div>
      <Footer />
    </div>
  );
};

export default Layout;