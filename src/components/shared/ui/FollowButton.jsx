import { Button } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  addFollowedUserId,
  removeFollowedUserId,
} from "../../../stores/slices/followSlice";
import useApi from "./../../../hooks/useApi";
import { useState } from "react";
import { API_PATHS } from "../../../services/endpoints";

export default function FollowButton({
  targetUserId,
  width = "6.25em",
  onChange,
  ...props
}) {
  const followedUserIds = useSelector((state) => state.follow.followedUserIds);
  const { post, del } = useApi();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const isFollowing = followedUserIds.includes(targetUserId);

  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await del(API_PATHS.FOLLOW.UNFOLLOW_USER(targetUserId));
        dispatch(removeFollowedUserId(targetUserId));
      } else {
        await post({
          url: API_PATHS.FOLLOW.FOLLOW_USER,
          payload: { following_id: targetUserId },
        });
        dispatch(addFollowedUserId(targetUserId));
      }

      if (onChange) onChange(!isFollowing);
    } catch (error) {
      console.error("Follow toggle failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      loading={loading}
      onClick={toggleFollow}
      width={width}
      {...props}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
