"use client";
import {
  ORDER_DELIVERY_STATUSES,
  ORDER_MESSAGES,
  ORDER_ONLINE_PAYMENT_METHOD,
} from "@/configs/config.orders";
import { setIsLoading } from "@/redux/actions/loadingBox";
import sortObject from "@/utils/sortObject";
import { Button } from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import { ipv4 } from "ipify2";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
function OnlinePaymentButton({
  selectMethodPayment,
  currentOrderPaymentPending,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkOrder = async (orderId) => {
    try {
      const request = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders/${orderId}`
      );
      const result = request.data;
      const order = result.data;
      if (order.order_status === ORDER_DELIVERY_STATUSES.PAYMENT_PENDING) {
        return true;
      }
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return false;
    }
  };
  const handleClickPayment = async () => {
    try {
      dispatch(setIsLoading(true));
      if (selectMethodPayment === ORDER_ONLINE_PAYMENT_METHOD.VNPAY) {
        const ipAddr = await ipv4();
        // Check order already payment ?
        const checkOrderisReadyPayment = await checkOrder(
          currentOrderPaymentPending._id
        );
        if (!checkOrderisReadyPayment) {
          toast.error(ORDER_MESSAGES.ONLINE_PAYMENT_ALREADY);
          throw new Error(ORDER_MESSAGES.ONLINE_PAYMENT_ALREADY);
        }

        let date = new Date();
        let createDate = dayjs(date).format("YYYYMMDDHHmmss");
        let expiredDate = dayjs(new Date(Date.now() + 10 * 60 * 1000)).format(
          "YYYYMMDDHHmmss"
        );

        let tmnCode = process.env.NEXT_PUBLIC_VNPAY_TMNCODE || "";
        let secretKey = process.env.NEXT_PUBLIC_VNPAY_HASHSECRET || "";
        let vnpUrl = process.env.NEXT_PUBLIC_VNPAY_URL || "";
        let returnUrl = process.env.NEXT_PUBLIC_VNPAY_RETURN_URL || "";
        let orderId = currentOrderPaymentPending._id;
        let amount = currentOrderPaymentPending.total;
        let locale = "vn";
        let currCode = "VND";
        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = "Thanh toan cho hoa don: " + orderId;
        vnp_Params["vnp_OrderType"] = "other";
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        vnp_Params["vnp_ExpireDate"] = expiredDate;
        vnp_Params = sortObject(vnp_Params);

        let signData = QueryString.stringify(vnp_Params, { encode: false });

        let signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
          CryptoJS.enc.Hex
        );

        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
        // Redirect to payment window
        router.push(vnpUrl);
      }
    } catch (err) {
      console.log(err);
      if (err.repsonse) {
        toast.error(err.response?.data?.message);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="w-full pt-4 text-center">
      <Button
        className="drop-shadow-xl"
        sx={{ padding: "1.5rem", borderRadius: "1rem", fontSize: "2rem" }}
        onClick={handleClickPayment}
      >
        Thanh toán
      </Button>
    </div>
  );
}

export default OnlinePaymentButton;
