import {
  FETCH_DATA_NOTIFICATION_FAILURE,
  FETCH_DATA_NOTIFICATION_REQUEST,
  FETCH_DATA_NOTIFICATION_SUCCESS,
} from "../actions/constants";
const initialState = {
  numberNotificationsUnRead: 0,
  isLoading: false,
  isError: false,
  error: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    case FETCH_DATA_NOTIFICATION_SUCCESS:
      return {
        ...state,
        numberNotificationsUnRead: action.payload,
        isLoading: false,
        isError: false,
        error: null,
      };
    case FETCH_DATA_NOTIFICATION_FAILURE:
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
export default notificationsReducer;
