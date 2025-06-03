// src/stores/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload;
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;