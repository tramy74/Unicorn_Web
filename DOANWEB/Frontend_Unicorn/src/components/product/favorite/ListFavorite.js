"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import FavoriteItem, {
  FavoriteItemLoading,
} from "@/components/product/favorite/FavoriteItem";
import useGetListFavoriteProducts from "@/customHooks/useGetListFavoriteProducts";
import { Stack } from "@mui/material";
import { Fragment } from "react";

export default function ListFavorite() {
  const {
    countAllProducts,
    data: dataProducts,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListFavoriteProducts();

  return (
    <>
      <div className="favorite-content">
        <div className="favorite-content-header">
          <span className="favorite-products-quantity">
            {countAllProducts !== 0
              ? countAllProducts + " sản phẩm"
              : "Không có sản phẩm nào"}
          </span>
        </div>
        <Stack className="favorite-producs">
          {isLoadingQuery && !isFetchingNextPage && (
            <>
              {Array.from({ length: 5 }).map((_item, i) => (
                <FavoriteItemLoading key={i} />
              ))}
            </>
          )}
          {dataProducts?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((item) => (
                <FavoriteItem key={item._id} product={item.product_id} />
              ))}
            </Fragment>
          ))}
        </Stack>
      </div>
      {hasNextPage && (
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </>
  );
}
