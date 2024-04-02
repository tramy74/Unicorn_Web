import { Box, Typography } from "@mui/material";
import DescriptionItem from "./DescriptionItem";
import { getDetailInformationProduct } from "./InforPage";
import SharingSelection from "./SharingSelection";

export default async function Description({ productId }) {
  const dataProduct = await getDetailInformationProduct({
    productId,
  });

  const convertTypeDescription = (type) => {
    if (type === "overview") {
      return "Tổng quan";
    } else if (type === "material") {
      return "Chất liệu";
    }
    return "";
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: "2px solid",
            padding: "1.5rem 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Mô tả sản phẩm
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {dataProduct?.product_description?.map((item) => (
            <DescriptionItem key={item.type} item={item} />
          ))}

          <SharingSelection />
        </Box>
      </Box>
    </>
  );
}
