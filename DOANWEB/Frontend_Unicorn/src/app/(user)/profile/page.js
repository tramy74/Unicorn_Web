import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box } from "@mui/material";

import InformationPage from "@/components/profile/information/InformationPage";

export const metadata = {
  title: "Thông tin cá nhân",
};

export default function Home() {
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Thông tin cá nhân",
      link: ROUTERS_PATH.PROFILE,
    },
  ];

  return (
    <Box
      className="infomation-container "
      sx={{
        flex: 1,
        maxWidth: { xs: "100%", md: "calc(100% - 40rem)" },
      }}
    >
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <InformationPage />
    </Box>
  );
}
