"use client";
import CartItem from "@/components/cart/CartItem";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

function ListCartItems({
  dataListCartItems,
  session,
  isLoadingGetListCartItems,
}) {
  const router = useRouter();

  return (
    <Box
      className="cart-left-panel"
      sx={{
        width: { xs: "100%", md: "65%" },
      }}
    >
      <div className="cart-left-panel-header">
        <h1>Giỏ hàng</h1>
        <div className="cart-left-panel-quantity !text-[2rem]">
          {dataListCartItems.length} sản phẩm
        </div>
      </div>
      <div className="cart-left-panel-body">
        {isLoadingGetListCartItems && (
          <Box
            sx={{
              marginTop: "1rem",
            }}
          >
            <LoadingContent />
          </Box>
        )}
        {!isLoadingGetListCartItems &&
          session &&
          dataListCartItems.length === 0 && (
            <div className="cart-empty">
              <img src="./emptyCart.png" />
              <p>Giỏ hàng của bạn đang trống</p>
              <Button
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "#BFBBBB",
                  padding: "0.5rem 5rem",
                  "&:hover": {
                    color: "#FFFFFF",
                    backgroundColor: "#BFBBBB",
                    opacity: ".5",
                  },
                }}
                onClick={() => router.push(ROUTERS_PATH.HOME_PRODUCT)}
              >
                Mua ngay
              </Button>
            </div>
          )}
        {!isLoadingGetListCartItems &&
          session &&
          dataListCartItems.length != 0 && (
            <TableContainer
              sx={{
                overflow: "auto",
                maxHeight: "40rem",
              }}
            >
              <TableContainer>
                <TableHead>
                  <TableRow
                    sx={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#f5f5f5",
                      boxShadow: "1px 0 2px var(--Black-Color)",
                      zIndex: 1,
                    }}
                  >
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        padding: "1.5rem",
                      }}
                    >
                      Đơn giá
                    </TableCell>
                    <TableCell align="center" sx={{ width: "15rem" }}>
                      Tổng
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataListCartItems.map((item) => {
                    return <CartItem item={item} key={item._id} />;
                  })}
                </TableBody>
              </TableContainer>
            </TableContainer>
          )}
      </div>
    </Box>
  );
}

export default ListCartItems;
