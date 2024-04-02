"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetInformationOrder = ({ orderId }) => {
  const getInformationOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders/${orderId}`
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["order-information", orderId],
    () => getInformationOrder()
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
export default useGetInformationOrder;
