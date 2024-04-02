import CartPage from "@/components/cart/CartPage";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Container } from "@mui/material";
export const metadata = {
  title: "Giỏ hàng",
};
function Cart() {
  const DATA_BREADCRUMB = [
    {
      title: "Giỏ hàng",
      link: ROUTERS_PATH.CART,
    },
  ];

  return (
    <Container sx={{ display: "block" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <CartPage />
    </Container>
  );
}

export default Cart;
