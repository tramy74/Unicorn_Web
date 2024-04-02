"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetInformationProductCategory = ({ categoryId }) => {
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/product-categories/${categoryId}`
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["admin-product-category-information", categoryId],
    () => getData()
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
  };
};
export default useGetInformationProductCategory;
