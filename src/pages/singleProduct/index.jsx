import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Images from "./Images";
import Info from "./Info";
import Actions from "./Actions";
import axios from "axios";
import { StyledContainer } from "../../styles";
import Questions from "./Questions";
import Suggestions from "./Suggestions";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getIds } from "../../features/cart-slice";
import { useDispatch } from "react-redux";

async function getProduct(id, cb) {
  cb({ value: {}, loading: true });
  const resp = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/products/${id}`
  );

  const data = await resp.data;

  cb({ value: data, loading: false });
}

const StyledDisplayProduct = styled.div`
  display: flex;
  gap: var(--spacing-xxl);
  position: relative;
  width: ${({ width }) => width || "100%"};
  height: calc(100% - 80px);
  padding-right: 5px;
  margin-block: var(--spacing-xxl);
`;

const DisplayProduct = ({ width }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProducts] = useState({
    value: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    dispatch(getIds());
  }, [dispatch]);

  useEffect(() => {
    getProduct(id, setProducts);
  }, [id]);

  if (product.loading) return <Loader />;

  return (
    <StyledContainer>
      {!product.loading ? (
        <>
          <StyledDisplayProduct width={width}>
            <Images product={product.value} />
            <Info product={product.value} />
            <Actions product={product.value} />
          </StyledDisplayProduct>
          <hr />
          <Questions product={product.value} />
          <hr />
          <Suggestions product={product.value} />
        </>
      ) : (
        "loading"
      )}
    </StyledContainer>
  );
};

export default DisplayProduct;
