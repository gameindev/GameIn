import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    multiStepForm: formReducer,
    auth: authReducer,
  },
  devTools: true,
});

export default store;
