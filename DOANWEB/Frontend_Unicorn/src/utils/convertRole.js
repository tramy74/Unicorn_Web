import USER_ROLES from "@/configs/config.users.roles";

export const convertUserRole = (role) => {
  switch (role) {
    case USER_ROLES.USER:
      return "Người dùng";
    case USER_ROLES.ADMIN:
      return "Quản trị";
    default:
      return "";
  }
};
