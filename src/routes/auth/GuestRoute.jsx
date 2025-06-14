import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../stores/selectors";
import routePaths from "../endpoints";

const GuestRoute = ({ children }) => {
    const isAuthenticated = useSelector(isLoggedIn);

  if (isAuthenticated) {
    return <Navigate to={routePaths.DASHBOARD.ROOT} replace />;
  }

  return children;
};

export default GuestRoute;
