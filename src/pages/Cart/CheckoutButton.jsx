import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { StyledButton } from "../../styles";

const StyledCheckOutContaier = styled.div`
  width: 40%;
  background-color: var(--dark-000);
  padding: var(--spacing-xl);
  box-shadow: var(--boxShadow);
  h3 {
    margin-bottom: var(--spacing-xl);
  }
  button {
    width: 100%;
  }
`;

const CheckoutButton = () => {
  const { products, ids } = useSelector((state) => state.cart);
  const [totle, setTotal] = useState(0);

  useEffect(() => {
    const totle = products.reduce(
      (current, product) => current + product.price * ids[product._id].qte,
      0
    );

    setTotal(totle.toFixed(2));
  }, [products, ids]);

  return (
    <StyledCheckOutContaier>
      <h3>
        Subtotal ({products.length} items): ${totle}
      </h3>
      <StyledButton>Porceed To Checkout</StyledButton>
    </StyledCheckOutContaier>
  );
};

export default CheckoutButton;
