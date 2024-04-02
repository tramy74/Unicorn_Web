import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ListNotifications from "@/components/profile/notification/ListNotifications";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box } from "@mui/material";

const DATA_BREADCRUMB = [
  {
    title: "Hồ sơ",
    link: ROUTERS_PATH.PROFILE,
  },
  {
    title: "Thông báo",
  },
];

export const metadata = {
  title: "Thông báo",
};

export default function Notifies() {
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>

      <div className="user-desc-container divide-y divide-gray-200 rounded-lg shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Thông báo</h2>
        </div>
        <div className="user-desc-body">
          <Box
            sx={{
              width: "100%",

              gap: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <ListNotifications />
          </Box>
        </div>
      </div>
    </>
  );
}
