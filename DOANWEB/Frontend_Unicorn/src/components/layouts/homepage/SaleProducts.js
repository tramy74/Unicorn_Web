import { ProductItem } from "@/components/product/ProductItem";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
const PAGE = 1;
const ITEMS_OF_PAGE = 4;

export const getSaleProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/sale-collection?page=${PAGE}&itemsOfPage=${ITEMS_OF_PAGE}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    throw err;
  }
};

const SaleProducts = async () => {
  const dataLatestProducts = await getSaleProducts();
  const TitleStyle = {
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
    position: "relative",
    display: "inline-block",
    padding: "0 2rem",
    left: "50%",
    transform: "translateX(-50%)",
    textShadow: "0 .2rem 1rem rgba(0, 0, 0, .2)",
    fontSize: "4rem",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      bottom: "1rem",
      left: 0,
      zIndex: -1,
      borderBottom: "1.5rem solid #D4D0D0",
    },
  };
  return (
    <>
      <Box
        sx={{
          marginTop: { xs: "3rem", md: "5rem", lg: "10rem" },
        }}
      >
        <Link href={"/"}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "#000000",
              position: "relative",
              display: "inline-block",
              padding: "0 2rem",
              left: "50%",
              transform: "translateX(-50%)",
              textShadow: "0 .2rem 1rem rgba(0, 0, 0, .2)",
              fontSize: { xs: "3rem", md: "3.5rem", lg: "4rem" },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "100%",
                bottom: "1rem",
                left: 0,
                zIndex: -1,
                borderBottom: "1.5rem solid #D4D0D0",
              },
            }}
            gutterBottom
          >
            SALE ĐỒNG GIÁ
          </Typography>
        </Link>
        <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
          Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ
        </Typography>

        <Box
          className="home-product"
          sx={{
            gap: "1.5rem",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {dataLatestProducts?.map((item, i) => (
            <ProductItem
              key={i}
              product={item}
              sx={{
                width: "100%",
              }}
            />
          ))}
        </Box>
        <Link href={"/"}>
          <Button
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFFFF",
              border: ".1rem solid #000000",
              color: "#000000",
              marginBottom: "1rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
          >
            Xem thêm
          </Button>
        </Link>
      </Box>
    </>
  );
};
export default SaleProducts;
