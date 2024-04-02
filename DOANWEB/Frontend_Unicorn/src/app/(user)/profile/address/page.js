import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import AddressPage from "@/components/profile/address/AddressPage";
import ROUTERS_PATH from "@/configs/config.routers.path";

export const metadata = {
  title: "Sổ địa chỉ",
};
export default function Home() {
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Địa chỉ",
      link: `${ROUTERS_PATH.PROFILE}/address`,
    },
  ];
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <AddressPage />
    </>
  );
}
