import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";

const getImageUrl = (path) => (path ? `${import.meta.env.VITE_ASSET_URL}/${path}` : null);

export default function useProfileMediaUrls() {
  const profile = useSelector(currentUser);
  const userType = profile?.user?.userType;

  const creatorProfile = profile?.user?.creatorProfile;
  const brandProfile = profile?.user?.brandProfile;

  const profileType = userType === "CREATOR" ? creatorProfile : brandProfile;

  const avatarUrl = getImageUrl(profileType?.profileImage?.path);
  const coverImageUrl = getImageUrl(profileType?.coverImage?.path);

  return {
    avatarUrl,
    coverImageUrl,
  };
}
