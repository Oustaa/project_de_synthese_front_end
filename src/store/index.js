import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import categoriesSlice from "../features/categories-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
  },
});
