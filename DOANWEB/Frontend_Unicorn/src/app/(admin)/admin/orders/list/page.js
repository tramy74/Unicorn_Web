import OrderList from "@/components/admin/order/OrderList";
export const metadata = {
  title: "Danh sách đơn hàng",
};
export default function ListOrders() {
  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Danh sách đơn hàng</h1>
      </div>
      <OrderList />
    </>
  );
}
