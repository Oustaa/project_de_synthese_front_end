import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, usename: "" },
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
