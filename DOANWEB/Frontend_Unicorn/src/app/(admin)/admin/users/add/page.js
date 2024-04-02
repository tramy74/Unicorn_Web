import UserForm from "@/components/admin/user/UserForm";
import { TYPE_ADMIN_USERS_FORM } from "@/configs/config.admin.users";
export const metadata = {
  title: "Thêm mới tài khoản",
};
const userFormInformation = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  status: false,
  gender: "",
  role: "",
  birthday: "",
};
export default function AddUsers() {
  return (
    <>
      <UserForm
        type={TYPE_ADMIN_USERS_FORM.ADD}
        userFormInformation={userFormInformation}
      />
    </>
  );
}
