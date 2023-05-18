import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth-slice";
import categoriesSlice from "../features/categories-slice";
import uiSlice from "../features/ui-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    ui: uiSlice,
  },
});
