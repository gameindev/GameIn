import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import routePaths from "../endpoints";

const RoleGuard = ({ allowedRoles }) => {
  const userType = useSelector((state) => state.user?.profile?.user?.userType);

  console.log(userType);

  return allowedRoles.includes(userType) ? (
    <Outlet />
  ) : (
    <Navigate to={routePaths.WELCOMEPAGE} replace />
  );
};

export default RoleGuard;
