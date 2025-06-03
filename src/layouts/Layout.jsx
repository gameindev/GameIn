import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/");

  return (
    <div>
      <Header />
      {isDashboard && <Sidebar />}
      <main className={isDashboard && 'logged-in'}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;