import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ListFavorite from "@/components/product/favorite/ListFavorite";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box } from "@mui/material";
export const metadata = {
  title: "Danh sách sản phẩm yêu thích",
};

export default function FavoriteProducts() {
  const DATA_BREADCRUMB = [
    {
      title: "Sản phẩm",
      link: ROUTERS_PATH.HOME_PRODUCT,
    },
    {
      title: "Sản phẩm yêu thích",
    },
  ];

  return (
    <div className="favorite-container">
      <Box>
        <div className="favorite-header">
          <BreadcrumbBar data={DATA_BREADCRUMB} />
          <div className="favorite-page-header-title">
            <h1>Yêu thích</h1>
          </div>
        </div>

        <ListFavorite />
      </Box>
    </div>
  );
}
