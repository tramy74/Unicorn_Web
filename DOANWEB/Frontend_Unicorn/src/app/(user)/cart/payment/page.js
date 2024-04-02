
import PaymentAddress from "@/components/cart/payment/PaymentAddress";
import PaymentButton from "@/components/cart/payment/PaymentButton";
import PaymentMethod from "@/components/cart/payment/PaymentMethod";
import PaymentNote from "@/components/cart/payment/PaymentNote";
import PaymentProduct from "@/components/cart/payment/PaymentProduct";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Container, Stack } from "@mui/material";

export const metadata = {
  title: "Checkout đơn hàng"
}
function Payment() {
  const DATA_BREADCRUMB = [
    {
      title: "Giỏ hàng",
      link: ROUTERS_PATH.CART,
    },
    {
      title: "Thanh toán",
      link: ROUTERS_PATH.PAYMENT,
    },
  ];

  return (
    <Container sx={{ display: "block", paddingBottom: "2rem" }}>
      <BreadcrumbBar data={DATA_BREADCRUMB} />
      <div className="payment-page-header">
        <h1>Thanh Toán</h1>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <Stack sx={{ width: { xs: "100%", md: "50%" } }} spacing={3}>
          <PaymentAddress />
          <PaymentNote />
          <PaymentMethod />
        </Stack>
        <Stack sx={{ width: { xs: "100%", md: "50%" } }} spacing={2}>
          <PaymentProduct />
          <PaymentButton />
        </Stack>
      </div>
    </Container>
  );
}

export default Payment;
