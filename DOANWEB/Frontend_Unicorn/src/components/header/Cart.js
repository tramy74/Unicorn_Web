"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Badge } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
const Cart = () => {
  const { data: dataCart } = useGetListCart();
  return (
    <>
      <Link href={ROUTERS_PATH.CART}>
        <Badge badgeContent={dataCart.length} color="primary">
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: "2.5rem",
            }}
          ></ShoppingBagOutlinedIcon>
        </Badge>
      </Link>
    </>
  );
};
export default Cart;

function useGetListCart() {
  const { isAuthenticated, session } = useAuth();
  const getListCartItems = async (pageParam) => {
    if (!session) {
      return null;
    }
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/carts/cart-items/get-all`
    );
    return results.data;
  };

  const getListQuery = useQuery(
    ["get-list-cart-items", session?.user?._id],
    () => getListCartItems()
  );

  const { data, isLoading, isFetching, isError, error } = getListQuery;

  const countItems = data?.length || 0;
  const dataItems = data?.data || [];

  return {
    countItems,
    data: dataItems,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
