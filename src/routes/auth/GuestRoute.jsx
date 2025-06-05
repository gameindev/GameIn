// PublicRoute.jsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../stores/selectors";

const GuestRoute = ({ children }) => {
    const isAuthenticated = useSelector(isLoggedIn);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
