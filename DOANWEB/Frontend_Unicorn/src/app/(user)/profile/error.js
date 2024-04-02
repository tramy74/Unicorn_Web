"use client";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { useEffect } from "react";
export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="infomation-container">
      <div className="redirect-title-container">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">Hồ sơ</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-desc-container">
        <div className="user-desc-header">
          <span className="user-desc-text">Thông tin cá nhân</span>
        </div>
        <div className="user-desc-body">
          <div className="user-title">
            <span
              className="user-title-item"
              style={{
                color: "red",
              }}
            >
              Lỗi: {error?.response?.data?.message}
            </span>
            <Button onClick={reset}>Thử lại</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
