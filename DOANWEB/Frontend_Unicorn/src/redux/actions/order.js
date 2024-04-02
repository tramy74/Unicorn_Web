import {
  SET_CURRENT_ORDER_PAYMENT_PENDING,
  SET_CURRENT_ORDER_PAYMENT_PENDING_CREATE_DATE,
  SET_CURRENT_ORDER_PAYMENT_PENDING_EXPIRED_DATE,
} from "./constants";

export const setCurrentOrderPaymentPending = ({ order }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_ORDER_PAYMENT_PENDING,
      payload: order,
    });
  };
};
export const setCurrentOrderPaymentPendingCreateDate = ({ createDate }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_ORDER_PAYMENT_PENDING_CREATE_DATE,
      payload: createDate,
    });
  };
};
export const setCurrentOrderPaymentPendingExpiredDate = ({ expiredDate }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_ORDER_PAYMENT_PENDING_EXPIRED_DATE,
      payload: expiredDate,
    });
  };
};
