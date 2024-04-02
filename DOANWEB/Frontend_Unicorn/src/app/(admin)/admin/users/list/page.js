
import UserList from "@/components/admin/user/UserList";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Danh sách tài khoản",
};

export default function AddUsers() {
  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Danh sách tài khoản</h1>
      </div>
      <Link href="add">
        <Button
          sx={{
            textTransform: "capitalize",
            borderRadius: "0.5rem",
          }}
        >
          <PlusIcon className="h-8 w-8" />
          Thêm mới
        </Button>
      </Link>

      <UserList />
    </>
  );
}
