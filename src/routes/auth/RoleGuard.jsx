import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import routePaths from "../endpoints";

const RoleGuard = ({ allowedRoles }) => {
  const user_type = useSelector((state) => state.user?.profile?.user?.user_type);

  console.log(user_type);

  return allowedRoles.includes(user_type) ? (
    <Outlet />
  ) : (
    <Navigate to={routePaths.WELCOMEPAGE} replace />
  );
};

export default RoleGuard;
