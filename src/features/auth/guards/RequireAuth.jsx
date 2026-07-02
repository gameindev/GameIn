import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import routePaths from "../../../app/router/routes";

const RequireAuth = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const refreshToken = useAppSelector((state) => state.auth.refreshToken);

    return accessToken || refreshToken
        ? <Outlet />
        : <Navigate to={routePaths.LOGIN} replace />;
};

export default RequireAuth;