import { Navigate, Outlet } from "react-router";

// const isAuthenticated = () => {
//   return localStorage.getItem("accessToken") ? true : false;
// };

const RequiresAuth = () => {
  return <Outlet />
//   return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default RequiresAuth;
