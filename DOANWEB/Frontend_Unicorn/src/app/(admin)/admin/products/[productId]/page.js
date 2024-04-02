import DetailedProductPage from "@/components/admin/product/DetailedProductPage";

export const metadata = {
  title: "Chi tiết sản phẩm",
};

function Home({ params }) {
  return (
    <>
      <DetailedProductPage params={params} />
    </>
  );
}

export default Home;
