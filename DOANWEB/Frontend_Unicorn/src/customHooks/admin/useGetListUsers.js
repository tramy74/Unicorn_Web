"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListUsers = ({ pageIndex, pageSize }) => {
  const getListUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users?page=${
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
    ["get-list-users", "admin", pageIndex, pageSize],
    () => getListUsers(),
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
export default useGetListUsers;
