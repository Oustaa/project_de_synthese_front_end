import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logInStore } from "../../features/auth-slice";
import { useNavigate } from "react-router-dom";
import {
  StyledBigInput,
  StyledContainer,
  StyledButton,
} from "../../styles/index";
import axios from "axios";

const StyledLogInPage = styled.div`
  display: flex;
  height: 100vh;
`;

const StyledForm = styled.form`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState({
    password: "",
    email: "",
  });

  const changehandler = (e) => {
    const name = e.target.name;

    setStoreInfo((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const respons = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      storeInfo
    );

    const data = await respons.data;
    if (data.accessToken && data.name) {
      dispatch(logInStore({ token: data.accessToken, name: data.name }));
      return navigate("/store.com");
    }
  };

  return (
    <StyledContainer>
      <StyledLogInPage>
        <StyledForm onSubmit={submitHandler}>
          {/* <h1>Log in:</h1> */}
          <label htmlFor="email">
            <h3>Store Email:</h3>
          </label>
          <StyledBigInput
            type="email"
            name="email"
            id="email"
            value={storeInfo.email}
            onChange={changehandler}
          />
          <label htmlFor="password">
            <h3>Password:</h3>
          </label>
          <StyledBigInput
            type="password"
            name="password"
            id="password"
            value={storeInfo.password}
            onChange={changehandler}
          />
          <StyledButton>Log In</StyledButton>
        </StyledForm>
      </StyledLogInPage>
    </StyledContainer>
  );
};

export default LogIn;
