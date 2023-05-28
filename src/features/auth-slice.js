import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const isLoggedIn = createAsyncThunk("/is/loggedin", async () => {
  const token = localStorage.getItem("token");

  if (!token) return { token: null, username: "" };
  const resp = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/auth/stores/isloggedin`,
    {
      headers: { Authorization: token },
    }
  );

  return await resp.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, username: "", loading: true },
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isLoggedIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(isLoggedIn.fulfilled, (state, { payload }) => {
        if (!payload.token && !payload.username) {
          localStorage.removeItem("cart_products");
        }
        state.username = payload.username;
        state.token = payload.token;
        state.loading = false;
      })
      .addCase(isLoggedIn.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
