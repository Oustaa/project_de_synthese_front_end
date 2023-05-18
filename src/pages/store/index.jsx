import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  StyledStore,
  StyledBgimage,
  StyledHeader,
  StyledAvatar,
} from "../../styles/styled-store";
import { FlexContainer } from "../../styles";
import { StyledLinks, StyledNav } from "../../styles/styled-header";
import Loader from "../../components/Loader";
import axios from "axios";

async function getStore(id, cb) {
  cb({ value: {}, loading: true });
  const resp = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/stores/${id}`
  );
  console.log(await resp.data);
  const data = await resp.data;

  cb({ value: data, loading: false });
}

const Store = () => {
  const { id } = useParams();
  const [store, setStore] = useState({ value: {}, loading: true });

  useEffect(() => {
    getStore(id, setStore);
    console.log(id);
  }, [id]);

  if (store.loading) {
    return <Loader />;
  }

  return (
    <StyledStore>
      <StyledBgimage>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/images/bg-image-size.jpg`}
          crossorigin="anonymous"
          alt=""
        />
      </StyledBgimage>
      <StyledHeader>
        <FlexContainer>
          <StyledAvatar>
            <img src={""} alt="" />
          </StyledAvatar>
          <h3>{store.value.name}</h3>
        </FlexContainer>
        <StyledNav>
          <StyledLinks>
            <Link to="">Home</Link>
            <Link to="products">Products</Link>
          </StyledLinks>
        </StyledNav>
      </StyledHeader>
    </StyledStore>
  );
};

export default Store;
