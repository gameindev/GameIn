// components/auth/RoleGuard.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RoleGuard = ({ allowedRoles }) => {
    const userType = useSelector((state) => state.auth.user?.userType);
    console.log(userType);
    

    return allowedRoles.includes(userType) ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default RoleGuard;
