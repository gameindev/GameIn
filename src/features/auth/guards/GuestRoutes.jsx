import { Navigate } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import { isLoggedIn } from "../store/selector";
import routePaths from "../../../app/router/routes";

const GuestRoute = ({ children }) => {
    const isAuthenticated = useAppSelector(isLoggedIn);

    if (isAuthenticated) {
        return <Navigate to={routePaths.ACCOUNTS.DASHBOARD.ROOT} replace />;
    }

    return children;
};

export default GuestRoute;