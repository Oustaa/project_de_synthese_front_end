import React from "react";
import { StyledCategory } from "../../styles/styled-categories";
import { Link } from "react-router-dom";

const Category = ({ name, image }) => {
  return (
    <Link to={`/products/${name}`}>
      <StyledCategory>
        <div className="img">
          <img
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_BASE_URL}/images/categories/${image}`}
            alt={name}
          />
        </div>
        <h2>{name}</h2>
      </StyledCategory>
    </Link>
  );
};

export default Category;
