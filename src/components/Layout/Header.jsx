import React, { useState } from "react";
import {
  StyledNavBar,
  StyledHeader,
  StyledLogo,
  StyledSearchForm,
  StyledActions,
  StyledNav,
  StyledLinks,
} from "../../styles/styled-header";
import { StyledButton } from "../../styles";
import { Link } from "react-router-dom";
import { BsCart, BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toggleMenu } from "../../features/ui-slice";
const StyledSubCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.value);
  const openMenu = useSelector((state) => state.ui.openMenu);
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.length >= 3) navigate(`/search/${query}`);
  };

  return (
    <StyledNavBar>
      <StyledHeader>
        <Link to="/">
          <StyledLogo>
            <div className="img"></div>
            <span>Logo</span>
          </StyledLogo>
        </Link>
        <StyledSearchForm onSubmit={searchHandler}>
          <input
            placeholder="Search...."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
        </StyledSearchForm>
        <StyledActions>
          <button>
            Log in <BsPerson />
          </button>
          <Link to={"/cart"}>
            Your Cart <BsCart />
          </Link>
        </StyledActions>
      </StyledHeader>
      <StyledNav openMenu={openMenu}>
        <StyledLinks openMenu={openMenu}>
          <StyledButton
            color="var(--white)"
            onClick={() => dispatch(toggleMenu())}
          >
            {!openMenu ? <RxHamburgerMenu /> : <AiOutlineClose />}
          </StyledButton>
          {categories?.map((category) => (
            <Link key={category._id} to={`/products/${category._id}`}>
              <span className="category">{category.name}</span>
              {openMenu && (
                <StyledSubCategories>
                  {category.subCategories?.map((subCategory) => (
                    <Link
                      key={subCategory.name}
                      to={`/products/sub/${subCategory.name}`}
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </StyledSubCategories>
              )}
            </Link>
          ))}
        </StyledLinks>
        <StyledLinks>
          <Link to="http://localhost:3001/login">Create Store</Link>
          <Link to="http://localhost:3001/">Your Store</Link>
        </StyledLinks>
      </StyledNav>
    </StyledNavBar>
  );
};

export default Header;
