"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListCategories = ({ pageIndex, pageSize }) => {
  const getListCategories = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_ENDPOINT_SERVER
        }/api/v1/admins/product-categories?page=${
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
    ["get-list-categories", "admin", pageIndex, pageSize],
    () => getListCategories(),
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
export default useGetListCategories;
