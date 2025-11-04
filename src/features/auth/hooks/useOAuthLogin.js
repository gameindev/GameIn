import { useAppDispatch } from "../../../app/store/hooks";
import useApi from "../../../shared/hooks/useApi";
import { getUserProfileService } from "../../../app/services/user/user-profile.service";
import { oAuthService } from "../services/oAuth.service";
import { setAuth } from "../store/authSlice";
import { setUser } from "../store/userSlice";


const useOAuthLogin = () => {
    const { get, post } = useApi();
    const dispatch = useAppDispatch();

    const handleOAuthLogin = async ({ provider, token }) => {
        try {
            if (!token) return { error: "Missing OAuth token" };
            const { accessToken, refreshToken, user } = await oAuthService(
                provider,
                token,
                post
            );

            const isProfileIncomplete = !user?.user_type;

           
            let fullUserData = null;
            if (!isProfileIncomplete) {
                dispatch(setAuth({ accessToken, refreshToken, user }));
                fullUserData = await getUserProfileService(
                    get,
                    user.id,
                    accessToken,
                    user.user_type,
                );

                // console.log(fullUserData);
                dispatch(setUser({ ...fullUserData }));
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
        const { accessToken, refreshToken, user } = authData.user;
      
        dispatch(setAuth({ accessToken, refreshToken, user: authData.user.user }));
        const fullUserData = await getUserProfileService(get, user.id, accessToken, user.user_type);
        
      
        dispatch(setUser({ ...fullUserData }));
        return fullUserData;
    };   

    return { handleOAuthLogin, completeUserProfile };
};

export default useOAuthLogin;
