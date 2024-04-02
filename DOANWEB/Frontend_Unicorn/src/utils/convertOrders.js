import {
  ORDER_DELIVERY_STATUSES,
  ORDER_PAYMENT_METHODS,
  ORDER_STATUSES,
} from "@/configs/config.orders";

export const convertOrderStatus = (status) => {
  switch (status) {
    case ORDER_STATUSES.TRUE:
      return "Hiển thị";
    case ORDER_STATUSES.FALSE:
      return "Bị ẩn";
    default:
      return "";
  }
};
export const convertOrderDeliveryStatus = (status) => {
  switch (status) {
    case ORDER_DELIVERY_STATUSES.PENDING:
      return "Chờ xác nhận";
    case ORDER_DELIVERY_STATUSES.PAYMENT_PENDING:
      return "Chờ thanh toán";
    case ORDER_DELIVERY_STATUSES.DELIVERING:
      return "Đang giao";
    case ORDER_DELIVERY_STATUSES.DELIVERED:
      return "Đã giao";
    case ORDER_DELIVERY_STATUSES.CANCELLED:
      return "Đã hủy";
    default:
      return "";
  }
};
export const convertOrderPaymentMethod = (method) => {
  switch (method) {
    case ORDER_PAYMENT_METHODS.CASH:
      return "Tiền mặt";
    case ORDER_PAYMENT_METHODS.BANKING:
      return "Chuyển khoản";

    default:
      return "";
  }
};
