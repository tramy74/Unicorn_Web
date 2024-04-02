import { SET_IS_LOADING_BOX } from "./constants";

export const setIsLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: SET_IS_LOADING_BOX,
      payload: isLoading,
    });
  };
};
