import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { FlexContainer, InputGroup, StyledButton } from "../../styles";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIds } from "../../features/cart-slice";

const StyledCart = styled.div`
  position: sticky;
  top: 0;
  width: 20%;
  padding: var(--spacing-lg);
`;

const Actions = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  function createOption(num) {
    const options = [];

    for (let index = 0; index < num; index++) {
      options.push(index + 1);
    }
    return options;
  }

  const addToCartHandler = () => {
    dispatch(setIds({ _id: product._id, qte: quantity }));
  };

  return (
    <StyledCart>
      <h3>Buy it now:</h3>
      <InputGroup>
        <label htmlFor="qte">
          <h4>Quantity</h4>
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          id="qte"
        >
          {createOption(product.stock_Quantity).map((elem, i) => (
            <option value={elem}>{elem}</option>
          ))}
        </select>
        <FlexContainer>
          <h3>Total Price:</h3>
          <h3>
            {getSymbolFromCurrency(product.currency)}
            {(quantity * product?.price).toFixed(2)}
          </h3>
        </FlexContainer>
        <FlexContainer extraStyles={""}>
          <StyledButton onClick={addToCartHandler}>Add to cart</StyledButton>
          <StyledButton>Add to wishlist</StyledButton>
        </FlexContainer>
        <StyledButton>Buy it now</StyledButton>
      </InputGroup>
    </StyledCart>
  );
};

export default Actions;
