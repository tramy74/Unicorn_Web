import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import VoucherPage from "@/components/profile/voucher/VoucherPage";
import ROUTERS_PATH from "@/configs/config.routers.path";
export const metadata = {
  title: "Mã giảm giá",
};
export default function Voucher() {
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Mã giảm giá",
      link: ROUTERS_PATH.PROFILE_VOUCHER,
    },
  ];
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <VoucherPage />
    </>
  );
}
