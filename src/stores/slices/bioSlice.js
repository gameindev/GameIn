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
    moveGameUrl(state, action) {
      const { from, to } = action.payload;
      if (
        from < 0 ||
        to < 0 ||
        from >= state.gamesUrl.length ||
        to >= state.gamesUrl.length
      )
        return;

      const updated = [...state.gamesUrl];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);

      updated.forEach((game, index) => {
        game.sortOrder = index;
      });

      state.gamesUrl = updated;
    },
  },
});

export const {
  setBio,
  addGameUrl,
  removeGameUrl,
  toggleFavorite,
  moveGameUrl,
} = bioSlice.actions;
export default bioSlice.reducer;
