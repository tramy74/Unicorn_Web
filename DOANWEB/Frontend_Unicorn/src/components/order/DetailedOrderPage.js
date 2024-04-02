"use client";
import PaymentAddress from "@/components/profile/order/information/PaymentAddress";
import PaymentButton from "@/components/profile/order/information/PaymentButton";
import PaymentMethod from "@/components/profile/order/information/PaymentMethod";
import PaymentNote from "@/components/profile/order/information/PaymentNote";
import PaymentPriceInformation from "@/components/profile/order/information/PaymentPriceInformation";
import PaymentProduct from "@/components/profile/order/information/PaymentProduct";
import PaymentStep from "@/components/profile/order/information/PaymentStep";
import useGetInformationOrder from "@/customHooks/useGetInformationOrder";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function DetailedOrderPage({ params }) {
  const { orderId } = params;
  const dispatch = useDispatch();
  const { data, isLoading } = useGetInformationOrder({ orderId });
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      {data && (
        <>
          <PaymentStep
            orderStatus={data.order_status}
            paymentMethod={data.order_method}
          />
          <PaymentButton
            orderId={data._id}
            paymentMethod={data.order_method}
            orderStatus={data.order_status}
          />

          <div className="flex flex-col gap-8 md:flex-row">
            <Stack sx={{ width: { xs: "100%", md: "50%" } }} spacing={3}>
              <PaymentAddress address={data.address} />
              <PaymentNote note={data.note} />
              <PaymentMethod paymentMethod={data.order_method} />
            </Stack>
            <Stack sx={{ width: { xs: "100%", md: "50%" } }} spacing={2}>
              <Stack
                className=" drop-shadow-xl "
                sx={{
                  backgroundColor: "#F7F7F7",
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <PaymentProduct listOrderItems={data.listOrderItems} />
                <PaymentPriceInformation
                  subTotal={data.subTotal}
                  shippingCost={data.shippingCost}
                  discountAmount={data.discountAmount}
                  total={data.total}
                />
              </Stack>
            </Stack>
          </div>
        </>
      )}
    </>
  );
}

export default DetailedOrderPage;
