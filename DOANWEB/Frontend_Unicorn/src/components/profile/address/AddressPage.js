"use client";

import LoadMoreButton from "@/components/button/LoadMoreButton";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressItem from "@/components/profile/address/AddressItem";
import AddressItemButtons from "@/components/profile/address/AddressItemButtons";
import useGetListUserAddresses from "@/customHooks/useGetListUserAddresses";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
export default function AddressPage() {
  const router = useRouter();

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

  return (
    <>
      <div className="user-desc-container divide-y divide-gray-200 rounded-lg shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Địa chỉ</h2>
          <Button
            onClick={() => router.push("address/new")}
            className="edit-infomation-button"
          >
            Thêm địa chỉ
          </Button>
        </div>
        <div className="user-desc-body ">
          {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {dataAddresses?.map((address) => (
              <AddressItem
                key={address._id}
                address={address}
                buttons={<AddressItemButtons address={address} />}
              />
            ))}

            {hasNextPage && (
              <LoadMoreButton
                isLoading={isFetchingNextPage}
                onClick={fetchNextPage}
              />
            )}
          </Stack>
        </div>
      </div>
    </>
  );
}
