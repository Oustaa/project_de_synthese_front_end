import React, { useState, useEffect } from "react";
import { StyledContainer } from "../styles/index";
import Categories from "../components/categories/Categories";
import ProductsContainer from "../components/products/ProductsContainer";
import axios from "axios";

// /products/latest

async function getLatestProduct(cb) {
  const resp = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/products/latest`
  );
  const data = await resp.data;
  console.log(data);
  cb({ value: data, loading: false });
}

const Home = () => {
  const [latest, setLatest] = useState({ value: [], loading: false });

  useEffect(() => {
    setLatest({ value: [], loading: true });
    getLatestProduct(setLatest);
  }, []);

  return (
    <div>
      <StyledContainer>
        <Categories />
        <ProductsContainer title="Latest uploaded items" data={latest} />
        <ProductsContainer title="suggested for you" />
        <ProductsContainer title="Latest uploaded items" />
      </StyledContainer>
    </div>
  );
};

export default Home;
