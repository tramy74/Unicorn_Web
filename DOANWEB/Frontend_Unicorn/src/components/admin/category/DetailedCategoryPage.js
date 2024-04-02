"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetInformationProductCategory from "@/customHooks/admin/useGetInformationProductCategory";
import DetailedCategory from "./DetailedCategory";
function DetailedCategoryPage({ params }) {
  const { categoryId } = params;

  const { data, isLoading, isError } = useGetInformationProductCategory({
    categoryId,
  });

  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Chi tiết danh mục</h1>
      </div>
      {isLoading && <LoadingContent />}
      {!isLoading && data && (
        <>
          <DetailedCategory category={data} />
        </>
      )}
    </>
  );
}

export default DetailedCategoryPage;
