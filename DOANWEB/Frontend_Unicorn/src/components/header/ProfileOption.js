import ROUTERS_PATH from "@/configs/config.routers.path";
import USER_ROLES from "@/configs/config.users.roles";
import useAuth from "@/customHooks/useAuth";
import { fetchNotifications } from "@/redux/actions/notifications";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

const settings = [
  {
    title: "Thông báo",
    key: "notification",
    link: ROUTERS_PATH.PROFILE_NOTIFICATION,
  },
  {
    title: "Thông tin tài khoản",
    key: "profile",
    link: ROUTERS_PATH.PROFILE,
  },
  {
    title: "Mã giảm giá",
    key: "voucher",
    link: ROUTERS_PATH.PROFILE_VOUCHER,
  },
  {
    title: "Sổ địa chỉ",
    key: "address",
    link: ROUTERS_PATH.PROFILE_ADDRESS,
  },
  {
    title: "Lịch sử đơn hàng",
    key: "order",
    link: ROUTERS_PATH.PROFILE_ORDER,
  },
];

export default function BasicPopover() {
  const [listItem, setListItem] = React.useState(settings);
  const { isAuthenticated, session } = useAuth();
  const dispatch = useDispatch();
  const { numberNotificationsUnRead } = useSelector(
    (state) => state.notifications
  );
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    if (session) {
      dispatch(fetchNotifications());
    }
  }, [session]);
  React.useEffect(() => {
    const coppyListItem = [...listItem];
    const findItemNotification = coppyListItem.find(
      (item) => item.key === "notification"
    );
    findItemNotification.title = (
      <Badge color="primary" badgeContent={numberNotificationsUnRead} max={999}>
        Thông báo
      </Badge>
    );

    setListItem(coppyListItem);
  }, [numberNotificationsUnRead]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickProfileButton = () => {
    if (isAuthenticated) {
      // Redirect to profile page
      router.push(ROUTERS_PATH.PROFILE);
    } else {
      // Redirect to sign in page
      router.push(ROUTERS_PATH.SIGN_IN);
    }
  };
  return (
    <Box>
      {isAuthenticated ? (
        <Badge
          color="primary"
          variant="dot"
          invisible={numberNotificationsUnRead === 0}
        >
          <Image
            onClick={handleOpenUserMenu}
            src="/icons8-user-48.png"
            alt="me"
            width="25"
            height="25"
            style={{
              border: "1px solid #ccc",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </Badge>
      ) : (
        <PersonOutlineOutlinedIcon
          onClick={handleClickProfileButton}
          sx={{
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
        />
      )}

      {isAuthenticated && (
        <Menu
          sx={{
            mt: "45px",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "Iner,sans-serif",
            minWidth: "20rem",
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{
              borderBottom: "0.1rem solid var(--Border-Taupe-Color)",
            }}
          >
            <Typography
              className="three-dots"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",

                width: "20rem",
              }}
            >
              Chào {session?.user.email}
            </Typography>
          </MenuItem>
          {listItem.map((setting) => (
            <MenuItem
              key={setting.title}
              onClick={() => {
                router.push(setting.link);
                handleCloseUserMenu();
              }}
              sx={{}}
            >
              <Typography
                textAlign="center"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                }}
              >
                {setting.title}
              </Typography>
            </MenuItem>
          ))}

          {session &&
            session.user &&
            session.user.role === USER_ROLES.ADMIN && (
              <MenuItem
                onClick={() => {
                  router.push("/admin");
                  handleCloseUserMenu();
                }}
                sx={{}}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "400",
                  }}
                >
                  Admin Panel
                </Typography>
              </MenuItem>
            )}
          <MenuItem
            sx={{
              borderTop: "0.1rem solid var(--Border-Taupe-Color)",
            }}
            onClick={() => {
              signOut();
              handleCloseUserMenu;
            }}
          >
            <Box
              textAlign="center"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",
                display: "flex",
                flexDirection: "row",

                gap: "0.9rem",
              }}
            >
              <LogoutRoundedIcon
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
