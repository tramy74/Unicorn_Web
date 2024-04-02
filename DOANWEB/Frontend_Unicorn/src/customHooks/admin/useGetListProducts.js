"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListProducts = ({ pageIndex, pageSize }) => {
  const getListProducts = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_ENDPOINT_SERVER
        }/api/v1/admins/products?page=${pageIndex + 1}&itemsOfPage=${pageSize}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    ["get-list-products", "admin", pageIndex, pageSize],
    () => getListProducts(),
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
export default useGetListProducts;
