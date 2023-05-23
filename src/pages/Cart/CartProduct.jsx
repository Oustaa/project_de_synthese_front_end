import React from "react";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  toggleQuantity,
  saveLater,
} from "../../features/cart-slice";
import { useDispatch, useSelector } from "react-redux";

const StyledCartProduct = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  border: 1px dashed var(--dark-300);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
`;

const StyledCartProductImage = styled.div`
  width: 20%;
  aspect-ratio: 1 / 1;
  padding-right: var(--spacing-xl);
  border-right: 1px dashed var(--dark-300);
  background-color: var(--white);
  img {
    aspect-ratio: 1 /1;
    object-fit: contain;
  }
`;

const StyledCartProductData = styled.div`
  width: 80%;
`;

const StyledCartProductHeader = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
`;

const StyledCartProductActions = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: var(--spacing-xl);
  }

  & > button {
    border: none;
    background-color: transparent;
    color: var(--dark-800);
  }
`;

const StyledCartProductQte = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-inline: 5px;
  }

  h5 {
  }

  button {
    background-color: var(--dark-200);
    border: none;
    border-radius: var(--radius-sm);
    color: var(--dark-700);
    padding: 5px 10px;
  }
`;

const CartProduct = ({ images, store, title, price, currency, _id }) => {
  const dispatch = useDispatch();
  const { qte } = useSelector((state) => state.cart.ids)[_id];

  return (
    <StyledCartProduct>
      <StyledCartProductImage>
        <img
          crossOrigin="anonymous"
          src={`${process.env.REACT_APP_BASE_URL}/images/${store}/products/${images[0]}`}
          alt={title}
        />
      </StyledCartProductImage>
      <StyledCartProductData>
        <StyledCartProductHeader>
          <h3>{title}</h3>
          <h2>
            {getSymbolFromCurrency(currency)}
            {price}
          </h2>
        </StyledCartProductHeader>
        <StyledCartProductActions>
          <StyledCartProductQte>
            <h4>Qte:</h4>
            <button
              onClick={() => dispatch(toggleQuantity({ id: _id, number: 1 }))}
            >
              +
            </button>
            <h4>{qte}</h4>
            <button
              onClick={() => dispatch(toggleQuantity({ id: _id, number: -1 }))}
            >
              -
            </button>
          </StyledCartProductQte>
          <button onClick={() => dispatch(deleteProduct(_id))}>Delete</button>
          <button onClick={() => dispatch(saveLater(_id))}>
            Save For Later
          </button>
        </StyledCartProductActions>
      </StyledCartProductData>
    </StyledCartProduct>
  );
};

export default CartProduct;
