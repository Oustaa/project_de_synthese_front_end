import React from "react";
import { Link } from "react-router-dom";
import {
  StyledProduct,
  StyledProductImage,
  StyledProductBody,
} from "../../styles/styled-product";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductCard = ({ _id, title, price, images, currency, store }) => {
  return (
    <Link to={`/product/${_id}`}>
      <StyledProduct title={title}>
        <StyledProductImage>
          <img
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_BASE_URL}/images/${store}/products/${images[0]}`}
            alt={title}
          />
        </StyledProductImage>
        <StyledProductBody>
          <h2 title={title}>{title}</h2>
          <div>
            <h3>
              {getSymbolFromCurrency(currency)}
              {price}
            </h3>
            <h3>New</h3>
          </div>
        </StyledProductBody>
      </StyledProduct>
    </Link>
  );
};

export default ProductCard;
