import { API_PATHS } from "./../endpoints/index";

export const loginWithProvider = async (provider, token, post) => {
  let endpoint;

  switch (provider.toLowerCase()) {
    case "google":
      endpoint = API_PATHS.AUTH.GOOGLE_OAUTH;
      break;
    case "twitch":
      endpoint = API_PATHS.AUTH.TWITCH_OAUTH;
      break;
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
