import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StyledContainer, InputGroup, StyledButton } from "../../styles";
import styled from "styled-components";
import axios from "axios";
import { login } from "../../features/auth-slice";
import { updateIds } from "../../features/cart-slice";

const StyledLogInPage = styled.div`
  height: 100vh;
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
`;

const StyledLogInForm = styled.form`
  width: 50%;
  h1 {
    color: var(--dark-700);
    margin-bottom: var(--spacing-lg);
  }

  a {
    text-decoration: underline;
  }
`;

const StyledLogInImgContainer = styled.form`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [userInfo, setUserInfo] = useState({
    email: { value: "", valid: true },
    password: { value: "", valid: true },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: { value, valid: true } };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/users/login`,
        { email: userInfo.email.value, password: userInfo.password.value }
      );

      const data = await resp.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(login(data));

        const cartsProducts = Object.keys(
          JSON.parse(localStorage.getItem("cart_products"))
        ).map((id) => {
          return {
            product: id,
            ...JSON.parse(localStorage.getItem("cart_products"))[id],
          };
        });

        const postCartsProductsReq = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/cart/products`,
          cartsProducts,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        const cartsItems = await postCartsProductsReq.data?.cartItems;

        const ids = {};
        cartsItems.forEach(
          (item) =>
            (ids[item.product] = {
              qte: item.qte,
              saveLater: item.saveLater,
              price: item.price,
            })
        );

        dispatch(updateIds(ids));
        navigate(searchParams.get("navigate") || -1);
      }
    } catch (e) {
      console.log(e);
      if (!e.response?.data?.email)
        setUserInfo((prev) => {
          return { ...prev, email: { value: prev.email.value, valid: false } };
        });
      if (!e.response?.data?.password)
        setUserInfo((prev) => {
          return {
            ...prev,
            password: { value: prev.password.value, valid: false },
          };
        });
    }
  };

  return (
    <StyledContainer>
      <StyledLogInPage>
        <StyledLogInForm onSubmit={submitHandler}>
          <InputGroup className={!userInfo.email.valid ? "invalid" : ""}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userInfo.email.value}
              onChange={changeHandler}
            />
          </InputGroup>
          <InputGroup className={!userInfo.password.valid ? "invalid" : ""}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userInfo.password.value}
              onChange={changeHandler}
            />
          </InputGroup>
          <StyledButton>Log in</StyledButton>
          <br />
          <br />
          <Link to={"/register"}>Create a new account</Link>
        </StyledLogInForm>
        <StyledLogInImgContainer>
          <img src="./images/undraw_sign_up_n6im.svg" alt="" />
        </StyledLogInImgContainer>
      </StyledLogInPage>
    </StyledContainer>
  );
};

export default Index;
