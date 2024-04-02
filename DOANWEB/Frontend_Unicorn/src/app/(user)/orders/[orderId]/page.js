import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import DetailedOrderPage from "@/components/order/DetailedOrderPage";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Container } from "@mui/material";

export const metadata = {
  title: "Chi tiết đơn hàng",
};
function Home({ params }) {
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Lịch sử đơn hàng",
      link: ROUTERS_PATH.PROFILE_ORDER,
    },
    {
      title: "Chi tiết đơn hàng",
    },
  ];

  return (
    <Container sx={{ display: "block", paddingBottom: "2rem" }}>
      <BreadcrumbBar data={DATA_BREADCRUMB} />
      <div className="payment-page-header">
        <h1>Chi tiết đơn hàng</h1>
      </div>
      <DetailedOrderPage params={params} />
    </Container>
  );
}

export default Home;
