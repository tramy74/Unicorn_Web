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
            <Link underline="hover" color="inherit" href="/profile">
              Hồ sơ
            </Link>
            <Typography color="text.primary">Địa chỉ</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="user-desc-container">
        <div className="user-desc-header">
          <span className="user-desc-text">Địa chỉ</span>
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
