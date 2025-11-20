import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import routePaths from "../../../app/router/routes";
import { isLoggedIn } from "../store/selector";

const RoleGuard = ({ allowedRoles }) => {
  const user_type = useAppSelector((state) => state.user?.profile?.user_type);
  const loggedUser = useAppSelector(isLoggedIn);
  const location = useLocation();

  if (loggedUser && location.pathname === "/") {
    return <Navigate to={routePaths.ACCOUNTS.DASHBOARD.ROOT} replace />;
  }

  if (allowedRoles.includes(user_type)) {
    return <Outlet />;
  }

  return <Navigate to={routePaths.WELCOMEPAGE} replace />;
};

export default RoleGuard;
