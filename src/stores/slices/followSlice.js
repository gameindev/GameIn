import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  following: [],
  followers: [],
  followingCount: 0,
  followersCount: 0,
  followingLoading: false,
  followersLoading: false,
  followedUserIds: [],
  followerUserIds: [],
  followedLoaded: false,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowing: (state, action) => {
      const list = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.following || [];

      state.following = list;
      state.followingCount = list.length;
      state.followedUserIds = list.map((u) => u.id);
      state.followedLoaded = true;
    },
    setFollowers: (state, action) => {
      const list = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.followers || [];

      state.followers = list;
      state.followersCount = list.length;
      state.followerUserIds = list.map((u) => u.id);
    },
    setFollowedUserIds: (state, action) => {
      state.followedUserIds = action.payload;
      state.followedLoaded = true;
    },
    addFollowedUserId: (state, action) => {
      if (!state.followedUserIds.includes(action.payload)) {
        state.followedUserIds.push(action.payload);
        state.followingCount += 1;
      }
    },
    removeFollowedUserId: (state, action) => {
      state.followedUserIds = state.followedUserIds.filter(
        (id) => id !== action.payload
      );
      state.followingCount -= 1;
    },
  },
});

export const {
  setFollowing,
  setFollowers,
  setFollowedUserIds,
  addFollowedUserId,
  removeFollowedUserId,
} = followSlice.actions;

export default followSlice.reducer;
