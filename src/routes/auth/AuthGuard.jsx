import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RequiresAuth = () => {
  // const isAuthenticated = () => {
  //   return localStorage.getItem("accessToken") ? true : false;
  // };
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default RequiresAuth;
