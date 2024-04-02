"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import PaymentAddress from "@/components/profile/order/information/PaymentAddress";
import PaymentMethod from "@/components/profile/order/information/PaymentMethod";
import PaymentNote from "@/components/profile/order/information/PaymentNote";
import PaymentPriceInformation from "@/components/profile/order/information/PaymentPriceInformation";
import PaymentProduct from "@/components/profile/order/information/PaymentProduct";
import PaymentStatusEdit from "@/components/profile/order/information/PaymentStatusEdit";
import PaymentStep from "@/components/profile/order/information/PaymentStep";
import useGetInformationOrder from "@/customHooks/admin/useGetInformationOrder";
import { Stack } from "@mui/material";
function DetailedOrderPage({ params }) {
  const { orderId } = params;

  const { data, isLoading, isError } = useGetInformationOrder({ orderId });

  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Chi tiết đơn hàng</h1>
      </div>
      {isLoading && <LoadingContent />}
      {!isLoading && data && (
        <>
          <PaymentStep
            orderStatus={data.order_status}
            paymentMethod={data.order_method}
          />
          <PaymentStatusEdit
            orderStatus={data.order_status}
            orderId={data._id}
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
