"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Cart from "../header/Cart";
import FavoriteProducts from "../header/FavoriteProducts";
import HeaderMobileNavigation from "../header/HeaderMobileNavigation";
import HeaderNavigation from "../header/HeaderNavigation";
import ProfileOption from "../header/ProfileOption";
import SearchProducts from "../header/SearchProducts";

const Header = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "7rem",
          boxShadow: "2px 2px 2px #dcdbdb",
          alignItems: "center",
          gap: "2rem",
          justifyContent: "space-between",
          padding: "1rem",
          width: "100%",
          position: "fixed",
          top: "0",
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Link href={ROUTERS_PATH.HOME_PAGE}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/logo.png" alt="me" width="40" height="40" />
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      color: "#FF9EAA",
                      fontWeight: "600",
                    }}
                  >
                    Unicorn
                  </Typography>
                </Box>
              </Link>
              <HeaderNavigation />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <HeaderMobileNavigation />
                <SearchProducts />
                <FavoriteProducts />
                <Cart />
                <ProfileOption />
              </Box>
            </Box>
          </div>
        </Stack>
      </Box>
    </>
  );
};
export default Header;
