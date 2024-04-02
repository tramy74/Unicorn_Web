"use client";
import useAuth from "@/customHooks/useAuth";
import { fetchNotifications } from "@/redux/actions/notifications";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import {
  MapPinIcon,
  PresentationChartLineIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Badge, Box, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const IconArray = [
  {
    label: "Tài khoản của tôi",
    path: "/profile",
    icon: <UserIcon className="h-8 w-8" />,
    value: "user-infomation",
  },
  {
    label: "Địa chỉ",
    path: "/profile/address",
    icon: <MapPinIcon className="h-8 w-8" />,
    value: "user-location",
  },
  {
    label: "Mã giảm giá",
    path: "/profile/vouchers",
    icon: <TicketIcon className="h-8 w-8" />,
    value: "user-ticket",
  },
  {
    label: "Lịch sử đơn hàng",
    path: "/profile/orders",
    icon: <PresentationChartLineIcon className="h-8 w-8" />,
    value: "user-orders",
  },
  {
    label: "Thông báo",
    path: "/profile/notifies",
    icon: <BellAlertIcon className="h-8 w-8" />,
    value: "user-notification",
  },
];

export default function ProfileNavigation() {
  const [listItem, setListItem] = useState(IconArray);
  const [view, setView] = useState("list");
  const dispatch = useDispatch();
  const { numberNotificationsUnRead } = useSelector(
    (state) => state.notifications
  );
  const { session } = useAuth();
  const pathName = usePathname();
  const handleClickSignOut = async () => {
    signOut();
  };

  useEffect(() => {
    if (session) {
      dispatch(fetchNotifications());
    }
  }, [session]);

  useEffect(() => {
    const coppyListItem = [...listItem];
    const findItemNotification = coppyListItem.find(
      (item) => item.path === "/profile/notifies"
    );
    findItemNotification.label = (
      <Badge color="primary" badgeContent={numberNotificationsUnRead} max={999}>
        Thông báo
      </Badge>
    );

    setListItem(coppyListItem);
  }, [numberNotificationsUnRead]);

  return (
    <Box
      className="user-nav-container"
      sx={{
        width: { xs: "100%", md: "40rem" },
        minWidth: { xs: "100%", md: "40rem" },
      }}
    >
      <Box
        className="user-nav divide-y divide-gray-200 rounded-lg shadow-xl"
        sx={{
          width: "100%",
        }}
      >
        <div className="user-avt-logout ">
          <Image
            src="https://i.imgur.com/laZbVWV.png"
            alt="me"
            width="100"
            height="100"
            className="user-avt divide-y divide-gray-200 rounded-lg shadow-xl"
          ></Image>
          <span className="user-name font-medium">{session?.user?.email}</span>
          <Button
            className="logout-button drop-shadow-lg"
            onClick={handleClickSignOut}
          >
            Đăng xuất
          </Button>
        </div>
        <div
          className="nav-infomation"
          style={{
            borderTop: "1px solid #a1a1a1",
          }}
        >
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            sx={{ width: "100%" }}
          >
            {listItem.map((toggle, index) => (
              <Link href={toggle.path} key={index}>
                <ToggleButton
                  value={toggle.value}
                  aria-label="list"
                  sx={{
                    backgroundColor:
                      pathName === toggle.path
                        ? "#C0DED7 !important"
                        : "transparent",
                    borderLeft: "none",
                    borderRight: "none",
                    width: "100%",
                    border: "none",
                  }}
                >
                  <div
                    className="nav-toggle-content"
                    style={{
                      color: pathName === toggle.path ? "#38ac8f" : "inherit",
                    }}
                  >
                    {toggle.icon}
                    <p className="toggle-button-text">{toggle.label}</p>
                  </div>
                </ToggleButton>
              </Link>
            ))}
          </ToggleButtonGroup>
        </div>
      </Box>
    </Box>
  );
}
