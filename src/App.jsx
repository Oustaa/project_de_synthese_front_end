import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Products from "./pages/Products";
import Store from "./pages/Store";

import StoreCom from "./pages/store.com/store/Store";
import CreateStore from "./pages/store.com/create";
import CreateProduct from "./pages/store.com/CreateProduct";
import StoreLogIn from "./pages/store.com/LogIn";

import Layout from "./components/Layout/Layout";
import StoreLayout from "./components/Layout/sotre/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import GlobalStyles from "./styles/globalStyles";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/product/:category" element={<Products />} />
            <Route path="/store/:id" element={<Store />} />
          </Route>
          <Route path="/store.com">
            <Route element={<ProtectedRoute to={"login"} />}>
              <Route index element={<StoreCom />} />
            </Route>

            <Route path="create" element={<CreateStore />} />
            <Route path="login" element={<StoreLogIn />} />
            <Route path="create/creat" element={<CreateProduct />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;
