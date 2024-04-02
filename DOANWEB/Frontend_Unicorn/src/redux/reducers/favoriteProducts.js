import {
  ADD_FAVORITE_PRODUCT,
  FETCH_DATA_FAVORITE_PRODUCTS_FAILURE,
  FETCH_DATA_FAVORITE_PRODUCTS_REQUEST,
  FETCH_DATA_FAVORITE_PRODUCTS_SUCCESS,
  REMOVE_FAVORITE_PRODUCT,
} from "../actions/constants";
const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};
const checkFavoriteProductExist = (list, item) => {
  const findItem = list.find((e) => e._id.toString() === item._id.toString());
  return !!findItem;
};
const favoriteProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_FAVORITE_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    case FETCH_DATA_FAVORITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        error: null,
      };
    case ADD_FAVORITE_PRODUCT:
      if (!checkFavoriteProductExist(state.data, action.payload)) {
        return {
          ...state,
          data: [...state.data, ...[action.payload]], //push new favorite item into data []
        };
      } else {
        return state;
      }
    case REMOVE_FAVORITE_PRODUCT:
      if (checkFavoriteProductExist(state.data, action.payload)) {
        return {
          ...state,
          data: state.data.filter(
            (item) => item._id.toString() !== action.payload._id.toString()
          ), //remove favorite item out of data []
        };
      } else {
        return state;
      }

    case FETCH_DATA_FAVORITE_PRODUCTS_FAILURE:
      return {
        ...state,

        isLoading: false,
        isError: true,
        error: action.error,
      };
    default:
      return state;
  }
};
export default favoriteProductsReducer;
