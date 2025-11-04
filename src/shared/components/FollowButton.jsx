import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import useApi from "../hooks/useApi";
import { useState } from "react";
import { FOLLOW_ENDPOINTS } from "../../features/account/api/followEndpoints";
import { addFollowedUserId, removeFollowedUserId } from "../../features/account/store/followSlice";


export default function FollowButton({
    targetUserId,
    width = "6.25em",
    onChange,
    ...props
}) {

    const followedUserIds = useAppSelector((state) => state.follow.followedUserIds);
    
    const { post, del } = useApi();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const isFollowing = followedUserIds.includes(targetUserId);

    const toggleFollow = async () => {
        setLoading(true);
        try {
            if (isFollowing) {
                await del({
                    url: FOLLOW_ENDPOINTS.UNFOLLOW_USER(targetUserId),
                });
                dispatch(removeFollowedUserId(targetUserId));
                if (onChange) onChange(false);
            } else {
                await post({
                    url: FOLLOW_ENDPOINTS.FOLLOW_USER,
                    payload: { following_id: targetUserId },
                });
                dispatch(addFollowedUserId(targetUserId));
                if (onChange) onChange(true);
            }
        } catch (error) {
            console.error("Follow toggle failed:", error);
            // Error is logged, state is not updated on failure
        } finally {
            setLoading(false);
        }
    };


    return (
        <Button
            variant="secondary"
            loading={loading}
            onClick={toggleFollow}
            w={width}
            {...props}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}