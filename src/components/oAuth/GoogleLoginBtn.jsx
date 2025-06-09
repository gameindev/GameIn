import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { setUser } from "../../stores/slices/user";
import { setAuth } from "../../stores/auth/authSlice";
import CompleteProfile from "./CompleteProfile";
import routePaths from "../../routes/endpoints";
import { showNotification } from "../../utils/helpers";
import useApi from "../../hooks/useApi";
import { API_PATHS } from "../../services/endpoints";

const GoogleLoginBtn = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const { post } = useApi();

  const handleSuccess = async (response) => {
    try {
      const { data } = await post(API_PATHS.AUTH.GOOGLE_OAUTH, { token: response.credential});

      const isProfileIncomplete = !data.user?.userType && !data.user?.password;

      // Store authentication and user details in Redux
      dispatch( setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, }) );
      dispatch( setUser({ user: data.user }) );

      showNotification( "Login Successful", `Welcome back, ${data.user.username}` );

      // If the profile is incomplete, show the complete profile form
      isProfileIncomplete ? setShowCompleteProfile(true) : navigate(routePaths.dashboard);
    } catch (err) {
      showNotification( "Login Error", `{${err?.message || "Something went wrong with Google login"} }`, "red" );
    }
  };

  const handleProfileCompleted = ({ profile }) => {
    dispatch(setAuth({ accessToken, refreshToken }));
    dispatch(setUser({ profile }));
    setShowCompleteProfile(false);
    navigate(routePaths.dashboard);
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
      />
    </>
  );
};

export default GoogleLoginBtn;
