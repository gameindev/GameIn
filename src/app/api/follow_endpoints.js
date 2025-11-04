

export const FOLLOW_ENDPOINTS = {
    FOLLOW_USER: `/users/follow`,
    UNFOLLOW_USER: (id) => `/users/${id}/follow`,
    GET_FOLLOWERS: (id) => `/users/${id}/followers`,
    GET_FOLLOWING: (id) => `/users/${id}/following`,
}