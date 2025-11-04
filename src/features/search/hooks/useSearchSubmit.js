import { dispatch } from "../../../app/store/hooks";
import { setFollowedUserIds, setFollowers, setFollowing } from "../../account/store/followSlice";
import { SEARCH_ENDPOINTS } from "../api/searchEndpoints";
import { FOLLOW_ENDPOINTS } from "../../account/api/followEndpoints";

const API_PATHS = {
    SEARCH: SEARCH_ENDPOINTS,
    FOLLOW: FOLLOW_ENDPOINTS,
};

export const useSearchSubmit = async (formData, userType, lastQueryRef, setSearchData, user, get) => {
    const { search_input, country } = formData;
    const currentQuery = {
        keyword: search_input?.trim() || "",
        user_type: userType?.toUpperCase(),
        country: country || "",
    };
    
    if (
        lastQueryRef.current &&
        JSON.stringify(lastQueryRef.current) === JSON.stringify(currentQuery)
    ) {
        console.log("No change in search input, skipping API call");
        return;
    }
    
    try {
        const { data } = await get({
            url: API_PATHS.SEARCH.SEARCH_USERS,
            params: {
                ...currentQuery,
                page: 1,
                limit: 20,
            },
        });
        setSearchData(data);

        if (user?.id) {
            const followingRes = await get({
                url: API_PATHS.FOLLOW.GET_FOLLOWING(user.id),
            });
            const followingList = followingRes?.data || [];
            dispatch(setFollowing(followingList));
            dispatch(setFollowedUserIds(followingList.map((u) => u.id)));

            const followersRes = await get({
                url: API_PATHS.FOLLOW.GET_FOLLOWERS(user.id),
            });
            dispatch(setFollowers(followersRes?.data || []));
        }
        lastQueryRef.current = currentQuery;
    } catch (error) {
        console.error("Search error:", error);
        setSearchData({ results: [] });
    }
}