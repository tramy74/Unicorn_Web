"use client";
import { ConvertMoney } from "@/utils/convertMoney";
import { convertOrderDeliveryStatus } from "@/utils/convertOrders";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderItemButton from "./OrderItemButton";

export default function OrderItem({ item }) {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          flexDirection: "column",

          backgroundColor: "#f6f3f3",
          display: "flex",
          padding: "2rem",
          gap: "1rem",
          borderBottom: "1px solid #ACA3A3",
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <Box
            sx={{
              maxWidth: "13rem",
              minWidth: "13rem",
              height: "13rem",
              backgroundColor: "white",
              position: "relative",
              alignSelf: "center",
            }}
          >
            <Image
              src={
                item.order_items?.[0]?.data?.product?.product_images?.[0] || ""
              }
              alt={item.order_items?.[0]?.data?.product?.product_name || ""}
              fill={true}
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography
                className="three-dots text-center md:text-left"
                sx={{
                  width: { xs: "100%", md: "30rem" },

                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                <Link href={`/orders/${item._id}`}>
                  {item.order_items?.[0]?.data?.product?.product_name || ""}
                </Link>
              </Typography>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#B50B0B",
                }}
              >
                <ConvertMoney money={item.total} />
              </Typography>
            </Box>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: "1.7rem",
              }}
            >
              {item.order_items?.[0]?.data?.product?.product_color
                ?.product_color_name || ""}
              / {item.order_items?.[0]?.data?.size?.product_size_name || ""}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <div className="flex w-full flex-1 flex-col gap-4">
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: "1.7rem",
                    alignSelf: "flex-start",
                  }}
                >
                  Số lượng {item.order_items?.[0]?.data?.quantities || 0}
                </Typography>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: "1.7rem",
                    alignSelf: "flex-start",
                  }}
                >
                  {convertOrderDeliveryStatus(item.order_status)}
                </Typography>
              </div>
              <OrderItemButton item={item} />
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
}
