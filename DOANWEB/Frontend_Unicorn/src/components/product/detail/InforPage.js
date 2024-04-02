import Infor from "./Infor";
export const getDetailInformationProduct = async ({ productId }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/${productId}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    throw err;
  }
};

export default async function InforPage({ productId }) {
  const dataProduct = await getDetailInformationProduct({ productId });

  return (
    <>
      <Infor dataProduct={dataProduct} />
    </>
  );
}
