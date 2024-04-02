import CategoryList from "@/components/admin/category/CategoryList";

export const metadata = {
  title: "Danh sách danh mục",
};

export default function Home() {
  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Danh sách danh mục</h1>
      </div>

      <CategoryList />
    </>
  );
}
