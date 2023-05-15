import React from "react";
import {
  StyledNavBar,
  StyledHeader,
  StyledLogo,
  StyledSearchForm,
  StyledActions,
  StyledNav,
  StyledLinks,
} from "../../styles/styled-header";
import { Link } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledSubCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`;

const Header = () => {
  const categories = useSelector((state) => state.categories.value);

  return (
    <StyledNavBar>
      <StyledHeader>
        <StyledLogo>
          <div className="img"></div>
          <span>Logo</span>
        </StyledLogo>
        <StyledSearchForm>
          <input placeholder="Search...." type="text" />
          <button>Search</button>
        </StyledSearchForm>
        <StyledActions>
          <button>
            Log in <BsPerson />
          </button>
          <button>
            Your Cart <BsCart />
          </button>
        </StyledActions>
      </StyledHeader>
      <StyledNav>
        <StyledLinks>
          {categories?.map((category) => (
            <Link to={`/products/${category.name}`}>
              <span className="category">{category.name}</span>
              <StyledSubCategories>
                {category.subCategories?.map((subCategory) => (
                  <Link to={`/products/sub/${subCategory.name}`}>
                    {subCategory.name}
                  </Link>
                ))}
              </StyledSubCategories>
            </Link>
          ))}
        </StyledLinks>
        <StyledLinks>
          <Link to="/store.com/create">Create Store</Link>
          <Link to="/store.com">Your Store</Link>
        </StyledLinks>
      </StyledNav>
    </StyledNavBar>
  );
};

export default Header;
