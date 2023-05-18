import React from "react";
import ProductCard from "./ProductCard";
import {
  StyledProducts,
  StyledProductsContainer,
} from "../../styles/styled-product";

const products = [
  {
    _id: "6985345-246546452-435346546-45266",
    title:
      "Product number 46 displays a product product displays a product product product product displays a product product",
    price: "34.99$",
  },
];

const ProductsContainer = ({ title, data }) => {
  const products = data?.value;

  return (
    <StyledProducts>
      <header>
        <h2>{title || "Latest Visits"}</h2>
      </header>
      <StyledProductsContainer>
        {products?.map((product) => (
          <ProductCard {...product} />
        ))}
      </StyledProductsContainer>
    </StyledProducts>
  );
};

export default ProductsContainer;
