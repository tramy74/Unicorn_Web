"use client";
import OnlinePaymentButton from "@/components/cart/payment/online/OnlinePaymentButton";
import OnlinePaymentInfor from "@/components/cart/payment/online/OnlinePaymentInfor";
import OnlinePaymentMethod from "@/components/cart/payment/online/OnlinePaymentMethod";
import {
  ORDER_DELIVERY_STATUSES,
  ORDER_ONLINE_PAYMENT_METHOD,
} from "@/configs/config.orders";
import useAuth from "@/customHooks/useAuth";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { setCurrentOrderPaymentPending } from "@/redux/actions/order";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
function PaymentPage({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orderId } = params;

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      checkOrder(orderId);
    }
  }, [isAuthenticated]);

  const checkOrder = async (orderId) => {
    try {
      dispatch(setCurrentOrderPaymentPending({ order: null }));
      dispatch(setIsLoading(true));
      const request = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders/${orderId}`
      );
      const result = request.data;
      const order = result?.data;
      dispatch(setCurrentOrderPaymentPending({ order }));
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const [selectMethodPayment, setSelectMethodPayment] = useState(
    ORDER_ONLINE_PAYMENT_METHOD.VNPAY
  );
  const currentOrderPaymentPending = useSelector(
    (state) => state.order.currentOrderPaymentPending
  );

  const handleChangeMethodPayMent = (value) => {
    setSelectMethodPayment(value);
  };

  return (
    <>
      {currentOrderPaymentPending && (
        <>
          <OnlinePaymentInfor
            currentOrderPaymentPending={currentOrderPaymentPending}
          />
          {currentOrderPaymentPending.order_status ===
            ORDER_DELIVERY_STATUSES.PAYMENT_PENDING && (
            <>
              <OnlinePaymentMethod
                currentOrderPaymentPending={currentOrderPaymentPending}
                selectMethodPayment={selectMethodPayment}
                handleChangeMethodPayMent={handleChangeMethodPayMent}
              />
              <OnlinePaymentButton
                currentOrderPaymentPending={currentOrderPaymentPending}
                selectMethodPayment={selectMethodPayment}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PaymentPage;
