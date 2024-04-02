import { CART_PAYMENT_METHOD } from "@/configs/config.cart";
import { TYPE_VOUCHER_ITEM_DISPLAY } from "@/configs/config.vouchers";
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
} from "../actions/constants";
const initialState = {
  cartItems: [],
  voucher: null,
  address: null,
  note: "",
  paymentMethod: CART_PAYMENT_METHOD.CASH,
  subTotal: 0,
  shippingCost: 0,
  discountAmount: 0,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CART_PAYMENT:
      return {
        ...state,
        cartItems: [],
        voucher: null,
        address: null,
        note: "",
        paymentMethod: CART_PAYMENT_METHOD.CASH,
        subTotal: 0,
        shippingCost: 0,
        discountAmount: 0,
        total: 0,
      };
    case SET_CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case SET_CART_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case SET_CART_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case SET_CART_VOUCHER:
      return {
        ...state,
        voucher: action.payload,
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_CART_SUBTOTAL:
      return {
        ...state,
        subTotal: action.payload,
      };
    case SET_CART_SHIPPING_COST:
      return {
        ...state,
        shippingCost: action.payload,
      };

    case SET_CART_TOTAL:
      const { voucher, shippingCost, subTotal } = state;
      if (!voucher) {
        const total = subTotal + shippingCost;
        return {
          ...state,
          discountAmount: 0,
          total: total,
        };
      } else {
        if (voucher.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
          const shippingDiscount = Math.round(
            (shippingCost * voucher.discount) / 100
          );
          const discountAmount = shippingDiscount;
          const total = subTotal + shippingCost - discountAmount;
          return {
            ...state,
            discountAmount,
            total,
          };
        }
        if (voucher.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
          const totalDiscount = Math.round((subTotal * voucher.discount) / 100);
          const discountAmount = totalDiscount;
          const total = subTotal + shippingCost - discountAmount;
          return {
            ...state,
            discountAmount,
            total,
          };
        }
        return state;
      }

    default:
      return state;
  }
};
export default cartReducer;
