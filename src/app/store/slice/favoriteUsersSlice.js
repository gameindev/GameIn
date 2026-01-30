import { createSlice } from "@reduxjs/toolkit";

const favoriteUserslice = createSlice({
  name: "favUsers",
  initialState: {
    favoriteUsers: [],
  },
  reducers: {
    setFavoriteUsers: (state, action) => {
        console.log(state,action);
        
      state.favoriteUsers = action.payload;
    },
  },
});

export const { setFavoriteUsers } = favoriteUserslice.actions;
export default favoriteUserslice.reducer;