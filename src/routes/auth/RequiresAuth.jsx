import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import routePaths from "../endpoints";

const RequiresAuth = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? <Outlet /> : <Navigate  to={routePaths.LOGIN} replace />;
};

export default RequiresAuth;