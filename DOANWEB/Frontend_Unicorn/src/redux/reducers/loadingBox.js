import { SET_IS_LOADING_BOX } from "../actions/constants";
const initialState = {
  isLoading: false,
};

const loadingBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_BOX:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
export default loadingBoxReducer;
