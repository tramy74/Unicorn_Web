import PaymentPage from "@/components/cart/payment/online/PaymentPage";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Container } from "@mui/material";

export const metadata = {
  title: "Thanh toán đơn hàng",
};

function Payment({ params }) {
  const DATA_BREADCRUMB = [
    {
      title: "Giỏ hàng",
      link: ROUTERS_PATH.CART,
    },
    {
      title: "Thanh toán",
      link: ROUTERS_PATH.PAYMENT,
    },
    {
      title: "Thanh toán online",
    },
  ];

  return (
    <Container sx={{ display: "block", paddingBottom: "2rem" }}>
      <BreadcrumbBar data={DATA_BREADCRUMB} />
      <div className="payment-page-header">
        <h1>Thanh Toán Online</h1>
      </div>
      <PaymentPage params={params} />
    </Container>
  );
}

export default Payment;
