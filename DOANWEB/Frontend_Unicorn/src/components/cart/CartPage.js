"use client";
import CartInformation from "@/components/cart/CartInformation";
import ListCartItems from "@/components/cart/ListCartItems";
import useGetListCart from "@/customHooks/useGetListCart";
import { Box } from "@mui/material";

function CartPage() {
  const {
    session,
    data: dataListCartItems,
    isLoading: isLoadingGetListCartItems,
  } = useGetListCart();

  return (
    <Box
      className="cart-container shadow-xl"
      sx={{
        marginTop: "2rem",
        flexDirection: { xs: "column", md: "row" },
        height: "auto",
      }}
    >
      <ListCartItems
        dataListCartItems={dataListCartItems}
        session={session}
        isLoadingGetListCartItems={isLoadingGetListCartItems}
      />
      <CartInformation dataListCartItems={dataListCartItems} />
    </Box>
  );
}

export default CartPage;
