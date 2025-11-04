import { AUTH_ENDPOINTS } from "../api/authEndpoints";


export const oAuthService = async (provider, token, post) => {
    let endpoint;   

    switch (provider.toLowerCase()) {
        case "google":
            endpoint = AUTH_ENDPOINTS.GOOGLE_OAUTH;
            break;
        // case "twitch":
        //     endpoint = AUTH_ENDPOINTS.TWITCH_OAUTH;
        //     break;
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }

    const { data } = await post({
        url: endpoint,
        payload: { token },
    });

    return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
    };
};