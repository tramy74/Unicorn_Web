"use client";
import UserForm from "@/components/admin/user/UserForm";
import { TYPE_ADMIN_USERS_FORM } from "@/configs/config.admin.users";
import useAuth from "@/customHooks/useAuth";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailedUserPage() {
  const { session } = useAuth();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    status: false,
    gender: "",
    role: "",
    birthday: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId && session) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users/${userId}`
          );
          const data = response?.data?.data;
          console.log(data);

          setUserDetails({
            fullName: data?.name,
            email: data?.email,
            phoneNumber: data?.phone_number,
            status: data?.status,
            gender: data?.gender,
            role: data?.role,
            birthday: data?.birthday,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching user details:", error.message);
        throw error;
      }
    };

    fetchData();
  }, [userId, session]);

  // Nếu đang tải dữ liệu, có thể hiển thị một spinner hoặc thông báo tải
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <UserForm
        type={TYPE_ADMIN_USERS_FORM.EDIT}
        userFormInformation={userDetails}
      />
    </>
  );
}
