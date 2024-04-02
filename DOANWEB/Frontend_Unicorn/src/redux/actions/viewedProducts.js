import { ADD_VIEWED_PRODUCT } from "./constants";

export const addViewedProduct = ({ product }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_VIEWED_PRODUCT,
      payload: product,
    });
  };
};
