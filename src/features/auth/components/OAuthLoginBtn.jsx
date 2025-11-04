import { GoogleLogin } from "@react-oauth/google";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { useState } from "react";
import { useNavigate } from "react-router";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import routePaths from "../../../app/router/routes";
import useOAuthLogin from "../hooks/useOAuthLogin";
import CompleteProfile from "./CompleteProfile";
import { dispatch } from "../../../app/store/hooks";
import { refreshUser } from "../store/thunks/userThunks";
import { setUser } from "../store/userSlice";


const OAuthLoginBtn = () => {
    const [showCompleteProfile, setShowCompleteProfile] = useState(false);
    const [authTokens, setAuthTokens] = useState(null);

    const navigate = useNavigate();
    const { handleOAuthLogin, completeUserProfile } = useOAuthLogin();


    const onLoginSuccess = async (response) => {
        try {
            const result = await handleOAuthLogin({
                provider: "google",
                token: response?.credential,
            });

            if (result?.error) {
                showNotificationHelper("Login Error", result.error, NOTIFICATION_TYPES.ERROR);
                return;
            }


            const { isProfileIncomplete, authData, fullUserData } = result;

            if (isProfileIncomplete) {
                setAuthTokens(authData);
                setShowCompleteProfile(true);
            } else {
                showNotificationHelper(
                    "Login Successful",
                    `Welcome back, ${fullUserData?.username}`,
                    NOTIFICATION_TYPES.SUCCESS
                );
                navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
            }
        } catch (err) {
            showNotificationHelper(
                "Login Error",
                err?.message || "Google login failed",
                NOTIFICATION_TYPES.ERROR
            );
        }
    }

    const handleProfileComplete = async (authData) => {
      
        try {
            const fulluserData = await completeUserProfile(authData);
            
            setShowCompleteProfile(false);
            showNotificationHelper(
                "Login Successful",
                `Welcome back, ${fulluserData?.username}`,
                NOTIFICATION_TYPES.SUCCESS
            );
            navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
        } catch (err) {
            showNotificationHelper(
                "Login Error",
                err?.message || "Profile completion failed",
                NOTIFICATION_TYPES.ERROR
            );
        }
    };

    return (
        <>
            <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={() =>
                    showNotificationHelper("Login Error", "Google sign-in failed", NOTIFICATION_TYPES.ERROR)
                }
            />

            <CompleteProfile
                opened={showCompleteProfile}
                onClose={() => setShowCompleteProfile(false)}
                onComplete={handleProfileComplete}
                accessToken={authTokens?.accessToken}
            />
        </>
    )
}

export default OAuthLoginBtn;