import DetailedOrderPage from "@/components/admin/order/DetailedOrderPage";

export const metadata = {
  title: "Chi tiết đơn hàng",
};
function Home({ params }) {
  return <DetailedOrderPage params={params} />;
}

export default Home;
