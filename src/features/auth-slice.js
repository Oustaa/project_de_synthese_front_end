import { compose, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    store: {
      token: null,
      name: null,
    },
    user: {},
  },
  reducers: {
    logInStore: (state, { payload }) => {
      state.store.token = payload.token;
      state.store.name = payload.name;
    },
  },
});

export const { logInStore } = authSlice.actions;

export default authSlice.reducer;
