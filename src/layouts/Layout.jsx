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
      {isDashboard && <Sidebar />}
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;