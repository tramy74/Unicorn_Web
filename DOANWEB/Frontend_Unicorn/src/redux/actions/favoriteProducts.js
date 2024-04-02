import axios from "axios";
import {
  ADD_FAVORITE_PRODUCT,
  FETCH_DATA_FAVORITE_PRODUCTS_FAILURE,
  FETCH_DATA_FAVORITE_PRODUCTS_REQUEST,
  FETCH_DATA_FAVORITE_PRODUCTS_SUCCESS,
  REMOVE_FAVORITE_PRODUCT,
} from "./constants";
const fetchingData = () => {
  return {
    type: FETCH_DATA_FAVORITE_PRODUCTS_REQUEST,
  };
};
const fetchDataSuccess = ({ data }) => {
  return {
    type: FETCH_DATA_FAVORITE_PRODUCTS_SUCCESS,
    payload: data,
  };
};
const fetchDataFailure = ({ error }) => {
  return {
    type: FETCH_DATA_FAVORITE_PRODUCTS_FAILURE,
    error: error,
  };
};
export const addFavoriteProduct = ({ product }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_FAVORITE_PRODUCT,
      payload: product,
    });
  };
};
export const removeFavoriteProduct = ({ product }) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FAVORITE_PRODUCT,
      payload: product,
    });
  };
};

export const fetchAllFavoriteProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchingData());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/get-all`
      );
      dispatch(
        fetchDataSuccess({
          data: res.data.data,
        })
      );
    } catch (err) {
      dispatch(fetchDataFailure({ error: err }));
    }
  };
};
