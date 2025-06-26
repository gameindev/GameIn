// src/stores/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { refreshUser } from "./../thunks/userThunks";

const initialState = { profile: null, loading: false, error: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    clearUser: () => ({ profile: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
