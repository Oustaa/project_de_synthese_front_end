import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logInStore } from "../../../features/auth-slice";
import styled from "styled-components";
import StoreName from "./StoreName";
import StoreEmail from "./StoreEmail";
import StorePhone from "./StorePhone";
import StorePassword from "./StorePassword";
import { useNavigate } from "react-router-dom";

import { StyledContainer, StyledButton } from "../../../styles/index";
import axios from "axios";

const StyledCreationHeaderFooter = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ end }) => (end ? "flex-end" : "space-between")};
  padding-block: var(--spacing-xl);
  color: var(--dark-800);
  h1,
  h2 {
    font-size: 1.3rem;
  }
`;

const StyledCreateBody = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 100%;
    max-width: 900px;
  }
`;

const Components = [StoreName, StoreEmail, StorePhone, StorePassword];
const titles = ["Name", "Email", "Email", "Password"];

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState({
    name: "",
    email: "",
    email_verified: false,
    password: "",
    phone_number: "",
    phone_verified: false,
  });
  const [step, setStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  const RendredComp = Components[step];

  const nextHandler = () => {
    if (!canContinue) return;
    setStep((prev) => (prev += 1));
    // setCanContinue(false);
  };
  const prevHandler = () => {
    setStep((prev) => (prev -= 1));
  };

  const changeHandler = (e) => {
    const name = e.target.name;

    setStoreData((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const imageChnageHandler = (e) => {
    const name = e.target.name;

    setStoreData((prev) => {
      return { ...prev, [name]: e.target.files[0] };
    });
  };

  const createStore = async (e) => {
    e.preventDefault();
    // const formData = new FormData();formData.append("images", [
    //   { ...storeData.avatar, name: "avatar" },
    //   { ...storeData.bgImg, name: "avatar" },
    // ]);

    try {
      const respons = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/stores`,
        storeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await respons.data;

      if (responseData.token && responseData.name) {
        dispatch(logInStore(responseData));
        navigate(`/store.com/${responseData.name}`);
      }
    } catch (error) {
      // handle missing reauired fields and conflections
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <StyledCreationHeaderFooter>
        <h1>Create Store</h1>
        <h2>{titles[step]}</h2>
      </StyledCreationHeaderFooter>
      <StyledCreateBody>
        {
          <RendredComp
            setCanContinue={setCanContinue}
            changeHandler={changeHandler}
            imageChnageHandler={imageChnageHandler}
            data={storeData}
          />
        }
      </StyledCreateBody>
      <StyledCreationHeaderFooter end={step === 0}>
        {step !== 0 && (
          <StyledButton onClick={prevHandler} bgColor="var(--dark-500)">
            Prev
          </StyledButton>
        )}
        {step === 3 ? (
          <form enctype="multipart/form-data" onSubmit={createStore}>
            <StyledButton type="submit">Create</StyledButton>
          </form>
        ) : (
          <StyledButton
            bgColor={!canContinue ? "var(--dark-500)" : "var(--primary-dark)"}
            onClick={nextHandler}
          >
            Next
          </StyledButton>
        )}
      </StyledCreationHeaderFooter>
    </StyledContainer>
  );
};

export default CreateStore;
