import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, currentUser } from "../stores/selectors";
import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { setUser } from "../stores/slices/user";
import { getUserProfile } from "../services/users";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isLoggedInUser = useSelector(isLoggedIn);
  const { user } = useSelector(currentUser) || {};

  const dispatch = useDispatch();
  const { get } = useApi();

  const showSidebar = isLoggedInUser && !isDashboard;

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;

      try {
        const userData = await getUserProfile(get, user.id, user.user_type);
        dispatch(setUser({ user: userData }));

        // const followingRes = await get(`/users/${user.id}/following`);
        // const ids = followingRes?.data?.map((u) => u.id);
        // dispatch(setFollowing(followingRes?.data || []));
        // dispatch(setFollowedUserIds(ids));

        // const followersRes = await get(`/users/${user.id}/followers`);
        // dispatch(setFollowers(followersRes?.data || []));
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    fetchUser();
  }, [user?.id]);

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
