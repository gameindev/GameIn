import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        id: null,
        user_type: null,
    },
    loading: false,
    error: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    accessTokenExpiry: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            
            state.user = {
                id: null,
                user_type: null,
            }
            state.profile = null;
            state.accessToken = null
            state.refreshToken = null
            state.accessTokenExpiry = null
        },
        setAuth: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                user_type: action.payload.user.user_type ?? null,
            };
        },
        setAccessTokenExpiry: (state, action) => {
            state.accessTokenExpiry = action.payload;
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, logout, setAuth, setAccessTokenExpiry } = authSlice.actions
export default authSlice.reducer
