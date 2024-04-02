"use client";
import { ORDER_DELIVERY_STATUSES } from "@/configs/config.orders";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import OrderItemCancelButton from "./OrderItemCancelButton";

export default function OrderItemButton({ item }) {
  const renderButton = () => {
    switch (item.order_status) {
      case ORDER_DELIVERY_STATUSES.PAYMENT_PENDING:
        return (
          <>
            <OrderItemCancelButton item={item} />
          </>
        );
      case ORDER_DELIVERY_STATUSES.PENDING:
        return (
          <>
            <OrderItemCancelButton item={item} />
          </>
        );
      case ORDER_DELIVERY_STATUSES.DELIVERING:
        return (
          <>
            <OrderItemCancelButton item={item} />
          </>
        );
      case ORDER_DELIVERY_STATUSES.DELIVERED:
        return (
          <>
            <Link
              href={
                ROUTERS_PATH.HOME_PRODUCT +
                "/" +
                item.order_items[0].data.product._id
              }
            >
              <Button>Mua lại</Button>
            </Link>
            <Link
              href={
                ROUTERS_PATH.HOME_PRODUCT +
                "/" +
                item.order_items[0].data.product._id +
                "/reviews"
              }
            >
              <Button>Đánh giá</Button>
            </Link>
          </>
        );
      case ORDER_DELIVERY_STATUSES.CANCELLED:
        return (
          <>
            <Link
              href={
                ROUTERS_PATH.HOME_PRODUCT +
                "/" +
                item.order_items[0].data.product._id
              }
            >
              <Button>Mua lại</Button>
            </Link>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {renderButton()}
      </Box>
    </>
  );
}
