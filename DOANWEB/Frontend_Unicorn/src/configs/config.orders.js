export const ORDER_STATUSES = {
  TRUE: true,
  FALSE: false,
};
export const ORDER_DELIVERY_STATUSES = {
  PENDING: "pending",
  PAYMENT_PENDING: "payment_pending",
  DELIVERING: "delivering",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const ORDER_QUERY_TYPE = { ...ORDER_DELIVERY_STATUSES, ALL: "all" };

export const ORDER_PAYMENT_METHODS = {
  CASH: "cash",
  BANKING: "banking",
};

export const ORDER_ONLINE_PAYMENT_METHOD = {
  VNPAY: "VNPAY",
};

export const ORDER_MESSAGES = {
  ONLINE_PAYMENT_SUCCESS: "Thanh toán đơn hàng thành công",
  ONLINE_PAYMENT_ERROR: "Có lỗi xảy ra khi thực hiện thanh toán",
  ONLINE_PAYMENT_AMOUNT_INVALID: "Số tiền thanh toán không hợp lệ",
  ONLINE_PAYMENT_ALREADY: "Đơn hàng đang trong tình trạng không cần thanh toán",
  ORDER_IS_NOT_EXISTS: "Đơn hàng không tồn tại",
  PAYMENT_METHOD_IS_NOT_EXISTS: "Phương thức thanh toán không hợp lệ",
  CREATE_ORDER_SUCCESS: "Tạo đơn hàng thành công",
  MIN_CART_ITEMS_REQUIRED: "Cần tối thiểu một sản phẩm để thanh toán",
  PRODUCT_ITEMS_QUANTITIES_INVALID:
    "Trong giỏ hàng có sản phẩm không tồn tại (hoặc đã hết hàng)",
};
