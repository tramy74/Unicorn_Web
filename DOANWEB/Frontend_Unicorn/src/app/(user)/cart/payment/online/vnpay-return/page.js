"use client";
import VNPayOnlinePaymentReturn from "@/components/cart/payment/online/VNPayOnlinePaymentReturn";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Container } from "@mui/material";
function VNPayReturn() {
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
      title: "Thanh toán banking",
    },
  ];

  return (
    <Container sx={{ display: "block", paddingBottom: "2rem" }}>
      <BreadcrumbBar data={DATA_BREADCRUMB} />
      <div className="payment-page-header">
        <h1>Thanh Toán Online</h1>
      </div>

      <VNPayOnlinePaymentReturn />
    </Container>
  );
}

export default VNPayReturn;
