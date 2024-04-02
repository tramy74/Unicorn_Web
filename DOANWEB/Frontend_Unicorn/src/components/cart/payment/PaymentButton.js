"use client";
import { ORDER_PAYMENT_METHODS } from "@/configs/config.orders";
import PAYMENT_MESSAGES from "@/configs/config.payment.messages";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import { resetCartData } from "@/redux/actions/cart";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { setCurrentOrderPaymentPending } from "@/redux/actions/order";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
function PaymentButton() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { address, voucher, note, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );

  const handleClickPayment = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error(PAYMENT_MESSAGES.MIN_CART_ITEMS_REQUIRED);
        return;
      }
      dispatch(setIsLoading(true));
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders`,
        {
          note,
          voucher,
          address,
          paymentMethod,
        }
      );
      // Reset Cart Data
      dispatch(resetCartData());

      // revalidate list cart items
      queryClient.invalidateQueries({
        queryKey: ["get-list-cart-items", session?.user?._id],
      });

      toast.success(result.data.message);
      if (paymentMethod === ORDER_PAYMENT_METHODS.BANKING) {
        dispatch(setCurrentOrderPaymentPending({ order: result.data.data }));
        router.push(`${ROUTERS_PATH.PAYMENT}/online/${result.data.data._id}`);
      } else {
        router.push(`${ROUTERS_PATH.HOME_PAGE}`);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Button
      className="drop-shadow-xl"
      sx={{ padding: "1.5rem", borderRadius: "1rem", fontSize: "2rem" }}
      onClick={handleClickPayment}
    >
      Thanh toán
    </Button>
  );
}

export default PaymentButton;
