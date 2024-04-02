"use client";
import { ORDER_QUERY_TYPE } from "@/configs/config.orders";
import { LIMIT_ORDER_ITEMS_PER_PAGE } from "@/configs/config.users.orders";
import { transformData } from "@/utils/transformDataInfinityUseQuery";
import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
const ITEMS_OF_PAGE = LIMIT_ORDER_ITEMS_PER_PAGE;
const useGetListUserOrders = ({ type = ORDER_QUERY_TYPE.ALL }) => {
  const getListOrders = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders?page=${pageParam}&itemsOfPage=${ITEMS_OF_PAGE}&type=${type}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-orders-user", type],
    ({ pageParam = 1 }) => getListOrders(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].metadata.results === ITEMS_OF_PAGE) {
          return pages.length + 1;
        }
        return undefined;
      },
      select: transformData,
    }
  );
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getListQuery;
  useEffect(() => {
    if (isError) {
      throw new Error(error);
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
export default useGetListUserOrders;
