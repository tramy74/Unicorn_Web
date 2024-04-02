import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import DetailedAddressPage from "@/components/profile/address/DetailedAddressPage";
import ROUTERS_PATH from "@/configs/config.routers.path";

export const metadata = {
  title: "Chỉnh sửa địa chỉ",
};
export default function Home({ params }) {
  const { id: addressId } = params;

  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Địa chỉ",
      link: `${ROUTERS_PATH.PROFILE}/address`,
    },
    {
      title: "Chi tiết",
    },
  ];

  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>

      <DetailedAddressPage addressId={addressId} />
    </>
  );
}
