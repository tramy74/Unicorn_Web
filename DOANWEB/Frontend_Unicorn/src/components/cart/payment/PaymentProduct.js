"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListCart from "@/customHooks/useGetListCart";
import { setCartItems } from "@/redux/actions/cart";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentPriceInformation from "./PaymentPriceInformation";
import PaymentProductItem from "./PaymentProductItem";

function PaymentProduct() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: dataListCartItems, isLoading: isLoadingGetListCartItems } =
    useGetListCart();

  useEffect(() => {
    dispatch(setCartItems({ cartItems: dataListCartItems }));
  }, [dataListCartItems]);

  return (
    <Stack
      className=" shadow-xl "
      sx={{
        backgroundColor: "#F7F7F7",
        // border: "0.1rem solid rgba(0, 0, 0, .125)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <h2
        className="text-[2.5rem] font-bold"
        style={{
          padding: "2rem",
          borderBottom: ".1rem solid rgba(0, 0, 0, .125)",
          backgroundColor: "#EEEEEE",
        }}
      >
        Sản phẩm
      </h2>
      {isLoadingGetListCartItems && (
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <LoadingContent />
        </Box>
      )}
      <div
        className="flex flex-col"
        style={{
          overflowY: "auto",
          maxHeight: "80rem",
          marginTop: 0,
        }}
      >
        {dataListCartItems.length === 0 && !isLoadingGetListCartItems && (
          <div className="cart-empty pb-8">
            <img src="/emptyCart.png" />
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
        {dataListCartItems.map((item) => {
          return <PaymentProductItem item={item} key={item._id} />;
        })}
      </div>
      {dataListCartItems.length !== 0 && <PaymentPriceInformation />}
    </Stack>
  );
}

export default PaymentProduct;
