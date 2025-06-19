import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bio: "",
  introVideoUrl: "",
  introVideoFile: null,
  gamesUrl: [],
};

const bioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {
    setBio(state, action) {
      return { ...state, ...action.payload };
    },
    addGameUrl(state, action) {
      state.gamesUrl.push(action.payload);
    },
    removeGameUrl(state, action) {
      state.gamesUrl.splice(action.payload, 1);
    },
    toggleFavorite(state, action) {
      const index = action.payload;
      const game = state.gamesUrl[index];
      if (game) {
        const favoriteCount = state.gamesUrl.filter((g) => g.favorite).length;
        if (!game.favorite && favoriteCount >= 4) return;
        state.gamesUrl[index].favorite = !game.favorite;
      }
    },
  },
});

export const { setBio, addGameUrl, removeGameUrl, toggleFavorite  } = bioSlice.actions;
export default bioSlice.reducer;
