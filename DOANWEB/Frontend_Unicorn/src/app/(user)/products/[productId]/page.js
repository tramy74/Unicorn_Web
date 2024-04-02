import Description from "@/components/product/detail/Description";
import InforPage, {
  getDetailInformationProduct,
} from "@/components/product/detail/InforPage";
import ListSuggesting from "@/components/product/detail/ListSuggesting";
import ListViewed from "@/components/product/detail/ListViewed";
import ReviewPage from "@/components/product/detail/ReviewPage";
import { Box } from "@mui/material";
export default function Home({ params, searchParams }) {
  const { productId } = params;

  return (
    <>
      <InforPage productId={productId} />

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          paddingTop: "4rem",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
          }}
        >
          <ListSuggesting productId={productId} />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Description productId={productId} />
        </Box>
      </Box>

      <ReviewPage productId={productId} />

      <ListViewed />
    </>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const { productId } = params;

  const dataProduct = await getDetailInformationProduct({ productId });
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${dataProduct.product_name}`,
    openGraph: {
      images: [...dataProduct.product_images, ...previousImages],
    },
  };
}
