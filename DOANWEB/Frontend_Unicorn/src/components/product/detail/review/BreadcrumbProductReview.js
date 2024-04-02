"use client";

import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
export default function BreadcrumbProductReview({ dataProduct }) {
  const DATA_BREADCRUMB = [
    {
      title: "Sản phẩm",
      link: ROUTERS_PATH.HOME_PRODUCT,
    },
    {
      title:
        dataProduct.product_gender === "men"
          ? "Nam"
          : dataProduct.product_gender === "women"
          ? "Nữ"
          : "",
      link: `${ROUTERS_PATH.HOME_PRODUCT}?gender=${dataProduct.product_gender}`,
    },
  ];

  const NEW_DATA_BREADCRUMB = DATA_BREADCRUMB.concat(
    dataProduct.product_categories.map((item) => ({
      title: item.product_category_name,
      link: `${ROUTERS_PATH.HOME_PRODUCT}?gender=${dataProduct.product_gender}&category=${item._id}`,
    })),
    {
      title: dataProduct.product_name,
      link: `${ROUTERS_PATH.HOME_PRODUCT}/${dataProduct._id}`,
    },
    {
      title: "Review",
    }
  );

  return <>{dataProduct && <BreadcrumbBar data={NEW_DATA_BREADCRUMB} />}</>;
}
