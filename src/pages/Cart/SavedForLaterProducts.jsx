import React from "react";
import { StyledProducts } from "../../styles/styled-product";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart, deleteProduct } from "../../features/cart-slice";
import getSymbolFromCurrency from "currency-symbol-map";

const StyledProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xxl);
  margin-top: var(--spacing-xl);
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledProduct = styled.div`
  max-width: 100%;
`;

const StyledProductImage = styled.div`
  width: 100%;
  aspect-ratio: 1/0.6;
  // background-color: var(--dark-400);
  border-radius: var(--radius-sm);

  img {
    width: 100%;
    aspect-ratio: 1/0.6;
    object-fit: contain;
  }
`;

const StyledProductBody = styled.div`
  h2 {
    font-size: 1.2rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background-color: var(--dark-200);
      border: none;
      border-radius: var(--radius-sm);
      color: var(--dark-700);
      padding: 5px 10px;
    }
  }
`;

const SavedForLaterProducts = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <StyledProducts>
      {products.length ? (
        <>
          <hr />
          <h2>
            {products.length} Item{products.length > 1 ? "s" : ""} Saved For
            Later
          </h2>
          <StyledProductsContainer>
            {products.map(({ _id, store, images, title, price, currency }) => (
              <StyledProduct key={_id}>
                <StyledProductImage>
                  <img
                    crossOrigin="anonymous"
                    src={`${process.env.REACT_APP_BASE_URL}/images/${store}/products/${images[0]}`}
                    alt=""
                  />
                </StyledProductImage>
                <StyledProductBody>
                  <h2>{title}</h2>
                  <h2>
                    {getSymbolFromCurrency(currency)}
                    {price}
                  </h2>
                  <div>
                    <button onClick={() => dispatch(addToCart(_id))}>
                      Move to cart
                    </button>
                    <button onClick={() => dispatch(deleteProduct(_id))}>
                      Delete
                    </button>
                  </div>
                </StyledProductBody>
              </StyledProduct>
            ))}
          </StyledProductsContainer>
        </>
      ) : null}
    </StyledProducts>
  );
};

export default SavedForLaterProducts;
