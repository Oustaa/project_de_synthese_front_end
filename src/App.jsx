import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/singleProduct";
import ProductsByCategory from "./pages/ProductsByCategory";
import ProductsBySubCategory from "./pages/ProductsBySubCategory";
import Store from "./pages/store";
import Products from "./pages/store/Products";

import Layout from "./components/Layout/Layout";
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
            <Route path="/products/:name" element={<ProductsByCategory />} />
            <Route
              path="/products/sub/:id"
              element={<ProductsBySubCategory />}
            />
            <Route path="/store/:id">
              <Route index element={<Store />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};
export default App;
