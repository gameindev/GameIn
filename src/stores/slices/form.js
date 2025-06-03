import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  formData: {
    email: "",
    username: "",
    password: "",
    dob: "",
    acknowledgement: false,
    role: "",
    captcha: "",
  },
};

const formSlice = createSlice({
  name: "multiStepForm",
  initialState,
  reducers: {
    saveStepData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => state.currentStep += 1,
    prevState: (state) => state.currentStep -= 1,
    resetForm: () => initialState,
  },
});

export const { saveStepData, nextStep, prevStep, resetForm } = formSlice.actions;
export default formSlice.reducer;