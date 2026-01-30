import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    onlineUsers: [], // Array of { userId, username, email, userType, socketId, timestamp }
};

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        addOnlineUser: (state, action) => {
            const user = action.payload;
            // Remove existing entry if any, then add new one
            state.onlineUsers = state.onlineUsers.filter(
                (u) => (u.userId || u.id) !== (user.userId || user.id)
            );
            state.onlineUsers.push(user);
        },
        removeOnlineUser: (state, action) => {
            const userId = action.payload.userId || action.payload.id;
            state.onlineUsers = state.onlineUsers.filter(
                (u) => (u.userId || u.id) !== userId
            );
        },
        clearOnlineUsers: (state) => {
            state.onlineUsers = [];
        },
    },
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser, clearOnlineUsers } = onlineUsersSlice.actions;

// Selectors
export const selectOnlineUsers = (state) => state.onlineUsers?.onlineUsers || [];
export const selectIsUserOnline = (state, userId) => {
    return state.onlineUsers?.onlineUsers?.some(
        (u) => (u.userId || u.id) === userId
    ) || false;
};

export default onlineUsersSlice.reducer;

