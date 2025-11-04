import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import routePaths from "../../../app/router/routes";

const RequireAuth = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    return accessToken ? <Outlet /> : <Navigate to={routePaths.LOGIN} replace />;
};

export default RequireAuth;