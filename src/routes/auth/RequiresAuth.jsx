import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RequiresAuth = () => {
  const accessToken = useSelector((state) => state.user.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequiresAuth;