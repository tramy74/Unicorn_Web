"use client";
import FavoriteButton from "@/components/product/button/FavoriteButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function FavoriteProduct({ dataProduct }) {
  const { data: dataFavoriteProducts } = useSelector(
    (state) => state.favoriteProducts
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIsLikedProduct = dataFavoriteProducts.find(
      (item) => item._id.toString() === dataProduct._id.toString()
    );
    setIsFavorite(checkIsLikedProduct);
  }, [dataFavoriteProducts, dataProduct]);

  return (
    <>
      <FavoriteButton
        productId={dataProduct._id}
        isFavorited={isFavorite}
        sx={{
          cursor: "pointer",
          fontSize: "3rem",
        }}
      />
    </>
  );
}
