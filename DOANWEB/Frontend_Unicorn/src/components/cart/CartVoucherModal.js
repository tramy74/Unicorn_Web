"use client";
import useGetListUserVouchers from "@/customHooks/useGetListUserVouchers";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LoadMoreButton from "../button/LoadMoreButton";
import { LoadingContent } from "../generals/LoadingBox";
import Modal, { ModalBody, ModalTitle } from "../generals/Modal";
import VoucherItem from "../profile/voucher/VoucherItem";
import { VoucherItemChooseButton } from "../profile/voucher/VoucherItemButton";

export default function CartVoucherModal({ isOpen, setIsOpen }) {
  const timeoutRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserVouchers({ searchValue: searchValue });

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchValue(searchInput);
    }, 500);
    return () => clearTimeout(timeoutRef.current);
  }, [searchInput]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={"90rem"}>
      <ModalTitle>Chọn mã giảm giá</ModalTitle>
      <ModalBody>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
          className="w-[100%]"
        >
          <div className="p-0">
            <TextField
              sx={{ width: "100%" }}
              value={searchInput}
              placeholder="Nhập từ khóa..."
              onInput={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment
                    onClick={() => setSearchInput("")}
                    sx={{ cursor: "pointer" }}
                    position="end"
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>
          {isLoading && !isFetchingNextPage && (
            <div>
              <LoadingContent />
            </div>
          )}

          {!isLoading && data?.length === 0 && (
            <div className="mt-2">
              <p className="text-base text-gray-500">
                Không tìm thấy mã giảm giá nào
              </p>
            </div>
          )}

          {!isLoading &&
            data?.map((voucher) => (
              <VoucherItem
                key={uuidv4()}
                voucher={voucher}
                button={
                  <VoucherItemChooseButton
                    voucher={voucher}
                    setIsOpen={setIsOpen}
                  />
                }
              />
            ))}

          {hasNextPage && (
            <LoadMoreButton
              isLoading={isFetchingNextPage}
              onClick={fetchNextPage}
            />
          )}
        </Stack>
      </ModalBody>
    </Modal>
  );
}
