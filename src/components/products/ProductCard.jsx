import React from "react";
import { Link } from "react-router-dom";
import {
  StyledProduct,
  StyledProductImage,
  StyledProductBody,
} from "../../styles/styled-product";
const ProductCard = ({ _id, title, price, image, }) => {
  return (
    <Link to={`/product/${_id}`}>
      <StyledProduct title={title}>
        <StyledProductImage>
          <img src={image} alt={title} />
        </StyledProductImage>
        <StyledProductBody>
          <h2 title={title}>{title}</h2>
          <div>
            <h3>{price}</h3>
            <h3>New</h3>
          </div>
        </StyledProductBody>
      </StyledProduct>
    </Link>
  );
};

export default ProductCard;
