import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FlexContainer, StyledButton } from "../../../styles";
import { BiUpload } from "react-icons/bi";
import { StyledLinks, StyledNav } from "../../../styles/styled-header";

const StyledStorePreview = styled.div`
  width: 100%;
`;

const StyledBgimage = styled.div`
  background-color: var(--dark-100);
  width: 100%;
  aspect-ratio: 1/0.2;
  position: relative;
  max-height: 300px;
  input {
    position: absolute;
    inset: 0 0 0 0;
    opacity: 0;
    &:hover,
    &:focus {
      cursor: pointer;
    }
    z-index: 10;
  }

  button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
  }

  img {
    width: 100%;
    max-height: 100%;
    aspect-ratio: 1/0.2;
    object-fit: cover;
  }
`;

const StyledPreviewHeader = styled.header`
  background-color: var(--dark-700);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  padding-left: var(--spacing-xxl);
  h3 {
    font-weight: 300;
  }
`;

const StyledAvatar = styled.div`
  position: relative;
  width: 50px;
  aspect-ratio: 1 / 1;
  background-color: var(--white);
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: fill;
  }

  input {
    position: absolute;
    inset: 0 0 0 0;
    opacity: 0;
    z-index: 10;

    &:hover,
    &:focus {
      cursor: pointer;
    }
  }

  button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
  }
`;

const Store = () => {
  const { name } = useSelector((state) => state.auth.store);

  const [store, setStore] = useState({});

  useEffect(() => {}, []);

  return (
    <StyledStorePreview>
      <StyledBgimage>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/images/bg-image-size.jpg`}
          crossorigin="anonymous"
          alt=""
        />
        <input type="file" accept="image/*" name="bgImg" />
        <StyledButton bgColor="var(--white)" color="var(--dark-800)">
          <BiUpload />
        </StyledButton>
      </StyledBgimage>
      <StyledPreviewHeader>
        <FlexContainer>
          <StyledAvatar>
            <img src={""} alt="" />
            <input type="file" accept="image/*" name="avatar" />
            <StyledButton bgColor="transparent" color="var(--dark-800)">
              <BiUpload />
            </StyledButton>
          </StyledAvatar>
          <h3>{name}</h3>
        </FlexContainer>
        <StyledNav>
          <StyledLinks>
            <Link to="">Home</Link>
            <Link to="dashboard">DashBoard</Link>
            <Link to="orders">Orders</Link>
            <button to="orders">Log out</button>
          </StyledLinks>
        </StyledNav>
      </StyledPreviewHeader>
    </StyledStorePreview>
  );
};

export default Store;
