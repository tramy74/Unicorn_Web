import DetailedCategoryPage from "@/components/admin/category/DetailedCategoryPage";
export const metadata = {
  title: "Chi tiết danh mục",
};
export default function Home({ params }) {
  return (
    <>
      <DetailedCategoryPage params={params} />
    </>
  );
}
