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

      // dispatch(setAuth({ accessToken, refreshToken, user }));

      const isProfileIncomplete = !user?.userType;

      if (!isProfileIncomplete) {
        const fullUserData = await getUserProfile(
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
      };
    } catch (err) {
      return { error: err?.message || `Login failed for ${provider}` };
    }
  };

  const completeUserProfile = async (authData) => {
    const { accessToken, user } = authData;
    const fullUserData = await getUserProfile(
      get,
      user.id,
      user.userType,
      accessToken
    );

    dispatch(setAuth(authData));
    dispatch(setUser({ user: fullUserData }));
  };

  return { handleOAuthLogin, completeUserProfile };
};

export default useOAuthLogin;
