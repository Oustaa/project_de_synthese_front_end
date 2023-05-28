import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { StyledSearchForm } from "../../styles/styled-header";

const StyledSearchContainer = styled.div`
  position: relative;
`;

const StyledSearchHistory = styled.div`
  width: 100%;
  background-color: var(--dark-600);
  padding: var(--spacing-sm);
  border-bottom-right-radius: var(--radius-lg);
  border-bottom-left-radius: var(--radius-lg);
  position: absolute;
  z-index: 1000;
`;

const StyledSearchLink = styled.div`
  padding: var(--spacing-lg) var(--spacing-sm);
  span {
    color: var(--white);
    width: 100%;
    display: inline-block;
  }

  &:hover {
    background-color: var(--dark-500);
    cursor: pointer;
  }
`;

const Search = () => {
  const searchInputRef = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const searchQueries = JSON.parse(localStorage.getItem("search")) || [];
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.length <= 2) return;
    const searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    localStorage.setItem(
      "search",
      JSON.stringify(new Array(...new Set([query, ...searchHistory])))
    );
    setShowSearch(false);
    searchInputRef.current.blur();
    navigate(`/search/${query}`);
  };

  const clickSearchHandler = (value) => {
    const searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    localStorage.setItem(
      "search",
      JSON.stringify(new Array(...new Set([value, ...searchHistory])))
    );
    setShowSearch(false);
    searchInputRef.current.blur();
    navigate(`/search/${value}`);
  };

  return (
    <StyledSearchContainer>
      <StyledSearchForm onSubmit={searchHandler}>
        <input
          ref={searchInputRef}
          placeholder="Search...."
          type="text"
          value={query}
          onFocus={() => setShowSearch(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </StyledSearchForm>
      {showSearch && searchQueries.length ? (
        <StyledSearchHistory>
          {searchQueries.slice(0, 6).map((search, i) => (
            <StyledSearchLink
              onClick={() => clickSearchHandler(search)}
              key={i}
            >
              <span>{search}</span>
            </StyledSearchLink>
          ))}
        </StyledSearchHistory>
      ) : null}
    </StyledSearchContainer>
  );
};

export default Search;
