import { formatDate } from "../../utils/helpers";
import { API_PATHS } from "../endpoints";

export const createUser = async (formData, post) => {
  console.log("formData", formData);
  const apiBody = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    user_type: formData.role?.toUpperCase() || "USER",
    date_of_birth: formatDate(formData.dob),
    is_active: true,
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Captcha-Token": formData.captcha || "",
  };

  try {
    const { data } = await post(API_PATHS.USERS.CREATE, apiBody, headers);
    return { userData: data, error: null };
  } catch (err) {
    return { userData: null, error: err?.message || "Something went wrong" };
  }
};

export const getUserProfile = async (get, userId, user_type, accessToken) => {
  const profileMap = {
    BRAND: "brandProfile",
    CREATOR: "creatorProfile",
    COMMUNITY: "communityProfile",
  };
  const profileType = profileMap[user_type?.toUpperCase()] || "";

  const getAuthHeaders = (accessToken) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  const { data } = await get(
    `/users/${userId}${profileType ? `?populate=${profileType}` : ""}`,
    getAuthHeaders(accessToken)
  );
  return data;
};

export const getFollowerStats = (user) => {
  if (!user) return { totalFollowers: 0, socials: [] };

  const profileMap = {
    CREATOR: "creatorProfile",
    BRAND: "brandProfile",
    COMMUNITY: "communityProfile",
  };

  const profileKey = profileMap[user.user_type?.toUpperCase()];
  const profile = user[profileKey] || {};

  const totalFollowers = profile.followers || 0;

  const socials = Object.entries(profile.followers || {}).map(
    ([platform, count]) => ({
      text: platform,
      followers: count,
    })
  );

  return { totalFollowers, socials };
};
