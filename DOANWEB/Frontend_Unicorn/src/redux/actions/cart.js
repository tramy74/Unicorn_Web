import {
  RESET_CART_PAYMENT,
  SET_CART_ADDRESS,
  SET_CART_ITEMS,
  SET_CART_NOTE,
  SET_CART_PAYMENT_METHOD,
  SET_CART_SHIPPING_COST,
  SET_CART_SUBTOTAL,
  SET_CART_TOTAL,
  SET_CART_VOUCHER,
} from "./constants";

export const setCartPaymentMethod = ({ method }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_PAYMENT_METHOD,
      payload: method,
    });
  };
};
export const setCartNote = ({ note }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_NOTE,
      payload: note,
    });
  };
};
export const setCartAddress = ({ address }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_ADDRESS,
      payload: address,
    });
  };
};
export const setCartVoucher = ({ voucher }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_VOUCHER,
      payload: voucher,
    });
    dispatch(setCartTotal());
  };
};
export const setCartShippingCost = ({ shippingCost }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_SHIPPING_COST,
      payload: shippingCost,
    });
    dispatch(setCartTotal());
  };
};
export const resetCartData = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CART_PAYMENT,
    });
  };
};

const getSubTotal = (cartItems) => {
  let totalPrice = 0;
  cartItems?.forEach((item) => {
    if (item.data.product.product_sale_event) {
      const discountPercent =
        item.data.product.product_sale_event.sale_discount_percentage;
      totalPrice +=
        Math.round(
          item.data.product.product_original_price -
            (discountPercent * item.data.product.product_original_price) / 100
        ) * item.data.quantities;
    } else {
      totalPrice +=
        item.data.product.product_original_price * item.data.quantities;
    }
  });
  return totalPrice;
};

const setCartTotal = () => {
  return {
    type: SET_CART_TOTAL,
  };
};

export const setCartItems = ({ cartItems }) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_ITEMS,
      payload: cartItems,
    });
    dispatch({
      type: SET_CART_SUBTOTAL,
      payload: getSubTotal(cartItems),
    });
    dispatch(setCartTotal());
  };
};
