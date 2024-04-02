import { PRODUCT_STATUSES } from "@/configs/config.products";
import USER_STATUSES from "@/configs/config.users.statuses";

export const convertUserStatus = (status) => {
  switch (status) {
    case USER_STATUSES.TRUE:
      return "Hoạt động";
    case USER_STATUSES.FALSE:
      return "Bị ẩn";
    default:
      return "";
  }
};
export const convertProductStatus = (status) => {
  switch (status) {
    case PRODUCT_STATUSES.TRUE:
      return "Hiển thị";
    case PRODUCT_STATUSES.FALSE:
      return "Bị ẩn";
    default:
      return "";
  }
};
