import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import AllProducts from "@/components/product/AllProducts";
import Filter from "@/components/product/Flter";
import { PRODUCT_GENDERS } from "@/configs/config.products";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { convertProductGender } from "@/utils/convertGender";
import { Box } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";

const getDataFilter = async ({ gender }) => {
  try {
    const getCategories = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories?gender=${gender}`
    );
    const getColors = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-colors`
    );
    const getSizes = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-sizes`
    );
    const [categoriesData, colorsData, sizesData] = await Promise.all([
      getCategories,
      getColors,
      getSizes,
    ]);

    return [
      categoriesData.data.data,
      colorsData.data.data,
      sizesData.data.data,
    ];
  } catch (err) {
    throw err;
  }
};

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { gender, category, color, size } = searchParams;

  const convertGender = convertProductGender(gender).toLowerCase();
  let listImages = ["https://i.imgur.com/mUFkUpf.png"];
  if (gender === PRODUCT_GENDERS.WOMEN) {
    listImages = ["https://i.imgur.com/hkDs6DF.png"];
  }
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Danh sách sản phẩm cho " + convertGender,
    openGraph: {
      images: [...listImages, ...previousImages],
    },
  };
}

export default async function ProductsPage({ searchParams }) {
  const { gender, category, color, size } = searchParams;

  if (!gender) {
    redirect("?gender=men");
  }
  const filterData = await getDataFilter({
    gender,
  });

  const DATA_BREADCRUMB = [
    {
      title: "Sản phẩm",
      link: ROUTERS_PATH.HOME_PRODUCT,
    },
    {
      title: gender === "men" ? "Nam" : gender === "women" ? "Nữ" : "",
      link: `${ROUTERS_PATH.HOME_PRODUCT}?gender=${gender}`,
    },
  ];

  return (
    <div className="product-container">
      <div className="product-header">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
        <div className="product-page-title">
          <h1 className="product-page-title-text">
            Thời trang{" "}
            {gender === "men" ? "Nam" : gender === "women" ? "Nữ" : ""}{" "}
          </h1>
        </div>
      </div>
      <div className="header-image-container">
        <Image
          alt="Danh sách sản phẩm"
          src={gender === "men" ? "/maleProduct.jpg" : "/femaleProduct.png"}
          width={1000}
          height={500}
          className="header-image"
        />
      </div>
      <Box
        sx={{
          gap: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          className="product-filter"
          sx={{
            position: "sticky",
            left: 0,
          }}
        >
          <Filter
            filterData={filterData}
            category={category}
            color={color}
            size={size}
          />
        </Box>

        <AllProducts />
      </Box>
    </div>
  );
}
