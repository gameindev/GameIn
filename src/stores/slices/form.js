import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: {},
};

const formSlice = createSlice({
  name: "multiStepForm",
  initialState,
  reducers: {
    initializeForm: (state, action) => {
      const { formId, initialData } = action.payload;
      state.forms[formId] = {
        currentStep: 0,
        formData: initialData || {},
      };
    },
    saveStepData: (state, action) => {
      const { formId, data } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].formData = {
          ...state.forms[formId].formData,
          ...data,
        };
      }
    },
    nextStep: (state, action) => {
      const { formId } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].currentStep += 1;
      }
    },
    prevStep: (state, action) => {
      const { formId } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].currentStep -= 1;
      }
    },
    resetForm: (state, action) => {
      const { formId } = action.payload;
      if (state.forms[formId]) {
        delete state.forms[formId];
      }
    },
  },
});

export const { initializeForm, saveStepData, nextStep, prevStep, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
