"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressItem from "@/components/profile/address/AddressItem";
import useGetListUserAddresses from "@/customHooks/useGetListUserAddresses";
import { setCartAddress } from "@/redux/actions/cart";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentChooseAddressButtons from "./PaymentChooseAddressButtons";

function PaymentChooseAddress() {
  const dispatch = useDispatch();
  const {
    data: dataAddresses,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserAddresses();

  useEffect(() => {
    if (dataAddresses) {
      const findAddressDefault = dataAddresses.find(
        (item) => item.default === true
      );
      dispatch(setCartAddress({ address: findAddressDefault }));
    }
  }, [dataAddresses]);

  return (
    <Stack>
      {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}
      {dataAddresses?.map((address) => (
        <AddressItem
          address={address}
          key={address._id}
          buttons={<PaymentChooseAddressButtons address={address} />}
        />
      ))}
      {hasNextPage && (
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </Stack>
  );
}

export default PaymentChooseAddress;
