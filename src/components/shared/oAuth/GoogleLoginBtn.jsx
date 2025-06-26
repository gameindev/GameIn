import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { setUser } from "../../../stores/slices/user";
import CompleteProfile from "./CompleteProfile";
import routePaths from "../../../routes/endpoints";
import { showNotification } from "../../../utils/helpers";
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";
import { setAuth } from "../../../stores/slices/auth";

const GoogleLoginBtn = () => {
    const [showCompleteProfile, setShowCompleteProfile] = useState(false);
    const [authTokens, setAuthTokens] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { post } = useApi();

    const handleSuccess = async (response) => {
        try {
            const { data } = await post(API_PATHS.AUTH.GOOGLE_OAUTH, { token: response?.credential });

            const isProfileIncomplete = !data.user?.userType && !data.user?.password;
            if (isProfileIncomplete) {
                setShowCompleteProfile(true)
                setAuthTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, });
            } else {
                dispatch(setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, }));
                dispatch(setUser({ user: data.user }));
            }

        } catch (err) {
            showNotification("Login Error", `{${err?.message || "Something went wrong with Google login"} }`, "red");
        }
    };

    const handleProfileCompleted = ({ user }) => {
        dispatch(setAuth({ accessToken: authTokens.accessToken, refreshToken: authTokens.refreshToken }));
        dispatch(setUser({ user }));
        setShowCompleteProfile(false);
        showNotification("Login Successful", `Welcome back, ${user.username}`);
        navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
    };

    return (
        <>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() =>
                    showNotification("Login Error", "Google sign-in failed", "red")
                }
            />
            <CompleteProfile
                opened={showCompleteProfile}
                onClose={() => setShowCompleteProfile(false)}
                onComplete={handleProfileCompleted}
                accessToken={authTokens?.accessToken}
            />
        </>
    );
};

export default GoogleLoginBtn;
