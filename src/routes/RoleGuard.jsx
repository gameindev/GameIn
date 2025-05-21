import { Navigate, Outlet } from "react-router";

const userRole = localStorage.getItem("userRole"); // Example role check

const AuthorizedRoute = ({ allowedRoles }) => {
  return allowedRoles.includes(userRole || "") ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AuthorizedRoute;
