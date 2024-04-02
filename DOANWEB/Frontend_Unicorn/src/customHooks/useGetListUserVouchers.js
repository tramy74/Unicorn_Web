"use client";
import { LIMIT_VOUCHER_ITEMS_PER_PAGE } from "@/configs/config.users.voucher";
import { transformData } from "@/utils/transformDataInfinityUseQuery";
import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

const ITEMS_OF_PAGE = LIMIT_VOUCHER_ITEMS_PER_PAGE;

const useGetListUserVouchers = ({ searchValue = "" }) => {
  const getListVouchers = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/vouchers?page=${pageParam}&itemsOfPage=${ITEMS_OF_PAGE}&search=${searchValue}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-vouchers-user", searchValue],
    ({ pageParam = 1 }) => getListVouchers(pageParam),
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
export default useGetListUserVouchers;
