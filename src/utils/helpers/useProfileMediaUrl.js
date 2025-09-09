import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";

const getImageUrl = (path) => (path ? `${import.meta.env.VITE_ASSET_URL}/${path}` : null);

export default function useProfileMediaUrls() {
  const profile = useSelector(currentUser);
  const user_type = profile?.user?.user_type;

  const creator_profile = profile?.user?.creator_profile;
  const brand_profile = profile?.user?.brand_profile;

  const profile_type = user_type === "CREATOR" ? creator_profile : brand_profile;

  const avatarUrl = getImageUrl(profile_type?.profile_image?.path);
  const coverImageUrl = getImageUrl(profile_type?.cover_image?.path);

  return {
    avatarUrl,
    coverImageUrl,
  };
}
