import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import SingleProduct from "./pages/singleProduct";
import ProductsByCategory from "./pages/ProductsByCategory";
import ProductsBySubCategory from "./pages/ProductsBySubCategory";
import Store from "./pages/store";
import Products from "./pages/store/Products";
import LogIn from "./pages/LogIn";
import Register from "./pages/Rejester";
import Layout from "./components/Layout/Layout";

import GlobalStyles from "./styles/globalStyles";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

const App = () => {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products/:id" element={<ProductsByCategory />} />
          <Route path="/products/sub/:id" element={<ProductsBySubCategory />} />
          <Route path="/store/:id">
            <Route index element={<Store />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
      <GlobalStyles />
    </Router>
  );
};
export default App;
