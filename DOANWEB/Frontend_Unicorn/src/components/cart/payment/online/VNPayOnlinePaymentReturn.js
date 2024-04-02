"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { setCurrentOrderPaymentPending } from "@/redux/actions/order";
import sortObject from "@/utils/sortObject";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function VNPayOnlinePaymentReturn({}) {
  const { isAuthenticated } = useAuth();
  const isLoading = useSelector((state) => state.loadingBox.isLoading);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [message, setMessage] = useState();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      let vnp_Params = {};
      for (var pair of searchParams.entries()) {
        vnp_Params[pair[0]] = pair[1];
      }
      vnp_Params = sortObject(vnp_Params);
      console.log(vnp_Params);
      checkVNPayReturn(vnp_Params);
    }
  }, [searchParams, isAuthenticated]);

  const checkVNPayReturn = async (vnp_Params) => {
    try {
      dispatch(setIsLoading(true));
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders/vnpay_ipn`,
        {
          vnp_Params,
        }
      );
      const result = request.data;

      setMessage(result?.message);
      toast.success(result?.message);
      dispatch(setCurrentOrderPaymentPending({ order: null }));
    } catch (err) {
      setMessage(err.response?.data?.message);
      toast.error(err.response?.data?.message);
      router.push(ROUTERS_PATH.HOME_PAGE);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[60rem]">
        <h2 className="p-8 text-[2.5rem] font-bold">
          Trạng thái thanh toán online
        </h2>
        <div className="px-8 ">
          <div
            className="flex flex-col overflow-hidden "
            style={{
              width: "100%",
              border: ".1rem solid rgba(0, 0, 0, .125)",
              borderRadius: "1rem",
            }}
          >
            {isLoading && <LoadingContent />}
            <div className="text-md px-8 py-4 font-medium">{message}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VNPayOnlinePaymentReturn;
