"use client";
import useAuth from "@/customHooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function useGetListCart() {
  const { session } = useAuth();
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
  useEffect(() => {
    if (isError) {
      throw new Error(error);
    }
  }, [isError]);

  const countItems = data?.length || 0;
  const dataItems = data?.data || [];

  return {
    session,
    countItems,
    data: dataItems,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
