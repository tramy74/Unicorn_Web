"use client";
import CART_MESSAGES from "@/configs/config.cart.messages";
import { setCartVoucher } from "@/redux/actions/cart";
import { Button } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useCopyToClipboard } from "usehooks-ts";

export default function VoucherItemCopyButton({ voucher }) {
  const [value, copy] = useCopyToClipboard();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() =>
          toast.promise(copy(voucher.code), {
            loading: "Đang copy...",
            success: "Copy thành công " + voucher.code,
            error: <b>Không thể copy!</b>,
          })
        }
      >
        Copy
      </Button>
    </>
  );
}

export function VoucherItemChooseButton({ voucher, setIsOpen }) {
  const dispatch = useDispatch();
  const {
    subTotal,
    cartItems,
    voucher: voucherApply,
  } = useSelector((state) => state.cart);

  const handleApplyVoucher = () => {
    if (voucher.min_order_quantity > cartItems.length) {
      toast.error(CART_MESSAGES.MIN_ORDER_QUANTITY_VOUCHER_INVALID);
      return;
    }
    if (voucher.min_order_amount > subTotal) {
      toast.error(CART_MESSAGES.MIN_ORDER_AMOUNT_VOUCHER_INVALID);
      return;
    }
    dispatch(setCartVoucher({ voucher }));
    toast.success(CART_MESSAGES.APPLY_VOUCHER_SUCCESS);
    setIsOpen(false);
  };

  const handleCancelApplyVoucher = () => {
    toast.success(CART_MESSAGES.CANCEL_APPLY_VOUCHER_SUCCESS);
    dispatch(setCartVoucher({ voucher: null }));
  };
  return (
    <>
      {!voucherApply && <Button onClick={handleApplyVoucher}>Chọn</Button>}
      {voucherApply && (
        <Button
          sx={{
            backgroundColor: voucherApply._id === voucher._id && "#E74040",
            "&:hover": {
              backgroundColor: voucherApply._id === voucher._id && "#E74040",
            },
          }}
          onClick={
            voucherApply._id === voucher._id
              ? handleCancelApplyVoucher
              : handleApplyVoucher
          }
        >
          {voucherApply._id === voucher._id ? "Huỷ" : "Chọn"}
        </Button>
      )}
    </>
  );
}
