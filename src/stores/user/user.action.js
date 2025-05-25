import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // return {type: 'user/SET_CURRENT_USER', payload: user}

// dispatch(setCurrentUser(user)) // {type: 'user/SET_CURRENT_USER', payload: user}

export const fetchUserStart = () =>
    createAction(USER_ACTION_TYPES.FETCH_USER_START);



/**
 * THUNK ACTIONS
 * */

export const registerUserAsync = (formData) => async () =>  {
    console.log(formData);
}