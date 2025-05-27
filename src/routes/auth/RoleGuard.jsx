// components/auth/RoleGuard.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RoleGuard = ({ allowedRoles }) => {
    const userType = useSelector((state) => state.user.currentUser?.userType);

    return allowedRoles.includes(userType) ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default RoleGuard;
