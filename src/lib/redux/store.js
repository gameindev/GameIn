import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    multiStepForm: formReducer,
  },
});

export default store;
