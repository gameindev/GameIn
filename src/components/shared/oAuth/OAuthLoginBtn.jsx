import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router";
import CompleteProfile from "./CompleteProfile";
import useOAuthLogin from "../../../hooks/useOAuthLogin";
import { showNotification } from "../../../utils/helpers";
import routePaths from "../../../routes/endpoints";
import { useSelector } from "react-redux";
import { currentUser } from "../../../stores/selectors";

const OAuthLoginBtn = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [authTokens, setAuthTokens] = useState(null);
  const { user } = useSelector(currentUser) || {};

  const navigate = useNavigate();
  const { handleOAuthLogin, completeUserProfile } = useOAuthLogin();

  const onLoginSuccess = async (response) => {
    try {
      const result = await handleOAuthLogin({
        provider: "google",
        token: response?.credential,
      });

      if (result?.error) {
        showNotification("Login Error", result.error, "red");
        return;
      }

      const { isProfileIncomplete, authData } = result;

      if (isProfileIncomplete) {
        setAuthTokens(authData);
        setShowCompleteProfile(true);
      } else {
        showNotification(
          "Login Successful",
          `Welcome back, ${user.username}`
        );
        navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
      }
    } catch (err) {
      showNotification(
        "Login Error",
        err?.message || "Google login failed",
        "red"
      );
    }
  };

  const onProfileCompleted = async (authData) => {
    await completeUserProfile(authData);
    setShowCompleteProfile(false);
    showNotification(
      "Login Successful",
      `Welcome back, ${user.username}`
    );
    navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT);
  };

  return (
    <>
      <GoogleLogin
        onSuccess={onLoginSuccess}
        onError={() =>
          showNotification("Login Error", "Google sign-in failed", "red")
        }
      />

      <CompleteProfile
        opened={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={onProfileCompleted}
        accessToken={authTokens?.accessToken}
      />
    </>
  );
};

export default OAuthLoginBtn;
