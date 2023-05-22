import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartProducts = createAsyncThunk("get/products", async (ids) => {
  const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart`, {
    ids: Object.keys(ids),
  });

  const data = await resp.data;

  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: true,
    products: [],
    ids: {},
  },
  reducers: {
    getIds: (state) => {
      state.ids = JSON.parse(localStorage.getItem("cart_products"));
    },
    setIds: (state, { payload }) => {
      if (state.ids[payload._id])
        state.ids[payload._id].qte += Number(payload.qte);
      else
        state.ids = {
          ...state.ids,
          [payload._id]: { qte: Number(payload.qte), saveLater: false },
        };
      localStorage.setItem("cart_products", JSON.stringify(state.ids));
    },
    deleteProduct: (state, { payload: id }) => {
      delete state.ids[id];
      state.products = state.products.filter(({ _id }) => _id !== id);
      localStorage.setItem("cart_products", JSON.stringify(state.ids));
    },
    toggleQuantity: (state, { payload }) => {
      state.ids[payload.id].qte += payload.number;
      localStorage.setItem("cart_products", JSON.stringify(state.ids));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      });
  },
});

export const { setIds, getIds, deleteProduct, toggleQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
