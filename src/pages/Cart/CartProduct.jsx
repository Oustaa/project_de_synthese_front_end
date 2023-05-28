import React, { useState } from "react";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  toggleQuantity,
  saveLater,
} from "../../features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loader from "../../components/Loader";

const StyledCartProduct = styled.div`
  position: relative;
  display: flex;
  gap: var(--spacing-xl);
  border: 1px dashed var(--dark-300);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
`;

const StyledCartProductImage = styled.div`
  width: 20%;
  aspect-ratio: 1 / 1;
  padding-inline: var(--spacing-xl);
  border-right: 1px dashed var(--dark-300);
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    aspect-ratio: 1 /1;
    object-fit: contain;
  }
`;

const StyledCartProductData = styled.div`
  width: 80%;
`;

const StyledCartProductHeader = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
`;

const StyledCartProductActions = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: var(--spacing-xl);
  }

  & > button {
    border: none;
    background-color: transparent;
    color: var(--dark-800);
  }
`;

const StyledCartProductQte = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-inline: 5px;
  }

  h5 {
  }

  button {
    background-color: var(--dark-200);
    border: none;
    border-radius: var(--radius-sm);
    color: var(--dark-700);
    padding: 5px 10px;
  }
`;

const loaderExtraStyles = `
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--radius-lg);
  width: 100%;
  height: 100%;
  background: #d9d9d952;
`;

const CartProduct = ({ images, store, title, price, currency, _id }) => {
  const [loading, setLoading] = useState(false);
  const [updateQte, setUpdateQte] = useState(false);
  const dispatch = useDispatch();
  const { qte, saveLater: savedLater } = useSelector((state) => state.cart.ids)[
    _id
  ];

  const toggleProductQte = async (num) => {
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cart`,
        {
          product: _id,
          qte: num,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch(toggleQuantity({ id: _id, number: num }));
    }
  };

  const deleteProducthandler = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/${_id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch(deleteProduct(_id));
    }
  };

  const saveForLater = async () => {
    // /cart/savedForLater
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/cart/savedForLater`,
        {
          product: _id,
          savedLater: !savedLater,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch(saveLater(_id));
    }
  };

  return (
    <>
      <StyledCartProduct>
        {loading && <Loader loaderExtraStyles={loaderExtraStyles} />}
        <StyledCartProductImage>
          <img
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_BASE_URL}/images/${store}/products/${images[0]}`}
            alt={title}
            title={title}
          />
        </StyledCartProductImage>
        <StyledCartProductData>
          <StyledCartProductHeader>
            <h3>
              <Link to={`/product/${_id}`}>{title.substring(0, 80)}...</Link>
            </h3>
            <h2>
              {getSymbolFromCurrency(currency)}
              {price}
            </h2>
          </StyledCartProductHeader>
          <StyledCartProductActions>
            {!updateQte ? (
              <StyledCartProductQte>
                <h4>Qte:</h4>
                <button onClick={() => toggleProductQte(1)}>+</button>
                <h4 onDoubleClick={() => setUpdateQte(true)}>{qte}</h4>

                <button onClick={() => toggleProductQte(-1)}>-</button>
              </StyledCartProductQte>
            ) : (
              "updateQte"
            )}

            <button onClick={deleteProducthandler}>Delete</button>
            <button onClick={saveForLater}>Save For Later</button>
          </StyledCartProductActions>
        </StyledCartProductData>
      </StyledCartProduct>
    </>
  );
};

export default CartProduct;
