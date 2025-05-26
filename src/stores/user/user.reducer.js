import { USER_ACTION_TYPES } from "./user.types";



const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action; // <== this MUST destructure the action object
    switch (type) {
      case USER_ACTION_TYPES.REGISTER_USER_START:
        return { ...state, isLoading: true, error: null };
  
      case USER_ACTION_TYPES.REGISTER_USER_SUCCESS:
        return { ...state, isLoading: false, currentUser: payload, error: null };
  
      case USER_ACTION_TYPES.REGISTER_USER_FAILED:
        return { ...state, isLoading: false, error: payload };
  
      default:
        return state;
    }
  };
  