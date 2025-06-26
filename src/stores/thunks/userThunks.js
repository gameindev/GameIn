import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../services/axios/index";

export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth?.user?.id;
      const {
        data: { data: refreshedUserData },
      } = await api.get(
        `/users/${userId}?populate=creatorProfile,brandProfile,userBio`
      );
      console.log(refreshedUserData);

      return { user: refreshedUserData };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
