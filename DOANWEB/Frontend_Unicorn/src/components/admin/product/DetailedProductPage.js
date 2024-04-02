"use client";
import DetailedProduct from "@/components/admin/product/DetailedProduct";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetInformationProduct from "@/customHooks/admin/useGetInformationProduct";
function DetailedProductPage({ params }) {
  const { productId } = params;

  const { data, isLoading, isError } = useGetInformationProduct({ productId });

  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Chi tiết sản phẩm</h1>
      </div>
      {isLoading && <LoadingContent />}
      {!isLoading && data && (
        <>
          <DetailedProduct product={data} />
        </>
      )}
    </>
  );
}

export default DetailedProductPage;
