import { useDispatch } from "react-redux";
import { setAuth } from "../stores/slices/auth";
import { setUser } from "../stores/slices/user";
import useApi from "./useApi";
import { loginWithProvider } from "../services/auth/authService";
import { getUserProfile } from "../services/users";

const useOAuthLogin = () => {
  const { get, post } = useApi();
  const dispatch = useDispatch();

  const handleOAuthLogin = async ({ provider, token }) => {
    try {
      if (!token) return { error: "Missing OAuth token" };
      const { accessToken, refreshToken, user } = await loginWithProvider(
        provider,
        token,
        post
      );

      const isProfileIncomplete = !user?.userType;
      let fullUserData = null;
      if (!isProfileIncomplete) {
        dispatch(setAuth({ accessToken, refreshToken, user }));
        fullUserData = await getUserProfile(
          get,
          user.id,
          user.userType,
          accessToken
        );
        dispatch(setUser({ user: fullUserData }));
      }

      return {
        isProfileIncomplete,
        authData: { accessToken, refreshToken, user },
        fullUserData,
      };
    } catch (err) {
      return { error: err?.message || `Login failed for ${provider}` };
    }
  };

  const completeUserProfile = async (authData) => {
    const { accessToken, user } = authData;
    dispatch(setAuth(authData));
    const fullUserData = await getUserProfile(
      get,
      user.id,
      user.userType,
      accessToken
    );
    dispatch(setUser({ user: fullUserData }));
    return fullUserData;
  };

  return { handleOAuthLogin, completeUserProfile };
};

export default useOAuthLogin;
