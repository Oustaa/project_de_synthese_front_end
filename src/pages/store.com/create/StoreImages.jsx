import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FlexContainer, StyledButton } from "../../../styles";
import { StyledLinks, StyledNav } from "../../../styles/styled-header";
import { Link } from "react-router-dom";
import { BiUpload } from "react-icons/bi";

const StyledStorePreview = styled.div`
  width: 100%;
`;

const StyledBgimage = styled.div`
  background-color: var(--dark-100);
  width: 100%;
  aspect-ratio: 1/0.3;
  position: relative;

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
    aspect-ratio: 1/0.3;
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

const StoreImages = ({ setCanContinue, data, imageChnageHandler }) => {
  const [avatar, setAvatar] = useState("");
  const [bgImg, setBgImg] = useState("");

  const changeBgImage = (e) => {
    imageChnageHandler(e);
    setBgImg(URL.createObjectURL(e.target.files[0]));
  };

  const changeAvatarImage = (e) => {
    imageChnageHandler(e);
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (data.bgImg) setBgImg(URL.createObjectURL(data.bgImg));
    if (data.avatar) setAvatar(URL.createObjectURL(data.avatar));
  }, [data.avatar, data.bgImg]);

  return (
    <>
      <StyledStorePreview>
        <StyledBgimage>
          <img
            src={
              bgImg ||
              `${process.env.REACT_APP_BASE_URL}/images/bg-image-size.jpg`
            }
            crossorigin="anonymous"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            name="bgImg"
            onChange={changeBgImage}
          />
          <StyledButton bgColor="var(--white)" color="var(--dark-800)">
            <BiUpload />
          </StyledButton>
        </StyledBgimage>
        <StyledPreviewHeader>
          <FlexContainer>
            <StyledAvatar>
              <img src={avatar} alt="" />
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={changeAvatarImage}
              />
              <StyledButton bgColor="transparent" color="var(--dark-800)">
                <BiUpload />
              </StyledButton>
            </StyledAvatar>
            <h3>{data.name || "Your store name"}</h3>
          </FlexContainer>
          <StyledNav>
            <StyledLinks>
              <Link to="/">Home</Link>
              <Link to="/">DashBoard</Link>
              <Link to="/">Orders</Link>
            </StyledLinks>
          </StyledNav>
        </StyledPreviewHeader>
      </StyledStorePreview>
    </>
  );
};

export default StoreImages;
