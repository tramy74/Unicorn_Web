"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListOrders = ({ pageIndex, pageSize }) => {
  const getListOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/orders?page=${
          pageIndex + 1
        }&itemsOfPage=${pageSize}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    ["get-list-orders", "admin", pageIndex, pageSize],
    () => getListOrders(),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (isError) {
      throw new Error(error);
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
};
export default useGetListOrders;
