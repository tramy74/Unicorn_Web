import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import EditInformationPage from "@/components/profile/information/EditInformationPage";
import ROUTERS_PATH from "@/configs/config.routers.path";

export const metadata = {
  title: "Chỉnh sửa thông tin cá nhân",
};

export default function Page() {
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Thông tin cá nhân",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Chỉnh sửa thông tin",
      link: `${ROUTERS_PATH.PROFILE}/edit`,
    },
  ];
  return (
    <>
      <div className="infomation-container">
        <div className="redirect-title-container">
          <BreadcrumbBar data={DATA_BREADCRUMB} />
        </div>
        <EditInformationPage />
      </div>
    </>
  );
}
