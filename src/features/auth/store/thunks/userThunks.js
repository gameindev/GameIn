import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../app/services/api";
import { logout as authLogout } from "../authSlice";
import { clearUser } from "../userSlice";

export const refreshUser = createAsyncThunk(
    "user/refresh",
    async (_, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth?.user?.id;

           
            const {
                data: { data: refreshedUserData },
            } = await api.get(
                `/users/${userId}?populate=creator_profile,brand_profile,user_bio`
            );

            return refreshedUserData;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { dispatch }) => {
        // Clear both auth and user data
        dispatch(authLogout());
        dispatch(clearUser());
        
        // Clear localStorage
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
);