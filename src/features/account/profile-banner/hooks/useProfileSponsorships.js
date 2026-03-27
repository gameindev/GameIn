import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { getUserProfile } from "../../../../app/services/user/fetch-user-data.service";
import { USERTYPES } from "../../../../shared/enums/userTypesEnum";
import { OFFERINGS_ORDER_ENDPOINTS } from "../../../offerings/api/offering_order_endpoint";
import useApi from "../../../../shared/hooks/useApi";
import profileMediaUrlsHelper from "../../../../shared/utils/helpers/useProfileMediaUrl.helper";

const getProfile = (userProfile) => {
  if (!userProfile) return null;
  if (userProfile.user_type === USERTYPES.CREATOR)
    return userProfile.creator_profile;
  if (userProfile.user_type === USERTYPES.BRAND)
    return userProfile.brand_profile;
  return userProfile.community_profile;
};

const getDisplayName = (userProfile) => {
  if (!userProfile) return "";
  const profile = getProfile(userProfile);

  const nameParts = [profile?.first_name, profile?.last_name].filter(Boolean);
  if (nameParts.length) return nameParts.join(" ");
  return profile?.brand_name || userProfile?.username || "";
};

export default function useProfileSponsorships({
  userProfile,
  page = 1,
  limit = 20,
} = {}) {
  const { get } = useApi();
  const accessToken = useAppSelector((state) => state.auth?.accessToken);

  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = userProfile?.id;
  const userType = userProfile?.user_type;

  const isBrandProfile = userType === USERTYPES.BRAND;
  const isCreatorProfile = userType === USERTYPES.CREATOR;
  const params = useMemo(
    () => ({
      page,
      limit,
      creator_id: isCreatorProfile ? userId : undefined,
      brand_id: isBrandProfile ? userId : undefined,
      status: "PAID",
    }),
    [page, limit, userId, isBrandProfile, isCreatorProfile],
  );

  useEffect(() => {
    if (!userId) {
      setSponsors([]);
      return;
    }

    const loadSponsors = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await get({
          url: OFFERINGS_ORDER_ENDPOINTS.LIST(params),
        });
   
        const orders = res?.data?.data || res?.data || [];

        const users = orders.map((order) =>
          isBrandProfile ? order.creator : order.brand,
        );

        const normalized = users.filter(Boolean).map((u) => ({
          id: u.id,
          name: u.username,
          userType: u.user_type,
        }));

        // remove duplicates
        const uniqueSponsors = Array.from(
          new Map(normalized.map((u) => [u.id, u])).values(),
        );

        const sponsorProfiles = await Promise.allSettled(
          uniqueSponsors.map((sponsor) =>
            getUserProfile(get, sponsor.id, accessToken, sponsor.userType),
          ),
        );

        const merged = uniqueSponsors
          .map((sponsor, index) => {
            const result = sponsorProfiles[index];
            const userProfile =
              result?.status === "fulfilled" ? result.value : null;
            const displayName = sponsor.name || getDisplayName(userProfile) || sponsor.name;
            
            const { avatarUrl } = profileMediaUrlsHelper(userProfile);

            return {
              id: sponsor.id,
              userType: sponsor.userType,
              name: displayName,
              logo: avatarUrl,
              userProfile,
            };
          })
          .filter((sponsor) => sponsor.id);

        setSponsors(merged);
      } catch (err) {
        setError(err?.message || "Failed to load sponsors");
        setSponsors([]);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, [get, params, userId, isBrandProfile, accessToken]);

  return { sponsors, loading, error };
}
