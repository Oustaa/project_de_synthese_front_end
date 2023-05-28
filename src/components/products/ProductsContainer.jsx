import React from "react";
import ProductCard from "./ProductCard";
import {
  StyledProducts,
  StyledProductsContainer,
} from "../../styles/styled-product";
import Loader from "../Loader";

const ProductsContainer = ({ title, data }) => {
  const products = data?.value;

  return (
    <StyledProducts>
      <header>
        <h2>{title}</h2>
      </header>
      {data?.loading ? (
        <Loader height={"400px"} />
      ) : (
        <StyledProductsContainer>
          {products?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </StyledProductsContainer>
      )}
    </StyledProducts>
  );
};

export default ProductsContainer;
