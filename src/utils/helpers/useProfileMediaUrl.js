import { useSelector } from "react-redux";
import { currentUser } from "../../stores/selectors";

const getImageUrl = (path) => (path ? `http://localhost:3000/${path}` : null);

export default function useProfileMediaUrls() {
  const { user } = useSelector(currentUser);
  const userType = user?.userType;

  const creatorProfile = user?.creatorProfile;
  const brandProfile = user?.brandProfile;

  const profile = userType === "CREATOR" ? creatorProfile : brandProfile;

  const avatarUrl = getImageUrl(profile?.profileImage?.path);
  const coverImageUrl = getImageUrl(profile?.coverImage?.path);

  return {
    avatarUrl,
    coverImageUrl,
  };
}
