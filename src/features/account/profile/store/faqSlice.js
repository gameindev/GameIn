import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byUser: {},
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqs(state, action) {
      const { userId, faqs } = action.payload || {};
      if (!userId) return;
      state.byUser[userId] = Array.isArray(faqs) ? faqs : [];
    },
    addFaq(state, action) {
      const { userId, q, a } = action.payload || {};
      if (!userId || !q || !a) return;
      const list = state.byUser[userId] || [];
      state.byUser[userId] = [{ q, a }, ...list];
    },
    removeFaq(state, action) {
      const { userId, index } = action.payload || {};
      if (!userId) return;
      const list = state.byUser[userId] || [];
      if (index < 0 || index >= list.length) return;
      list.splice(index, 1);
      state.byUser[userId] = list;
    },
    clearFaqs(state, action) {
      const { userId } = action.payload || {};
      if (userId) {
        delete state.byUser[userId];
      } else {
        state.byUser = {};
      }
    },
  },
});

export const { setFaqs, addFaq, removeFaq, clearFaqs } = faqSlice.actions;
export default faqSlice.reducer;

