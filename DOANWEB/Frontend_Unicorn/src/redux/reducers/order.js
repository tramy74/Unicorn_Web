import {
  SET_CURRENT_ORDER_PAYMENT_PENDING,
  SET_CURRENT_ORDER_PAYMENT_PENDING_CREATE_DATE,
  SET_CURRENT_ORDER_PAYMENT_PENDING_EXPIRED_DATE,
} from "../actions/constants";
const initialState = {
  currentOrderPaymentPending: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER_PAYMENT_PENDING:
      return {
        ...state,
        currentOrderPaymentPending: action.payload,
      };
    case SET_CURRENT_ORDER_PAYMENT_PENDING_CREATE_DATE:
      if (!state.currentOrderPaymentPending) {
        return state;
      }
      return {
        ...state,
        currentOrderPaymentPending: {
          ...state.currentOrderPaymentPending,
          createDate: action.payload,
        },
      };
    case SET_CURRENT_ORDER_PAYMENT_PENDING_EXPIRED_DATE:
      if (!state.currentOrderPaymentPending) {
        return state;
      }
      return {
        ...state,
        currentOrderPaymentPending: {
          ...state.currentOrderPaymentPending,
          expiredDate: action.payload,
        },
      };

    default:
      return state;
  }
};
export default orderReducer;
