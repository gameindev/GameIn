import { Outlet, useLocation } from "react-router";
import { Sidebar, Header, Footer } from "./components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import useApi from "../../shared/hooks/useApi";
import { useEffect } from "react";
import { currentUser, isLoggedIn } from "../../features/auth/store/selector";
import { setUser } from "../../features/auth/store/userSlice";
import { getUserProfileService } from "../services/user/user-profile.service";
import {
  startInactivityTracker,
  stopInactivityTracker,
} from "../services/token/inactivityTracker";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isLoggedInUser = useSelector(isLoggedIn);
  const user = useSelector(currentUser) || {};

  const dispatch = useAppDispatch();
  const { get } = useApi();

  const showSidebar = isLoggedInUser && !isDashboard;

  // Start/stop inactivity tracker based on login status
  useEffect(() => {
    if (isLoggedInUser) {
      // Start inactivity tracker when user is logged in
      startInactivityTracker();
    } else {
      // Stop inactivity tracker when user is logged out
      stopInactivityTracker();
    }

    // Cleanup on unmount or when login status changes
    return () => {
      if (!isLoggedInUser) {
        stopInactivityTracker();
      }
    };
  }, [isLoggedInUser]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;

      try {
        const userData = await getUserProfileService(
          get,
          user.id,
          user.accessToken,
          user.user_type
        );
        dispatch(setUser(userData));

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
