import React, { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import Loader from "../../components/Loader";
import { StyledContainer } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getCartProducts, getIds } from "../../features/cart-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const [productsIds, setProductsIds] = useState([]);
  const { ids, products, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getIds());
    setProductsIds(JSON.parse(localStorage.getItem("cart_products")));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartProducts(productsIds));
  }, [dispatch, productsIds]);

  if (loading) return <Loader />;

  return (
    <StyledContainer>
      <CartProducts ids={ids} products={products} />
    </StyledContainer>
  );
};

export default Cart;
