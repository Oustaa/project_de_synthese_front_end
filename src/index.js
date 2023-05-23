import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { getCategories } from "./features/categories-slice";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { getIds } from "./features/cart-slice";

if (process.env.REACT_APP_ENV === "production") disableReactDevTools();

store.dispatch(getCategories());
store.dispatch(getIds());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </>
);
