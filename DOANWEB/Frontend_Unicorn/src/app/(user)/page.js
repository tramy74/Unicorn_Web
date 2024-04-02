import HomeSwiper from "@/components/layouts/homepage/HomeSwiper";
import LatestProducts from "@/components/layouts/homepage/LatestProducts";
import SaleProducts from "@/components/layouts/homepage/SaleProducts";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import NewShoesProduct from "../../components/home/NewShoesProduct";
export const metadata = {
  title: "Quần áo thời trang online | Unicorn",
  description: "Quần áo thời trang online",
};

export default function Home() {
  //style Title
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
      <div className="home-container">
        <HomeSwiper />
        <Box
          className="products-gender-option-container"
          sx={{
            marginTop: { xs: "3rem", md: "5rem", lg: "10rem" },
          }}
        >
          <Container>
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
                gap: "2.5rem",
              }}
            >
              <Box
                className="male-products gender-products-item"
                sx={{
                  width: "50%",
                }}
              >
                <Link
                  href="/products?gender=men"
                  className="male-products gender-products-item w-full"
                >
                  <Image
                    alt="Thời trang nam"
                    src="/male-products.jpg"
                    width={1000}
                    height={100}
                    className="products-gender-image"
                    style={{
                      width: "100%",
                    }}
                  />
                  <Typography
                    className="gender-product-title"
                    sx={{
                      textTransform: "uppercase",
                      fontFamily: "Inter",
                      color: "#000",
                      fontSize: { xs: "2.5rem", md: "3rem", lg: "3.75rem" },
                      fontWeight: 800,
                      lineHeight: "normal",
                      opacity: 0.65,
                    }}
                  >
                    Thời trang nam
                  </Typography>
                </Link>
              </Box>
              <Box
                className="male-products gender-products-item"
                sx={{
                  width: "50%",
                  marginLeft: 0,
                }}
              >
                <Link
                  href="/products?gender=women"
                  className="female-products gender-products-item"
                >
                  <Image
                    alt="Thời trang nữ"
                    src="/female-products.jpg"
                    width={1000}
                    height={100}
                    className="products-gender-image"
                    style={{
                      width: "100%",
                    }}
                  />
                  <Typography
                    className="gender-product-title"
                    sx={{
                      textTransform: "uppercase",
                      fontFamily: "Inter",
                      color: "#000",
                      fontSize: { xs: "2.5rem", md: "3rem", lg: "3.75rem" },
                      fontWeight: 800,
                      lineHeight: "normal",
                      opacity: 0.65,
                    }}
                  >
                    Thời trang nữ
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Container>
        </Box>
      </div>

      <NewShoesProduct />

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <LatestProducts />
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
              SẢN PHẨM BÁN CHẠY
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  alt="Sản phẩm bán chạy"
                  src="/sanphambanchay1.jpg"
                  fill
                  sizes="100%"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                flex: 1,
                height: { xs: "35rem", md: "60rem" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "50%",
                }}
              >
                <Image
                  alt="Sản phẩm bán chạy"
                  src="/sanphambanchay2.jpg"
                  fill
                  sizes="100%"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "50%",
                }}
              >
                <Image
                  alt="Sản phẩm bán chạy"
                  src="/sanphambanchay3.jpg"
                  fill
                  sizes="100%"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Button
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFFFF",
              border: ".1rem solid #000000",
              color: "#000000",
              margin: "2rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
          >
            Xem ngay
          </Button>
        </Box>
        <SaleProducts />
      </Container>
    </>
  );
}
