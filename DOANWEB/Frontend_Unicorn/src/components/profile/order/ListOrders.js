"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import { LoadingContent } from "@/components/generals/LoadingBox";
import { ORDER_QUERY_TYPE } from "@/configs/config.orders";
import useGetListUserOrders from "@/customHooks/useGetListUserOrders";
import OrderItem from "./OrderItem";
export default function ListOrders({ value = ORDER_QUERY_TYPE.ALL }) {
  const {
    data: dataOrders,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserOrders({ type: value });

  return (
    <>
      {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}

      {dataOrders?.map((item, i) => (
        <OrderItem key={i} item={item} />
      ))}

      {hasNextPage && (
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </>
  );
}
