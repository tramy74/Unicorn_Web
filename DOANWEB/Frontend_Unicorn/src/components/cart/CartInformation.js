"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { TYPE_VOUCHER_ITEM_DISPLAY } from "@/configs/config.vouchers";
import { setCartItems, setCartShippingCost } from "@/redux/actions/cart";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Button, Input } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CartVoucherModal from "./CartVoucherModal";

function CartInformation({ dataListCartItems }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    voucher: voucherApply,
    subTotal,
    shippingCost,
    discountAmount,
    total,
  } = useSelector((state) => state.cart);

  const [isOpenModalVoucher, setIsOpenModalVoucher] = useState(false);
  useEffect(() => {
    dispatch(setCartShippingCost({ shippingCost: 0 }));
  }, []);
  useEffect(() => {
    dispatch(setCartItems({ cartItems: dataListCartItems }));
  }, [dataListCartItems]);

  const handleRenderVoucherUI = () => {
    if (!voucherApply) {
      return "0 đ";
    }
    if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
      return (
        <>
          -
          <ConvertMoney money={discountAmount} />
        </>
      );
    }
    if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
      return (
        <>
          <span>-{voucherApply.discount}%</span> tiền ship
        </>
      );
    }
  };

  const handleCheckCart = async () => {
    try {
      dispatch(setIsLoading(true));
      if (voucherApply) {
        // Check voucher is valid
        const checkVoucher = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/carts/check-voucher`,
          {
            voucherId: voucherApply._id,
          }
        );
      }
      router.push(ROUTERS_PATH.PAYMENT);
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <CartVoucherModal
        isOpen={isOpenModalVoucher}
        setIsOpen={setIsOpenModalVoucher}
      />
      <Box
        className="cart-right-panel"
        sx={{
          width: "100%",
          flex: 1,
        }}
      >
        <div className="cart-right-panel-header">
          <Box
            className="cart-right-panel-title"
            sx={{ color: "#fff", fontSize: "3rem" }}
          >
            Tổng đơn
          </Box>
        </div>
        <div
          className="cart-right-panel-body"
          style={{
            borderBottom: ".1rem solid var(--Border-Taupe-Color)",
            paddingBottom: "3rem",
          }}
        >
          <div className="cart-right-panel-merchandises">
            <div className="cart-right-panel-merchandise">Tiền hàng:</div>
            <div className="cart-right-panel-price">
              <ConvertMoney money={subTotal} />
            </div>
          </div>
          <div className="cart-right-panel-sale-offs" style={{ paddingTop: 0 }}>
            <div className="cart-right-panel-sale-off">Giảm giá:</div>
            <div className="cart-right-panel-sale-off-price">
              {handleRenderVoucherUI()}
            </div>
          </div>

          <Input
            style={{
              backgroundColor: "#fff",
              border: "none",
              outline: "none",
              width: "100%",
              padding: "0.5rem",
              margin: "5rem 0 2rem",
            }}
            value={voucherApply?.code || "Mã giảm giá"}
            disabled
            disableUnderline={true}
            className="cart-right-panel-voucher divide-y divide-gray-200 shadow-xl"
            placeholder="Mã giảm giá"
          />
          <Button
            onClick={() => setIsOpenModalVoucher(true)}
            sx={{
              backgroundColor: "#E74040",
              color: "#FFFFFF",
              padding: "0.5rem 2rem",
              alignSelf: "flex-start",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#E74040",
                filter: "brightness(1.5)",
              },
            }}
          >
            CHỌN MÃ
          </Button>
        </div>
        <div className="cart-right-panel-footer">
          <div className="cart-right-panel-totals">
            <div className="cart-right-panel-total">Thành tiền:</div>
            <div className="cart-right-panel-total-price">
              <ConvertMoney money={total} />
            </div>
          </div>
          <Button
            onClick={handleCheckCart}
            sx={{
              backgroundColor: "#E74040",
              color: "#FFFFFF",
              padding: "0.5rem 2rem",
              width: "100%",
              marginTop: "2rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#E74040",
                filter: "brightness(1.5)",
              },
            }}
          >
            Tiếp tục
          </Button>
        </div>
      </Box>
    </>
  );
}

export default CartInformation;
