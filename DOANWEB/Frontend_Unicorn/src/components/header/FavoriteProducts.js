"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import { fetchAllFavoriteProducts } from "@/redux/actions/favoriteProducts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Badge } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const FavoriteProducts = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { data: dataFavoriteProducts } = useSelector(
    (state) => state.favoriteProducts
  );
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllFavoriteProducts());
    }
  }, [isAuthenticated]);

  return (
    <>
      <Link href={ROUTERS_PATH.FAVORITE_PRODUCT}>
        <Badge badgeContent={dataFavoriteProducts.length} color="primary">
          <FavoriteBorderIcon
            sx={{
              fontSize: "2.5rem",
            }}
          ></FavoriteBorderIcon>
        </Badge>
      </Link>
    </>
  );
};
export default FavoriteProducts;
