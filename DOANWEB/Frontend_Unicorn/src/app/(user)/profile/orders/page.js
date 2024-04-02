import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import OrderPage from "@/components/profile/order/OrderPage";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { convertOrderDeliveryStatus } from "@/utils/convertOrders";

const DATA_BREADCRUMB = [
  {
    title: "Hồ sơ",
    link: ROUTERS_PATH.PROFILE,
  },
  {
    title: "Lịch sử đơn hàng",
  },
];

export async function generateMetadata({ params, searchParams }, parent) {
  const { type } = searchParams;

  return {
    title:
      "Danh sách đơn hàng " + convertOrderDeliveryStatus(type).toLowerCase(),
  };
}
export default function Home() {
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>

      <OrderPage />
    </>
  );
}
