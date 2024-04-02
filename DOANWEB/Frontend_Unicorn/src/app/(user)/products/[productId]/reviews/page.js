import { getDetailInformationProduct } from "@/components/product/detail/InforPage";
import BreadcrumbProductReview from "@/components/product/detail/review/BreadcrumbProductReview";
import FormReview from "@/components/product/detail/review/FormReview";
import Image from "next/image";

export async function generateMetadata({ params, searchParams }, parent) {
  const { productId } = params;

  const dataProduct = await getDetailInformationProduct({ productId });

  return {
    title: `Đánh giá ${dataProduct.product_name}`,
  };
}

const Review = async ({ params }) => {
  const { productId } = params;
  const dataProduct = await getDetailInformationProduct({ productId });
  return (
    <>
      <BreadcrumbProductReview dataProduct={dataProduct} />
      <div className="mt-8 flex flex-col-reverse gap-8 md:flex-row">
        <FormReview dataProduct={dataProduct} />
        <div className="relative h-[40rem] w-full md:w-[40%] ">
          <Image
            src={dataProduct.product_images[0]}
            alt={dataProduct.product_name}
            sizes="100vw"
            fill
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Review;
