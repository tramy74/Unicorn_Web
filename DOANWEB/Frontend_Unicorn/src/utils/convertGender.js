import { PRODUCT_GENDERS } from "@/configs/config.products";
import USER_GENDERS from "@/configs/config.users.genders";

export const convertUserGender = (gender) => {
  switch (gender) {
    case USER_GENDERS.MALE:
      return "Nam";
    case USER_GENDERS.FEMALE:
      return "Nữ";
    case USER_GENDERS.OTHERS:
      return "Chưa xác định";
    default:
      return "";
  }
};
export const convertProductGender = (gender) => {
  switch (gender) {
    case PRODUCT_GENDERS.MEN:
      return "Nam";
    case PRODUCT_GENDERS.WOMEN:
      return "Nữ";
    case PRODUCT_GENDERS.UNISEX:
      return "Unisex";
    default:
      return "";
  }
};
