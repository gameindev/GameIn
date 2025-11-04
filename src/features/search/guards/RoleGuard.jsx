import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import routePaths from "../../../app/router/routes";


const RoleGuard = ({ allowedRoles }) => {
    const user_type = useAppSelector((state) => state.user?.profile?.user_type);
    
    return allowedRoles.includes(user_type) ? <Outlet /> : <Navigate to={routePaths.WELCOMEPAGE} replace />;
};

export default RoleGuard;