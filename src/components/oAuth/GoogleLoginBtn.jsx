import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { setUser } from "../../stores/slices/user";
import { setAuth } from "../../stores/auth/authSlice";
import CompleteProfile from "./CompleteProfile";

const GoogleLoginBtn = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const redirectToDashboard = (userType) => {
    const route = {
      BRAND: "/brand/dashboard",
      CREATOR: "/creator/dashboard",
    }[userType?.toUpperCase()];
    if (route) {
      navigate(route);
    } else {
      navigate("/");
    }
  };

  const handleSuccess = async (response) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/google-authentication",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        }
      );

      if (!res.ok) throw new Error("Google authentication failed");

      const { data } = await res.json();

      const isProfileIncomplete = !data.user?.userType && !data.user?.password;

      dispatch(
        setAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      dispatch(setUser({ user: data.user }));
      console.log(data.user);

      if (isProfileIncomplete) {
        setShowCompleteProfile(true);
        return;
      }

      notifications.show({
        title: "Login Successful",
        message: `Welcome back, ${data.user.username}`,
        color: "green",
        position: "bottom-right",
      });

      redirectToDashboard(data.user.userType);
    } catch (error) {
      console.error("Google login failed:", error);
      notifications.show({
        title: "Login Error",
        message: "Something went wrong with Google login",
        color: "red",
        position: "bottom-right",
      });
    }
  };

  const handleProfileCompleted = ({ profile }) => {
    dispatch(setAuth({ accessToken, refreshToken }));
    dispatch(setUser({ profile }));
    setShowCompleteProfile(false);
    redirectToDashboard(profile.userType);
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          notifications.show({
            title: "Login Error",
            message: "Google sign-in failed",
            color: "red",
            position: "bottom-right",
          })
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
