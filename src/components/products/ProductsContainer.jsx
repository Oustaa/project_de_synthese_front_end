import React from "react";
import ProductCard from "./ProductCard";
import {
  StyledProducts,
  StyledProductsContainer,
} from "../../styles/styled-product";

const ProductsContainer = ({ title, data }) => {
  const products = data?.value;

  return (
    <StyledProducts>
      <header>
        <h2>{title}</h2>
      </header>
      <StyledProductsContainer>
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </StyledProductsContainer>
    </StyledProducts>
  );
};

export default ProductsContainer;
